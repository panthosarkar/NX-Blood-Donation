/* eslint-disable no-unused-vars */
import { DocsMenuTableContentBtn } from "./DocsMenuActionButton";
import React, { useState } from "react";
import { ReorderIcon } from "./ReorderIcon";
import { cn } from "@/bik-lib/utils/cn";
import { Reorder, useDragControls, useMotionValue } from "framer-motion";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { TTableListItem } from "../../types/TTableListItem";
import Image from "next/image";
import { icons } from "@/bikiran/lib/icons";

type TrProps = {
  item: TTableListItem;
  isDragging?: boolean;
  // eslint-disable-next-line no-unused-vars
  setIsDragging?: (value: boolean) => void;
  // eslint-disable-next-line no-unused-vars
  openModal?: (type: string, data?: any) => void;
  handleExpandedId?: (id: number) => void;
  isExpandedId?: number;
  isExpanded?: boolean;
};

const SubSubTr = ({ item }: TrProps) => {
  return (
    <tr>
      <td colSpan={3} className="!pl-1">
        <div className="flex gap-2">
          <ReorderIcon />
          <span>{item.id}</span>
        </div>
      </td>
      <td>{item.title}</td>
      <td>{item.fullPermalink}</td>
      <td>{item.priority}</td>
      <td
        className={cn("text-center capitalize", {
          "!text-error": item.status === "inactive",
          "!text-success": item.status === "active",
        })}
      >
        {item.status}
      </td>
      <td>
        <DocsMenuTableContentBtn item={item} isSubMenu={false} />
      </td>
    </tr>
  );
};
const SubTr = ({ item, isDragging, isExpanded }: TrProps) => {
  return (
    <>
      <tr
        className={cn({
          "select-none": isDragging,
          hidden: !isExpanded,
        })}
      >
        <td colSpan={2} className="!pl-1">
          <div className="flex gap-2">
            <ReorderIcon />
            <span>{item.id}</span>
          </div>
        </td>
        <td colSpan={1}>{item.title}</td>
        <td>{item.fullPermalink}</td>
        <td className="text-center">{item.isPublic ? "Yes" : "No"}</td>
        <td className="text-center">{item.isContent ? "Yes" : "No"}</td>
        <td className="text-center">{item.priority}</td>
        <td
          className={cn("text-center capitalize", {
            "!text-error": item.status === "inactive",
            "!text-success": item.status === "active",
          })}
        >
          {item.status}
        </td>
        <td>
          <DocsMenuTableContentBtn item={item} isSubMenu={false} />
        </td>
      </tr>
      {item.children.length > 0 &&
        item.children.map((subItem) => {
          return <SubSubTr key={subItem.id} item={subItem} />;
        })}
    </>
  );
};

const Tr = ({
  item,
  isDragging,
  setIsDragging,
  handleExpandedId,
  isExpandedId,
}: TrProps) => {
  const { openModal } = useTemplate();
  const y = useMotionValue(0);
  // const boxShadow = useRaisedShadow(y);
  const dragControls = useDragControls();
  const isSubMenu = item.children.length > 0;
  const isExpanded = isExpandedId === item.id;
  return (
    <>
      <Reorder.Item
        as="tr"
        value={item}
        // style={{ boxShadow, y }}
        dragListener={false}
        dragControls={dragControls}
        onDragStart={setIsDragging ? () => setIsDragging(true) : undefined}
        onDragEnd={setIsDragging ? () => setIsDragging(false) : undefined}
        className={cn(
          "group/row [&>td]:!text-primary [&>td]:!font-medium [&>td]:!text-base",
          {
            "select-none": isDragging,
            "!bg-secondary-50": isExpanded,
          }
        )}
      >
        <td className="!pl-1">
          <div className="flex gap-2">
            <ReorderIcon dragControls={dragControls} />
            <span>{item.id}</span>
          </div>
        </td>
        <td colSpan={2}>
          <button
            type="button"
            onClick={() => handleExpandedId && handleExpandedId(item.id)}
            className="flex items-center gap-1 group-hover/row:underline"
          >
            {item.title}
            {isSubMenu && (
              <span className="inline-block size-4">
                <Image
                  src={icons.iconAction
                    // isExpanded
                    //   ? arrowIcons.collapseArrowLine
                    //   : arrowIcons.expandedArrowLine
                  }
                  alt="arrow"
                  width={24}
                  height={24}
                  className="size-full"
                />
              </span>
            )}
          </button>
        </td>
        <td>{item.fullPermalink}</td>
        <td className="text-center">{item.isPublic ? "Yes" : "No"}</td>
        <td className="text-center">{item.isContent ? "Yes" : "No"}</td>
        <td className="text-center">{item.priority}</td>
        <td className={cn("text-center capitalize")}>
          <span
            className={cn({
              "!text-error": item.status === "inactive",
              "!text-success": item.status === "active",
            })}
          >
            {item.status}
          </span>
        </td>
        <td>
          <DocsMenuTableContentBtn
            item={item}
            isMenuReorder
            subMenuitemArr={item.children.length > 0 ? item.children : []}
          />
        </td>
      </Reorder.Item>
      {isSubMenu &&
        item.children.map((subItem) => {
          // create recursive sub menu item
          return (
            <SubTr
              key={subItem.id}
              item={subItem}
              isDragging={isDragging}
              openModal={openModal}
              isExpanded={isExpanded}
            />
          );
        })}
    </>
  );
};

type TBodyProps = {
  items: TTableListItem[];
  // eslint-disable-next-line no-unused-vars
  setItems: (items: TTableListItem[]) => void;
  // eslint-disable-next-line no-unused-vars
  setIsDragging: (value: boolean) => void;
  isDragging: boolean;
};

const DocsMenuTableBody = ({
  items,
  setItems,
  isDragging,
  setIsDragging,
}: TBodyProps) => {
  const [isExpandedId, setIsExpandedId] = useState<number>(0);

  const handleExpandedId = (id: number) => {
    if (isExpandedId === id) {
      setIsExpandedId(0);
    } else {
      setIsExpandedId(id);
    }
  };

  return (
    <Reorder.Group as="tbody" axis="y" values={items} onReorder={setItems}>
      {items.map((item: TTableListItem) => {
        return (
          <Tr
            key={item.id}
            item={item}
            isDragging={isDragging}
            setIsDragging={setIsDragging}
            handleExpandedId={handleExpandedId}
            isExpandedId={isExpandedId}
          />
        );
      })}
    </Reorder.Group>
  );
};

export default DocsMenuTableBody;
