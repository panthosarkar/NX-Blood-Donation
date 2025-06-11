import React, { useEffect, useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/bikiran/components/ui/dialog";
import DocsMenuTableHeader from "./DocsMenuTableHeader";
import DocsMenuTableSkeleton from "./DocsMenuTableSkeleton";
import DocsMainMenuCreateModal from "../../modals/DocsMainMenuCreateModal";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import DocsMenuTableBody from "./DocsMenuTableBody";
import DocsMenuItemEditModal from "../../modals/DocsMenuItemEditModal";
import { useApplicationInfo } from "../../ApplicationInfoProvider";
import { useAuth2 } from "@/bik-lib/context/auth/Auth2Provider";
import { ApiReorderDocsMenu } from "../../operation/DocsMenuOperation";
import { cn } from "@/bik-lib/utils/cn";
import DocsSubMenuReorderModal from "../../modals/DocsSubMenuReorderModal";
import { TTableListItem } from "../../types/TTableListItem";
import RenderContent from "@/bik-lib/utils/RenderContent";
import { Button } from "@bikiran/button";

const DocsMenuTable = () => {
  const { applicationData, handleReload } = useApplicationInfo();
  const { openModal, modalType, closeModal } = useTemplate();
  const { authInfo } = useAuth2();
  const { setMessage } = useTemplate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const itemData = useMemo(
    () => applicationData?.docsPage || [],
    [applicationData]
  );

  const [items, setItems] = useState<TTableListItem[] | []>([]);

  useEffect(() => {
    setItems(itemData);
  }, [itemData]);

  const [isDragging, setIsDragging] = useState(false);
  const [isReordered, setIsReordered] = useState(false);

  useEffect(() => {
    if (!isDragging) {
      // compare array items with data items to check if the Order has changed or not
      const isSameOrder = items.every(
        (item: TTableListItem, index: number) => item.id === itemData[index]?.id
      );
      setIsReordered(!isSameOrder);
    }
  }, [items, isDragging, itemData]);

  const handleSaveReorder = () => {
    if (isReordered) {
      setIsLoading(true);
      const priorityArr = items.map((item: TTableListItem) => item.id);
      ApiReorderDocsMenu(authInfo, applicationData?.application?.id, {
        applicationId: applicationData?.application?.id,
        priorityArr,
      })
        .then(({ message }) => {
          setIsLoading(false);
          handleReload();
          setIsReordered(false);
          setMessage(message);
        })
        .catch((ex: any) => {
          setIsLoading(false);
          setMessage(ex.message);
        });
    }
  };

  return (
    <div className="mb-52">
      <div className={cn("flex mb-2 items-center justify-between")}>
        <h2 className="text-2xl font-semibold text-primary">Menu List</h2>
        <div
          className={cn("flex items-center gap-2 opacity-0 invisible", {
            "opacity-100 visible": isReordered,
          })}
        >
          <Button
            variant="red"
            title="Close"
            onClick={() => setItems(itemData)}
            disabled={isLoading}
          />
          <Button
            title="Save re-order"
            onClick={handleSaveReorder}
            loading={isLoading}
          />
        </div>
      </div>

      <table className="bik-table" cellPadding={0} cellSpacing={0}>
        <DocsMenuTableHeader />
        <RenderContent data={applicationData?.docsPage}>
          {/* when loading */}
          <DocsMenuTableSkeleton />
          {/* When loading complete and data founded */}
          <DocsMenuTableBody
            items={items}
            setItems={setItems}
            isDragging={isDragging}
            setIsDragging={setIsDragging}
          />
          {/* when loading complete but no data found */}
          {/* <TableNoDataView colspan={6}>
            No Data Found in Docs Main Menu
            <Button
              onClick={() => openModal("create-docs-menu-item")}
              title="+ Add Menu"
              className={"ml-2"}
            />
          </TableNoDataView> */}
        </RenderContent>
      </table>
      {/* create main menu modal */}
      <Dialog
        open={modalType === "create-docs-menu-item"}
        onOpenChange={closeModal}
      >
        <DialogContent
          aria-describedby={undefined}
          className="modal-container"
          onInteractOutside={(e) => {
            e.preventDefault();
          }}
        >
          <DialogHeader className="border-b pb-2 mb-2 px-6 -mx-6">
            <DialogTitle className="text-primary text-xl font-medium">
              Create Docs Menu
            </DialogTitle>
          </DialogHeader>
          <DocsMainMenuCreateModal />
        </DialogContent>
      </Dialog>

      {/* edit menu modal */}
      <Dialog
        open={modalType === "edit-docs-menu-item"}
        onOpenChange={closeModal}
      >
        <DialogContent
          aria-describedby={undefined}
          className="modal-container"
          onInteractOutside={(e) => {
            e.preventDefault();
          }}
        >
          <DialogHeader className="border-b pb-2 mb-2 px-6 -mx-6">
            <DialogTitle className="text-primary text-xl font-medium">
              Update Docs Menu
            </DialogTitle>
          </DialogHeader>
          <DocsMenuItemEditModal />
        </DialogContent>
      </Dialog>

      {/* Docs Sub menu reorder modal */}
      <Dialog
        open={modalType === "docs-sub-menu-item-reorder"}
        onOpenChange={closeModal}
      >
        <DialogContent
          aria-describedby={undefined}
          className="modal-container !w-[900px] max-w-none"
          onInteractOutside={(e) => {
            e.preventDefault();
          }}
        >
          <DialogHeader className="border-b pb-2 mb-2 px-6 -mx-6">
            <DialogTitle className="text-primary text-xl font-medium">
              Add Content
            </DialogTitle>
          </DialogHeader>
          <DocsSubMenuReorderModal />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DocsMenuTable;
