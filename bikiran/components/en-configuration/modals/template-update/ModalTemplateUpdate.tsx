"use client";
import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import * as prettier from "prettier";
import * as htmlParser from "prettier/plugins/html";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/bikiran/components/ui/resizable";
import { Button } from "@bikiran/button";
import { win } from "@/bik-lib/utils/dom";
import TemplatePreviewComp from "./TemplatePreviewComp";

const ModalContent = () => {
  const [code, setCode] = useState("");
  const [device, setDevice] = useState<number>(0); // Default to Desktop
  const [codeWrap, setCodeWrap] = useState<boolean>(false);
  const [reloadKey, setReloadKey] = useState<number>(0);

  const { closeModal, modalData } = useTemplate();
  const key = modalData?.key || "";

  useEffect(() => {
    // Fetch HTML template if not already set
    if (!code) {
      fetch(
        `https://api2.bikiran.win/admin/notification/email/config/${key}/template-html`
      )
        .then((res) => res.text())
        .then((data) => setCode(data))
        .catch((err) => console.log(err));
    }
  }, [code]);

  // Function to format the code manually
  const formatCode = async () => {
    try {
      const formatted = await prettier.format(code, {
        parser: "html",
        plugins: [htmlParser],
      });
      setCode(formatted);
    } catch (error) {
      console.error("Formatting Error:", error);
    }
  };

  const handleEditorChange = (value: any) => {
    setCode(value);
  };

  const defaultSize = device === 0 ? win.innerWidth / 2 : device;

  const selectDevice = (num: number) => {
    setDevice(num);
    setReloadKey((prev: number) => prev + 1);
  };

  return (
    <div className="bg-white size-full flex flex-col overflow-hidden">
      {/* Modal Header */}
      <div className="flex justify-between items-center p-4 bg-gray-800 text-white">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-bold">HTML Code Editor</h2>
          <Button
            variant="blue"
            title={`Code ${codeWrap ? "Unwrap" : "Wrap"}`}
            className="text-sm px-4"
            onClick={() => setCodeWrap((prev: boolean) => !prev)}
          />
          {/* Format Code Button */}
          <Button
            variant="green"
            title="Format Code"
            className="text-sm px-4"
            onClick={formatCode}
          />
        </div>
        <button
          onClick={closeModal}
          className="text-error text-sm border border-error rounded-full p-1 size-5.5 flex justify-center items-center opacity-80 hover:opacity-100"
        >
          ✖
        </button>
      </div>

      {/* Editor & Preview Layout */}
      <div className="flex-1 overflow-auto">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel>
            {/* Code Editor */}
            <div className="h-full overflow-auto">
              <Editor
                height="100%"
                language="html"
                theme="vs-dark"
                value={code}
                onChange={handleEditorChange}
                options={{
                  fontSize: 14,
                  minimap: { enabled: false },
                  wordWrap: codeWrap ? "on" : "off",
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                }}
              />
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />

          <ResizablePanel
            key={reloadKey}
            defaultSize={(defaultSize / win.innerWidth) * 100}
            onResize={(size) => setDevice((size / 100) * win.innerWidth)}
            className="overflow-auto"
          >
            {/* Live Preview */}
            <TemplatePreviewComp
              selectDevice={selectDevice}
              device={device}
              code={code}
            />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

const ModalTemplateUpdate = () => {
  const { modalType } = useTemplate();

  if (modalType !== "update-template") return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 overflow-hidden">
      <ModalContent />
    </div>
  );
};

export default ModalTemplateUpdate;
