import { cn } from "@/bik-lib/utils/cn";
import DocsPreviewComp from "@/bikiran/shared/auto-resizing-text-area/DocsPreviewComp";

import React, { FC, useEffect } from "react";
import { useTextArea } from "./AutoResizingTextAreaProvider";

interface AutoResizingTextareaProps {
  className?: string;
  formData: { message: string; files: File[] };
  previews: (string | ArrayBuffer)[];
  handleClearSelection: (index: number) => void;
  adjustedHeight: number;
  setAdjustedHeight: (height: number) => void;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}


const AutoResizingTextarea: FC<AutoResizingTextareaProps> = ({
  className = "",
  formData,
  previews,
  handleClearSelection,
  onChange,
}) => {

  const { setAdjustedHeight, previewHeight, setPreviewHeight, textareaRef, totalHeight } = useTextArea();

  const updatePreviewHeight = () => {
    const fileCount = formData?.files?.length || 0;
    const filesPerLine = textareaRef.current ? Math.floor(textareaRef.current.clientWidth / 50) || 1 : 1; // Assuming each file preview takes 50px width
    const lines = Math.ceil(fileCount / filesPerLine);
    setPreviewHeight(lines * 100); // Assuming each line takes 50px height
  };

  const adjustHeight = () => {
    if (textareaRef.current) {
      const textArea = textareaRef.current;
      textArea.style.height = "auto";
      let height = textArea.scrollHeight;
      height = Math.max(50, Math.min(height, 200));
      textArea.style.height = `${height}px`;
      setAdjustedHeight(height);

    }
  };


  useEffect(() => {
    adjustHeight();
    updatePreviewHeight();
  }, [formData]);



  return (
    <div
      className={cn(
        `w-full px-5 py-2 h-full border border-primary-300 bg-primary-50 focus:outline-none resize-none flex flex-col gap-[20px]  ${totalHeight === 50 ? "rounded-full" : "rounded-[25px]"}`,
        className
      )}
      style={{ minHeight: 50, maxHeight: 200, height: totalHeight }}
    >
      {formData.files && formData.files.length > 0 ? (
        <div>
          <DocsPreviewComp
            files={formData?.files || []}
            previews={previews}
            handleClearSelection={handleClearSelection}
            className={"size-12 "}
          />
        </div>
      ) : null}
      <textarea
        ref={textareaRef}
        name="message"
        value={formData?.message || ""}
        onChange={onChange}
        placeholder={"Type your message here..."}
        className="block w-full h-full bg-transparent mt-1 text-base focus:outline-none disabled:grayscale overflow-y-auto break-words whitespace-pre-wrap max-width-[600px]"
      />
    </div>
  );
};

export default AutoResizingTextarea;
