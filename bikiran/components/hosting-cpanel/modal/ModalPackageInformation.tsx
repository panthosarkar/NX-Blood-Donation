"use client";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/bikiran/components/ui/dialog";
import React from "react";
import { Button } from "@bikiran/button";
import { useCPanel } from "../context/CPanelProvider";

const ModalBody: React.FC = () => {
  const { loading } = useCPanel();
  const { closeModal, modalData } = useTemplate();

  return (
    <div className="flex flex-col gap-3">
      <div className="text-[20px] font-medium leading-normal">
        {/* {modalData.pkgDisk / 1024}G&nbsp;
        {modalData.subType.toUpperCase()} */}
      </div>
      <div>
        <div className="grid grid-cols-2 items-center">
          {/* Row 1 */}
          <div className="text-primary-700 text-base font-normal leading-[30px]">
            Disk Space
          </div>
          <div className="text-primary-700 text-right text-base font-normal leading-[30px]">
            {/* {modalData.pkgDisk / 1024}G */}
          </div>
          {/* Row 2 */}
          <div className="text-primary-700 text-base font-normal leading-[30px]">
            Disk Type
          </div>
          <div className="text-primary-700 text-right text-base font-normal leading-[30px]">
            {/* {modalData.pkgDiskType} */}
          </div>
          {/* Row 3 */}
          <div className="text-primary-700 text-base font-normal leading-[30px]">
            Bandwidth
          </div>
          <div className="text-primary-700 text-right text-base font-normal leading-[30px]">
            {/* {(modalData.pkgBandwidth / 1024 / 1024).toFixed(2)}G */}
          </div>
          {/* Row 4 */}
          <div className="text-primary-700 text-base font-normal leading-[30px]">
            CPU
          </div>
          <div className="text-primary-700 text-right text-base font-normal leading-[30px]">
            {/* {modalData.pkgCPU} Core */}
          </div>
          {/* Row 5 */}
          <div className="text-primary-700 text-base font-normal leading-[30px]">
            RAM
          </div>
          <div className="text-primary-700 text-right text-base font-normal leading-[30px]">
            {/* {modalData.pkgRAM / 1024}G */}
          </div>
          {/* Row 6 */}
          <div className="text-primary-700 text-base font-normal leading-[30px]">
            EP
          </div>
          <div className="text-primary-700 text-right text-base font-normal leading-[30px]">
            {/* {modalData.pkgEP} */}
          </div>
          {/* Row 7 */}
          <div className="text-primary-700 text-base font-normal leading-[30px]">
            IO
          </div>
          <div className="text-primary-700 text-right text-base font-normal leading-[30px]">
            {/* {modalData.pkgIO} */}
          </div>
          {/* Row 7 */}
          <div className="text-primary-700 text-base font-normal leading-[30px]">
            Account Limit
          </div>
          <div className="text-primary-700 text-right text-base font-normal leading-[30px]">
            {/* {modalData.pkgCpAccountLimit} */}
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <Button
          type="button"
          title={"Close"}
          loading={loading}
          variant="secondary"
          className="px-[20px] py-[10px]"
          onClick={() => closeModal()}
        />
      </div>
    </div>
  );
};

const ModalPackageDetails = () => {
  const { modalType, closeModal } = useTemplate();
  return (
    <Dialog open={modalType === "packageDetails"} onOpenChange={closeModal}>
      <DialogContent aria-describedby={undefined} className="max-w-[370px]">
        <DialogHeader>
          <DialogTitle>Package Details</DialogTitle>
        </DialogHeader>

        <DialogBody>
          <ModalBody />
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};

export default ModalPackageDetails;
