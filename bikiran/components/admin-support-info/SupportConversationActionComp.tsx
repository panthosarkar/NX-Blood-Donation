import { cn } from "@/bik-lib/utils/cn";
import { Button } from "@bikiran/button";
import { useParams } from "next/navigation";
import { getFileType } from "@/bik-lib/utils/StringOperation";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { useSupportChat } from "./context/SupportChatProvider";
import { FC, useRef, useState } from "react";
import { icons, supportInfoIcons } from "@/bikiran/lib/icons";
import { TFormEvent, TInputChangeEvent, TState } from "@/bik-lib/types/event";
import Image from "next/image";
import useApi from "@/bik-lib/utils/useApi";
import getFileIcon from "@/bik-lib/lib/getFileIcon";
import SupportAttachmentButton from "./SupportAttachmentButton";

type TProps = {
  textAreaHeight: number;
  setTextAreaHeight: TState<number>;
};

type TFormData = {
  message: string;
  attachment: string[];
};

const AttachmentComp: FC<{
  fileData: string[];
  removeFile: (file: string) => void;
}> = ({ fileData, removeFile }) => {
  return (
    <div className="absolute -top-6 left-16 flex items-center gap-2">
      {fileData?.map((file) => {
        const type = getFileType(file);
        return (
          <div key={file} className="size-8 relative group">
            <div className="relative">
              <Image
                src={getFileIcon(type)}
                alt="file"
                width={0}
                height={0}
                sizes="100vw"
                className="w-full h-auto"
              />
              {/* TODO: Need to show redirect arrow icon to open file preview link */}
              {/* <Link
                href={file}
                target="_blank"
                className="absolute top-0 size-full p-2.5 hidden hover:block"
              >
                <Image
                  src={icons.iconRedirectArrow}
                  alt="redirect"
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="w-full h-auto"
                />
              </Link> */}
            </div>

            <button
              type="button"
              className="absolute -top-2.5 -right-2.5 size-3.5"
              onClick={() => removeFile(file)}
            >
              <Image
                src={icons.iconCrossRed}
                alt="close"
                width={0}
                height={0}
                sizes="100vw"
                className="w-full h-auto"
              />
            </button>
          </div>
        );
      })}
    </div>
  );
};

const SupportConversationActionComp: FC<TProps> = ({
  textAreaHeight,
  setTextAreaHeight,
}) => {
  const [formData, setFormData] = useState<TFormData>({
    message: "",
    attachment: [],
  });
  const [loading, setLoading] = useState<boolean>(false);

  const ref = useRef<HTMLTextAreaElement>(null);

  const { reload, isClosed } = useSupportChat();
  const { setMessage } = useTemplate();
  const { post, put } = useApi();

  const { id } = useParams();

  const handleSubmit = (ev: TFormEvent) => {
    ev.preventDefault();
    setLoading(true);
    post(`/admin/ticket/${id}/reply`, formData)
      .then(({ message }) => {
        setMessage(message);
        //reload the chat
        reload();
        //reset the form data
        setFormData({ message: "", attachment: [] });
        //reset the height of the textarea
        setTextAreaHeight(50);
      })
      .catch(({ message }: Error) => {
        setMessage(message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleOnChange = (ev: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = ev.target;

    // Update the form data
    setFormData((prev: TFormData) => ({ ...prev, [name]: value }));

    // Dynamically adjust the height of the textarea
    if (ref.current) {
      ref.current.style.height = "auto"; // Reset the height to calculate the new height
      const newHeight = Math.min(ref.current.scrollHeight, 200); // Limit to max height (200px)
      ref.current.style.height = `${newHeight}px`;
      setTextAreaHeight(newHeight); // Update the state with the new height
    }
  };

  const handleFileChange = async (ev: TInputChangeEvent) => {
    const files = ev.target.files;
    // Reinitialize the file data
    setFormData((prev) => ({ ...prev, attachment: [] }));
    if (files) {
      setLoading(true);
      const arrOfFile = Array.from(files); // Convert the files to an array

      for (const file of arrOfFile) {
        const formData = new FormData();
        try {
          const blob = new Blob([file], { type: file.type }); // Convert the file to blob
          formData.append("file", blob, file.name); // Append the blob to the form data

          // Upload each file to the server sequentially
          const { data } = await put("/upload", formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });

          // Update the file data
          if (data) {
            setFormData((prev: TFormData) => ({
              ...prev,
              attachment: [...prev.attachment, data.publicUrl!],
            }));
          }

          // setMessage(message);
        } catch (err: Error | any) {
          setMessage(err.message);
          setFormData((prev) => ({ ...prev, attachment: [] }));
        } finally {
          setLoading(false);
        }
      }
    }
  };

  return (
    <div
      className="w-full h-auto shadow-[0px_-30px_30px_rgba(255,255,255,0.5)] relative"
      style={{ height: `${textAreaHeight + 20}px` }}
    >
      <AttachmentComp
        fileData={formData.attachment}
        removeFile={(file: string) => {
          setFormData((prev) => ({
            ...prev,
            attachment: prev.attachment.filter((f) => f !== file),
          }));
        }}
      />

      <form
        onSubmit={handleSubmit}
        className={cn("size-full flex gap-5 py-2", {
          "items-center": true,
          "items-end": textAreaHeight > 60,
        })}
      >
        <SupportAttachmentButton
          disabled={isClosed || loading}
          loading={loading}
          onClick={handleFileChange}
        />

        <textarea
          ref={ref}
          name="message" // Added a name to update formData
          value={formData.message || ""}
          onChange={handleOnChange}
          className="resize-none h-full max-h-[200px] flex-1 bg-primary-100 focus-within:bg-white border border-[#D0CFD9] rounded-30 outline-none px-5 py-2 overflow-hidden text-sm"
          style={{ height: `${textAreaHeight}px` }}
          disabled={loading || isClosed}
        ></textarea>

        <Button
          type="submit"
          variant="secondary"
          className="flex justify-center items-center gap-[10px] w-[120px] h-[50px] rounded-full text-white"
          // loading={loading}
          disabled={loading || isClosed}
        >
          Send
          <Image
            src={supportInfoIcons.iconSend}
            width={0}
            height={0}
            alt="sendIcon"
            className="size-[20px]"
          />
        </Button>
      </form>
    </div>
  );
};

export default SupportConversationActionComp;
