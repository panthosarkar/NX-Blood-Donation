import { TLink } from "./AdvMenuTypes";
import { icons } from "@/bikiran/lib/icons";
import { useAdvMenu } from "./AdvMenuProvider";
import { FC, useMemo, useRef } from "react";
import Image from "next/image";

const menu: TLink = {
  id: "/all",
  miniTitle: "All",
  title: "All",
  iconFill: icons.iconSidebarAllFill,
  iconLine: icons.iconSidebarAll,
  subMenu: [],
};

const inactiveMenuIds = [
  "/user",
  "/domain",
  "/hosting",
  "/premium",
  "/appocean",
  "/dashboard",
];

const AllMenu: FC<{
  show: boolean;
  onClick: () => void;
}> = ({ show, onClick }) => {
  const { activeMenu } = useAdvMenu();

  const { title, miniTitle, iconFill, iconLine, subMenu } = menu;
  const ref = useRef(null);

  const isActive = useMemo(() => {
    const isMatched = inactiveMenuIds.some((menuId) =>
      activeMenu.id.includes(menuId)
    );

    return !isMatched;
  }, [activeMenu.id]);

  return (
    <li
      className={`${!activeMenu.show || show || isActive ? "active" : ""}`}
      ref={ref}
    >
      <button type="button" className="menu" onClick={onClick}>
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
      </button>
      {/* <AdvLabel2 menu={menu} /> */}
    </li>
  );
};

export default AllMenu;
