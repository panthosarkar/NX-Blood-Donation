"use client";
import React, { FC } from "react";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { InstOption } from "@/bik-lib/features/inst-option/InstOption";
import Image from "next/image";
import Link from "next/link";
import { ITableContentBtn, TTableListItem } from "../../types/TTableListItem";
import { icons } from "@/bikiran/lib/icons";

type Props = {
  item: TTableListItem;
};

// View button
export const DocsMenuTableContentViewBtn = ({ item }: Props) => {
  return (
    <Link
      href={{
        pathname: `/manage/application/${item.appKey}/${item.parentId === 0 ? item.id : item.parentId
          }`,
        hash: item.permalink,
      }}
      className="group/view"
    >
      <div className={"size-8"}>
        <Image
          src={icons.iconAction}
          alt="View icon line"
          className="group-hover/view:opacity-0 group/view:opacity-100 transition-opacity duration-300"
        />
        <Image
          src={icons.iconAction}
          alt="View icon fill"
          className="group-hover/view:opacity-100 group/view:opacity-0  transition-opacity duration-300"
        />
      </div>
    </Link>
  );
};

export const DocsMenuTableContentBtn: FC<ITableContentBtn> = ({
  item,
  isSubMenu = true,
  isMenuReorder = false,
  subMenuitemArr = [],
}) => {
  const { openModal } = useTemplate();
  return (
    <div className="flex items-center justify-end gap-2">
      <DocsMenuTableContentViewBtn item={item} />
      <InstOption>
        {isSubMenu ? (
          <button
            type="button"
            onClick={() => openModal("create-docs-menu-item", item)}
          >
            Add Sub Menu
          </button>
        ) : null}
        {/* Sub menu reorder button */}
        {isMenuReorder && subMenuitemArr.length > 1 ? (
          <button
            onClick={() =>
              openModal("docs-sub-menu-item-reorder", subMenuitemArr)
            }
          >
            Re-order Sub Menu
          </button>
        ) : null}
        <Link href={`/manage/application/${item.appKey}/${item.id}`}>View</Link>
        <button onClick={() => openModal("edit-docs-menu-item", item)}>
          Update
        </button>
        <button onClick={() => openModal("docs-menu-item-content-add", item)}>
          Delete Item
        </button>
      </InstOption>
    </div>
  );
};
