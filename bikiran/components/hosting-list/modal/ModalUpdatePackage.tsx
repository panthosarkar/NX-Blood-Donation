import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import React, { FC, useState } from "react";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { TFormEvent } from "@/bik-lib/types/event";
import { useHostingList } from "../context/HostingListProvider";
import Image from "next/image";
import { icons } from "@/bikiran/lib/icons";
import { packageData } from "./dummydata";
import { showCurrencySign, showInt } from "@/bik-lib/utils/show";
import { cn } from "@/bik-lib/utils/cn";
import useApi from "@/bik-lib/utils/useApi";
import { Button } from "@bikiran/button";
import TableWrapper from "@/bikiran/shared/table-wrapper/TableWrapper";

const ModalBody: FC<{
  closeModal: () => void;
}> = ({ closeModal }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { reload } = useHostingList();
  const { modalData, setMessage } = useTemplate();
  const [btnActive, setBtnActive] = useState<string>("web");

  const { put } = useApi();
  const [activePackage, setActivePackage] = useState<{
    id: number;
    disk: string;
    bandwidth: string;
    cpu: string;
    ram: string;
    price: number;
    offerPrice: number;
    currency: string;
    recommended: boolean;
    currentPackage: boolean;
  } | null>(null);

  const handleActive = (index: number) => {
    setActivePackage({
      ...packageData[index],
    });
  };
  const packageId = activePackage?.id ?? 0;

  const updateHostingPackage = () => {
    setLoading(true);
    setMessage("Updating...");
    setActivePackage(null);
    put(`/${modalData.id}/upgrade-package?packageId=${packageId}`, {
      packageId,
    })
      .then(({ message }) => {
        setMessage(message);
        closeModal();
        reload();
      })
      .catch((err: Error) => {
        setMessage(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const handleSubmit = (ev: TFormEvent) => {
    ev.preventDefault();
    updateHostingPackage();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-3">
      <div className="flex items-center gap-4">
        <Button
          variant={btnActive === "web" ? "secondary" : "secondary-line"}
          onClick={() => setBtnActive("web")}
        >
          Web Hosting
        </Button>
        <Button
          variant={btnActive === "email" ? "secondary" : "secondary-line"}
          onClick={() => setBtnActive("email")}
        >
          Email Hosting
        </Button>
        <Button
          variant={btnActive === "app" ? "secondary" : "secondary-line"}
          onClick={() => setBtnActive("app")}
        >
          App Hosting
        </Button>
      </div>
      <TableWrapper
        headers={[
          "SL + w-[50px] !text-center",
          "Disk + w-[100px]",
          "Bandwidth",
          "CPU",
          "RAM",
          "Price",
          "Action + !w-[150px] !text-center",
        ]}
        loading={loading}
      >
        {packageData.map((item, index) => (
          <tr
            key={index}
            className={cn("hover:!bg-secondary-50", {
              "!bg-secondary-100": activePackage?.id === item.id,
            })}
            onClick={() => handleActive(index)}
          >
            <td className="text-center">{item.id}</td>
            <td className="text-center">{item.disk}</td>
            <td className="text-center">{item.bandwidth}</td>
            <td className="text-center">{item.cpu}</td>
            <td className="text-center">{item.ram}</td>
            <td className="text-center">
              <div className="flex flex-col justify-center items-center">
                <span className="text-base">
                  {showCurrencySign(item.currency)} {showInt(item.offerPrice)}
                </span>
                <span className="line-through text-primary-300 text-sm -mt-1">
                  {showCurrencySign(item.currency)} {showInt(item.price)}
                </span>
              </div>
            </td>
            <td>
              <div className="flex justify-center items-center">
                {item.currentPackage && activePackage?.id !== item.id ? (
                  <div className="flex items-center justify-center">
                    <Image
                      alt="owned"
                      src={icons.iconTickHover}
                      width={0}
                      height={0}
                      sizes="100vw"
                      className="size-5"
                    />
                  </div>
                ) : null}
                {item.recommended && activePackage?.id !== item.id ? (
                  <span className="text-white text-center bg-[#14B9FF] text-[13px] font-medium rounded-5 px-[5px] py-[2px]">
                    Recommended
                  </span>
                ) : null}
                {activePackage?.id === item.id ? (
                  <div className="flex justify-center items-center text-primary text-base font-medium">
                    Selected
                  </div>
                ) : null}
              </div>
            </td>
          </tr>
        ))}
      </TableWrapper>
      <div className="w-full">
        {activePackage ? (
          <div className="flex justify-between items-center">
            <div className="text-primary">{false ? "" : ""}</div>
            <Button
              variant="secondary"
              className="w-[148px] h-[50px]"
              type="submit"
            >
              Next
            </Button>
          </div>
        ) : null}
      </div>
    </form>
  );
};
const ModalUpdatePackage: FC = () => {
  const { closeModal, modalType } = useTemplate();

  return (
    <Dialog open={modalType === "update-Package"} onOpenChange={closeModal}>
      <DialogContent
        aria-describedby={undefined}
        className="modal-container !max-w-[785px] w-full"
      >
        <DialogHeader>
          <DialogTitle>Update Package</DialogTitle>
        </DialogHeader>
        <DialogBody className="!min-h-1 ">
          <ModalBody closeModal={closeModal} />
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};

export default ModalUpdatePackage;
