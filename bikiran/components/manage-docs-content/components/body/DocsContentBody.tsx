import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/bikiran/components/ui/alert-dialog";
import React from "react";
import { useDocsContent } from "../../ManageDocsContentProvider";
import DocsContentBodySkeleton from "./DocsContentBodySkeleton";
import DocsContentBodyInfo from "./DocsContentBodyInfo";

import DocsMenuItemContentSaveModal from "../../modals/DocsMenuItemContentSaveModal";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";

const DocsContentBody = () => {
  const { docsContentData } = useDocsContent();
  const { modalType, closeModal } = useTemplate();

  if (!docsContentData) {
    return <DocsContentBodySkeleton />;
  }

  return (
    <div className="flex flex-col ">
      {docsContentData?.docsMenuIds?.length > 0 ? (
        docsContentData?.docsMenuIds.map((id: any) => (
          <DocsContentBodyInfo
            commonData={{
              application: docsContentData?.application,
              menuInfo: docsContentData?.docsMenuInfo,
            }}
            contentData={docsContentData?.contentArr?.find(
              (i: any) => i.menuId === id
            )}
          />
        ))
      ) : (
        <div className="mt-10 text-lg">No content found</div>
      )}

      {/* Confirmation Modal */}
      <AlertDialog
        open={modalType === "content-editor-save-or-update"}
        onOpenChange={closeModal}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-primary font-medium">
              Are you absolutely sure?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-base">
              {/* if inactive then active otherwise inactive message */}
              Are you sure you want to save the content? This action cannot be
              undone. Are you sure you want to continue?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <DocsMenuItemContentSaveModal />
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DocsContentBody;
