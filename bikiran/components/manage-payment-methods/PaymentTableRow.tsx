import { cn } from "@/bik-lib/utils/cn";
import { Reorder, useDragControls } from "framer-motion";
import { motion } from "motion/react";
import React, { FC } from "react";
import TableReorderIcon from "../manage-application/components/table/TableReorderIcon";
import Image from "next/image";
import { icons } from "@/bikiran/lib/icons";
import TooltipWrapper from "@/bik-lib/lib/TooltipWrapper";
import { InstOption } from "@/bik-lib/features/inst-option/InstOption";
import { Switch } from "../ui/switch";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { usePaymentMethod } from "./context/PaymentMethodProvider";
import useApi from "@/bik-lib/utils/useApi";

type Props = {
  item: any;
  setIsDragging: any;
  isDragging: boolean;
};
const PaymentTableRow: FC<Props> = ({ item, setIsDragging, isDragging }) => {
  const dragControls = useDragControls();
  const { setConfirm, setMessage, setTemplateLoading, openModal } =
    useTemplate();
  const { put } = useApi();
  const { reload } = usePaymentMethod();

  const handleStatus = (id: number) => {
    setConfirm({
      show: true,
      text: `Are you sure, you want to ${
        item.status === "active" ? "disable" : "enable"
      } this payment method ?`,
      textAction: "Yes",
      textCancel: "No",
      clickAction: () => {
        setTemplateLoading(true);
        setMessage("Updating Status ...");
        put(
          `/admin/gateway/configuration/${id}/update-status`,

          { status: item?.status === "active" ? "inactive" : "active" }
        )
          .then(() => {
            reload();
            setConfirm(null);
            setMessage("Status Updated Successfully");
          })
          .catch((ex) => {
            setMessage(ex.message);
          })
          .finally(() => {
            setTemplateLoading(false);
          });
      },
    });
  };

  return (
    <Reorder.Item
      // id={item.priority}
      value={item}
      // style={{ boxShadow, y }}
      dragListener={false}
      dragControls={dragControls}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
      className="even:!bg-primary-50 "
    >
      <motion.div
        className={cn(
          "group/row h-14.5 text-primary-900 text-base hover:cursor-pointer *:text-sm hover:bg-muted/50  !cursor-default relative grid grid-flow-col items-center",
          {
            "select-none": isDragging,
          }
        )}
      >
        <div className="w-[80px] flex items-center gap-1 !pl-0 px-2">
          <TableReorderIcon dragControls={dragControls} />
          <span>{item?.priority}</span>
        </div>
        <div className="w-[100px] px-2">{item?.id}</div>
        <div className="w-[80px] text-center px-2">
          <div className=" flex justify-center items-center">
            <Image
              src={item.icon || icons.iconDefaultApp}
              alt="icon"
              width={100}
              height={100}
              sizes="100vh"
              className="size-8  rounded-full"
            />
          </div>
        </div>
        <div className="w-[100px] text-start px-2">{item?.provider}</div>
        <div className="2xl:w-[350px] w-[250px] flex flex-col px-2">
          <div className="flex items-center gap-3">
            <span className="text-primary font-medium">{item.title} </span>
            <TooltipWrapper
              content={item.isDefault ? "Default" : "Not Default"}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 26 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={item?.isDefault ? "text-success" : "text-error"}
              >
                <path
                  d="M13 0.142853C5.89645 0.142853 0.142883 5.89642 0.142883 13C0.142883 20.1036 5.89645 25.8571 13 25.8571C20.1036 25.8571 25.8572 20.1036 25.8572 13C25.8572 5.89642 20.1036 0.142853 13 0.142853ZM19.3965 7.55714C19.3643 7.64285 19.3322 7.73928 19.2786 7.81428L12.325 18.6464C11.8215 19.375 11.2322 19.3857 10.8036 19.2464C10.5143 19.15 10.2572 18.9786 10.0643 18.7429L6.94645 15.0893C6.6036 14.6929 6.47503 14.1464 6.61431 13.6321C6.8286 12.925 7.39645 12.775 7.88931 12.7964C8.33931 12.8286 8.76788 13.0321 9.05717 13.375L10.525 15.0464C10.5465 15.0679 10.5679 15.1 10.6 15.1214C10.9 15.3679 11.35 15.325 11.6072 15.025L18.1536 7.13928C18.3036 6.96785 18.4857 6.82857 18.7 6.73214C19.4715 6.42142 19.4929 7.20357 19.3965 7.55714Z"
                  fill="currentColor"
                />
              </svg>
            </TooltipWrapper>
          </div>
          <span className="text-primary-500 text-[13px]">{item.subTitle}</span>
        </div>
        <div className="w-[200px] text-start px-2">{item.buttonText}</div>
        <div className="w-[100px] text-center px-2">
          <Switch
            onClick={() => handleStatus(item.id)}
            checked={item.status === "active" ? true : false}
          />
        </div>
        <div className="w-[80px]">
          <div className="flex justify-end items-center">
            <InstOption>
              <button onClick={() => openModal("update-payment-icon", item)}>
                Update Icon
              </button>
              <button onClick={() => openModal("update-payment-info", item)}>
                Update Information
              </button>
            </InstOption>
          </div>
        </div>
      </motion.div>
    </Reorder.Item>
  );
};

export default PaymentTableRow;
