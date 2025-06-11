"use client";
import React, { useEffect, useState } from "react";
import AdvLabel1 from "./AdvLabel1";
import AdvLabel2 from "./AdvLabel2";
import Image from "next/image";
import menuIcon from "./icons/icon-menu.svg";
import "./adv-menu.css";
import { useAdvMenu } from "./AdvMenuProvider";
import links from "./links";
import AdvAllMenuPopup from "./AdvAllMenuPopup";

function AdvMenu() {
  const [showAllMenu, setShowAllMenu] = useState<boolean>(false);
  const { activeMenu, drawerOpen, toggle, setDrawerOpen } = useAdvMenu();

  const handleToggle = () => {
    if (activeMenu.subMenu && activeMenu.subMenu.length) {
      toggle();
      // setShowAllMenu(false);
    }
  };
  useEffect(() => {
    if (!activeMenu.subMenu.length) {
      setDrawerOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeMenu]);

  return (
    <div>
      <div
        className={`adv-menu flex justify-between items-stretch print:hidden ${
          activeMenu.subMenu && activeMenu.subMenu.length && drawerOpen
            ? "drawer-opened"
            : "drawer-closed"
        } `}
      >
        <div className="layer-1 flex-col align-center position-space-between h-100p">
          <div className="btn-menu flex justify-center items-center">
            <button type="button" onClick={handleToggle} className="no-style">
              <div>
                <Image
                  src={menuIcon}
                  alt="alt"
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="w-full h-auto"
                />
              </div>
            </button>
          </div>
          <AdvLabel1
            links={links}
            activeMenu={activeMenu}
            setShowAllMenu={setShowAllMenu}
            showAllMenu={showAllMenu}
          />
        </div>
        <div className="layer-2 fill">
          <AdvLabel2 menu={activeMenu} />
        </div>
      </div>

      <AdvAllMenuPopup
        key={activeMenu.id}
        show={showAllMenu}
        closePopup={() => setShowAllMenu(false)}
      />
    </div>
  );
}

export default AdvMenu;
