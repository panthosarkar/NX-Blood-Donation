import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { icons } from "@/bikiran/lib/icons";
import { Button } from "@bikiran/button";

const DocsContentBodyInfo = ({ contentData, commonData }: any) => {
  const { openModal } = useTemplate();

  const [initialContent, setInitialContent] = useState<any>(
    contentData?.content
  );
  const [saveStatus, setSaveStatus] = useState<string>("Saved");
  const [charsCount, setCharsCount] = useState(0);

  const debouncedUpdates = useDebouncedCallback(async (editor: any) => {
    const json = editor.getJSON();
    setCharsCount(editor.storage.characterCount.words());
    setInitialContent(json);
  }, 500);

  useEffect(() => {
    setInitialContent(contentData?.content || {});
  }, [contentData?.content]);

  return (
    <div className="size-full flex flex-col gap-4 mt-4 border !rounded-10">
      <div className="flex justify-between p-4 pb-0">
        <div className="flex flex-col gap-2">
          <div className="text-xl font-medium">
            {commonData?.docsMenuInfo?.title}
          </div>
          <Link
            // href={`/documentation/${commonData?.docsMenuInfo?.appKey}${commonData?.docsMenuInfo?.fullPermalink}/${contentData?.id}`}
            href={"#"}
            target="_blank"
            className="group/link flex items-center gap-2"
          >
            <span>{commonData?.docsMenuInfo?.fullPermalink}</span>
            <span className="inline-block size-4 opacity-0 group-hover/link:opacity-100 transition-opacity">
              <Image
                src={icons.iconLink}
                alt="link arrow"
                height={100}
                width={100}
                className="size-full"
              />
            </span>
          </Link>
        </div>
        <div className="flex gap-2">
          {/* <Button title="View Html" /> */}
          <Button
            variant="green"
            title="Save Content"
            onClick={() =>
              openModal("content-editor-save-or-update", {
                initialContent,
                contentData,
              })
            }
          />
        </div>
      </div>
      {/* using novel advance editor */}
      {/* <div className="flex justify-center">
        <NovelAdvancedEditor
          initialContent={initialContent}
          debouncedUpdates={debouncedUpdates}
          charsCount={charsCount}
          saveStatus={saveStatus}
          setSaveStatus={setSaveStatus}
          isEditable={true}
        />
      </div> */}
    </div>
  );
};

export default DocsContentBodyInfo;
function useDebouncedCallback(
  arg0: (editor: any) => Promise<void>,
  arg1: number
) {
  throw new Error("Function not implemented.");
}
