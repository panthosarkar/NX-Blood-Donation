"use client";
import {
  TableApplicationEditButton,
  TableApplicationStatusUpdateButton,
  TableApplicationViewButton,
} from "./TableActionButton";
import { FC } from "react";
import { cn } from "@/bik-lib/utils/cn";
import { icons } from "@/bikiran/lib/icons";
import { motion } from "motion/react";
import { GetDate, GetTime } from "@/bik-lib/utils/date";
import { Reorder, useDragControls } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import TableReorderIcon from "./TableReorderIcon";
import { InstOption } from "@/bik-lib/features/inst-option/InstOption";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import StatusColor from "@/bik-lib/utils/statusColor";
import TooltipWrapper from "@/bik-lib/lib/TooltipWrapper";
import useApi from "@/bik-lib/utils/useApi";
import { useManageApp } from "../../context/ManageApplicationProvider";

type Props = {
  item: any;
  setIsDragging: any;
  isDragging: boolean;
};

const ApplicationTableBodyItem: FC<Props> = ({
  item,
  setIsDragging,
  isDragging,
}) => {
  const dragControls = useDragControls();
  const { openModal, setStatus, setTemplateLoading, setMessage } =
    useTemplate();
  const { put } = useApi();
  const { reFetch } = useManageApp();

  const updateStatus = (item: any) => {
    setStatus({
      array: ["active", "inactive"],
      name: item?.id.toString(),
      defaultValue: item?.status,
      clickAction: (payload: Record<string, any>) => {
        setTemplateLoading(true);
        setMessage("Updating status...");
        put(`/admin/application/${item.id}/update-status`, payload)
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
          "group/row h-14.5 text-primary-900 text-base hover:cursor-pointer *:text-sm *:px-2 hover:bg-muted/50  !cursor-default relative grid grid-flow-col items-center",
          {
            "select-none": isDragging,
          }
        )}
      >
        <div className="w-[70px] text-center">
          <span>{item.priority}</span>
        </div>
        <div className="w-[100px] flex items-center gap-1 !pl-0">
          <TableReorderIcon dragControls={dragControls} />
          <span>{item?.id}</span>
        </div>
        <div className="w-[120px] flex justify-center items-center">
          <span className="inline-block size-9 border border-primary-200 overflow-hidden rounded-lg">
            <Image
              src={item?.logoUrl} //item?.logoUrl || icons.iconDefaultApp
              alt={item.uniqueName}
              height={100}
              width={100}
              className="size-full"
            />
          </span>
        </div>
        <div className="w-[100px] text-left">
          <Link
            className="inline-block w-11/12 group-hover/row:font-medium hover:underline"
            href={`/manage/application/${item?.uniqueName}`}
          >
            {item?.title}
          </Link>
        </div>
        <div className="w-[170px] text-center">{item?.uniqueName}</div>
        <div className="w-[260px]">
          <Link
            href={item.websiteUrl}
            target="_blank"
            className="inline-flex items-center gap-2 w-11/12"
            title={item.websiteUrl}
          >
            <span
              style={{
                display: "inline-block",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden",
              }}
            >
              {item.websiteUrl}
            </span>
            <Image
              src={icons.iconLink}
              alt={item.uniqueName}
              height={100}
              width={100}
              className="size-4 opacity-0 group-hover/row:opacity-100 transition-opacity"
            />
          </Link>
        </div>
        <div className="w-[150px]  text-center">
          <div className="flex flex-col items-center text-center">
            <TooltipWrapper content={GetTime(item.timeCreated) || ""}>
              <span>{GetDate(item.timeCreated)}</span>
            </TooltipWrapper>
          </div>
        </div>
        <div className="w-[100px] text-center">
          <StatusColor status={item?.status || "---"} />
        </div>
        <div className="text-right text-white flex gap-2 justify-end w-[100px]">
          <TableApplicationViewButton item={item} />
          <InstOption>
            <button onClick={() => openModal("update-application", item)}>
              Edit
            </button>
            <button onClick={() => updateStatus(item)}>Update Status</button>
          </InstOption>
          {/* <TableApplicationEditButton item={item} /> */}
          {/* <TableApplicationStatusUpdateButton item={item} /> */}
        </div>
      </motion.div>
    </Reorder.Item>
  );
};

export default ApplicationTableBodyItem;
