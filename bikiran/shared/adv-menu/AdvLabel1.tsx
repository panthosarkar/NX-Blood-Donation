import { useEffect, useRef, useState } from "react";
import { TLink } from "./AdvMenuTypes";
import Link from "next/link";
import Image from "next/image";
import AllMenu from "./AllMenu";
import AdvLabel2 from "./AdvLabel2";
import AdvAllMenuPopup from "./AdvAllMenuPopup";
import { useAdvMenu } from "./AdvMenuProvider";
import { TState } from "@/bik-lib/types/event";

type TAdvLabel1 = {
  links: TLink[];
  activeMenu: TLink;
  setShowAllMenu: TState<boolean>;
  showAllMenu: boolean;
};
type TItem = {
  menu: TLink;
  activeMenu: TLink;
  onMenuClick: () => void;
};

function Item({ menu, activeMenu, onMenuClick }: TItem) {
  const { id, title, miniTitle, iconFill, iconLine, subMenu } = menu;
  const ref = useRef(null);
  const path = subMenu?.length ? subMenu[0]?.id : id;

  return (
    <li
      className={`${id === activeMenu.id ? "active" : ""} ${
        subMenu && subMenu.length ? "has-submenu" : ""
      }`}
      ref={ref}
    >
      <Link href={path} className="menu" onClick={onMenuClick}>
        <div title={title}>
          <Image
            src={iconFill}
            alt="alt"
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-auto"
          />
          <Image
            src={iconLine}
            alt="alt"
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-auto"
          />
        </div>
        <span className="text-uppercase">{miniTitle}</span>
      </Link>
      <AdvLabel2 menu={menu} />
    </li>
  );
}

function AdvLabel1({
  links,
  activeMenu,
  showAllMenu,
  setShowAllMenu,
}: TAdvLabel1) {
  return (
    <div className="relative">
      <ul className="fill adv-list-1 no-scrollbar">
        {links.slice(0, 5).map((menu) => (
          <Item
            menu={menu}
            key={menu.id}
            activeMenu={activeMenu}
            onMenuClick={() => setShowAllMenu(false)}
          />
        ))}

        <AllMenu
          show={showAllMenu}
          onClick={() => setShowAllMenu((prev: boolean) => !prev)}
        />
      </ul>
    </div>
  );
}

export default AdvLabel1;
