import React, { FC } from "react";
import { InstOption } from "@/bik-lib/features/inst-option/InstOption";
import capitalizeFirstLetter from "@/bik-lib/utils/capitalizeFirstLetter";
import { GetDate, GetTime } from "@/bik-lib/utils/date";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { TClientData } from "./ClientInfoTypes";
import Image from "next/image";
import { icons } from "@/bikiran/lib/icons";
import { useClientInfo } from "./context/ClientInfoProvider";
import { useAuth2 } from "@/bik-lib/context/auth/Auth2Provider";
import { ApiDeleteClientData } from "./ClientInfoOperations";
import { Reorder, useDragControls } from "framer-motion";
import { motion } from "motion/react";
import { cn } from "@/bik-lib/utils/cn";
import TooltipWrapper from "@/bik-lib/lib/TooltipWrapper";
import TableReorderIcon from "../manage-application/components/table/TableReorderIcon";
import StatusColor from "@/bik-lib/utils/statusColor";
import useApi from "@/bik-lib/utils/useApi";

interface IProps {
  item: TClientData;
  setIsDragging: any;
  isDragging: boolean;
}
const ClientInfoTableRowComp: FC<IProps> = ({
  item,
  setIsDragging,
  isDragging,
}: IProps) => {
  const {
    setMessage,
    setStatus,
    openModal,
    setConfirm,
    setTemplateLoading,
    closeModal,
  } = useTemplate();
  const dragControls = useDragControls();
  const { authInfo } = useAuth2();
  const { reFetch, status } = useClientInfo();
  const { put } = useApi();

  const updateStatus = (item: TClientData) => {
    setStatus({
      array: status,
      name: item?.id.toString(),
      defaultValue: item?.status,
      clickAction: (payload: Record<string, any>) => {
        setTemplateLoading(true);
        setMessage("Updating status...");
        put(`/admin/client/${item?.id}/update-status`, payload)
          .then(({ message }) => {
            setMessage(message);
            reFetch();
            setStatus(null);
          })
          .catch((err) => {
            setMessage(err.message);
          })
          .finally(() => {
            setTemplateLoading(false);
          });
      },
    });
  };

  const handleRemoveClient = (item: string) => {
    setConfirm({
      show: true,
      text: "Are you sure, you want to remove this client?",
      textAction: "Remove",
      textCancel: "No",
      clickAction: () => {
        setTemplateLoading(true);
        setMessage("Removing client ...");
        ApiDeleteClientData(authInfo, item)
          .then(({ message }) => {
            setMessage(message);
            setConfirm(null);
            reFetch();
          })
          .catch((ex) => {
            setMessage(ex.message);
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
        <div className="font-medium text-center w-[100px] flex items-center gap-1 !pl-0 px-2">
          <span>
            <TableReorderIcon dragControls={dragControls} />
          </span>
          <span>{item.id}</span>
        </div>
        <div className="flex justify-center items-center w-[200px]">
          <Image
            src={item.organizationLogoUrl || icons.iconDefaultApp}
            alt={item.organizationName}
            width={0}
            height={0}
            sizes="100vw"
            className="size-[36px] rounded-full border border-secondary"
          />
        </div>
        <div className="2xl:w-[300px] w-[230px]">
          <p className="text-primary-900 text-sm  font-medium text-left">
            {item.organizationName}
          </p>
        </div>
        {/* <div className="w-[200px]">
          <p className="text-primary-500 text-sm font-normal text-center">
            {item.organizationKey}
          </p>
        </div> */}
        <div className="w-[200px]">
          <p className="text-primary-500 text-sm font-normal text-center">
            {item.services}
          </p>
        </div>
        <div className="w-[150px]">
          <p className="text-primary-500 text-sm text-center">
            <TooltipWrapper content={GetTime(item.timeCreated) || ""}>
              {GetDate(item.timeCreated)}
            </TooltipWrapper>
          </p>
        </div>
        <div className="text-center w-[100px]">
          <StatusColor status={item?.status || "---"} />
        </div>
        <div className="text-right flex justify-end w-[50px]">
          <InstOption>
            <button
              type="button"
              onClick={() => openModal("update-client", item)}
            >
              Update Client
            </button>
            <button
              type="button"
              onClick={() => openModal("update-client-logo", item)}
            >
              Update Client Logo
            </button>
            <button type="button" onClick={() => updateStatus(item)}>
              Update Status
            </button>
            <button
              type="button"
              onClick={() => handleRemoveClient(item.id.toString())}
            >
              Remove
            </button>
          </InstOption>
        </div>
      </motion.div>
    </Reorder.Item>
  );
};

export default ClientInfoTableRowComp;
