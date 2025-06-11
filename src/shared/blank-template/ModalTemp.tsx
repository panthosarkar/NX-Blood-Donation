import React, { FC, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogDescription,
} from "@/src/components/ui/dialog";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { Button } from "@src/button";
import { CopyWrapper } from "@src/utils";

const ModalContent: FC = () => {
  // const [loading, setLoading] = useState<boolean>(false)
  const { closeModal, modalData, setMessage } = useTemplate();

  const yourHandlerName = () => {};

  return (
    <div>
      {/* Your Modal Content Goes here */}

      <div className="flex justify-end gap-2.5">
        <Button
          variant="gray"
          className="w-24 h-10"
          // disabled={loading} // if you have loading state
          onClick={closeModal}
        >
          Cancel
        </Button>
        <Button
          variant="secondary"
          className="w-24 h-10"
          // loading={loading} // if you have loading state
          onClick={yourHandlerName}
        >
          {/* your action button name  */}
        </Button>
      </div>
    </div>
  );
};

const ModalTemp = () => {
  const { closeModal, modalType } = useTemplate();
  return (
    <Dialog open={modalType === "your-modal-name"} onOpenChange={closeModal}>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Your Title Goes here</DialogTitle>
          <DialogDescription className="uppercase flex gap-1">
            id : <CopyWrapper content={undefined} /> {/* replace with your  */}
          </DialogDescription>
        </DialogHeader>
        <DialogBody>
          <ModalContent />
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};

export default ModalTemp;
