import { FC, useRef } from "react";
import { ButtonLoading } from "@/bik-lib/lib/button";
import { supportInfoIcons } from "@/bikiran/lib/icons";
import { TInputChangeEvent } from "@/bik-lib/types/event";
import Image from "next/image";

const SupportAttachmentButton: FC<{
  disabled: boolean;
  loading: boolean;
  onClick: (ev: TInputChangeEvent) => void;
}> = ({ disabled, loading, onClick }) => {
  const ref = useRef<HTMLInputElement>(null);

  const handleFileChange = (ev: TInputChangeEvent) => {
    // Reset the input value to allow selecting the same file again
    // if (ref.current) {
    //   ref.current.value = "";
    // }
    onClick(ev);
  };

  return (
    <button
      type="button"
      className="size-7 bg-secondary rounded-full disabled:bg-gray-200 p-1 relative cursor-pointer"
      disabled={disabled}
      onClick={() => ref.current?.click()}
    >
      <input
        ref={ref}
        type="file"
        accept="image/*, .pdf, .doc, .docx, .txt, .jpg, .jpeg, .png, .mp4, .avi, .wmv, .mov, .3gp, .3g2, .ogg, .webm, .mp3, .wav, .mp4"
        className="absolute inset-0 opacity-0 cursor-pointer size-[25px]"
        multiple
        hidden
        onChange={handleFileChange}
      />
      <Image
        src={supportInfoIcons.iconPlusWhite}
        width={0}
        height={0}
        alt="attach"
        className="w-full h-auto cursor-pointer"
      />

      {loading ? (
        <div className="absolute top-0 left-0 size-full text-primary">
          <ButtonLoading />
        </div>
      ) : null}
    </button>
  );
};

export default SupportAttachmentButton;
