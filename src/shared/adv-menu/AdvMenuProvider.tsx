/* eslint-disable no-unused-vars */
"use client";

import { usePathname } from "next/navigation";
import React, {
  createContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import links, { dashboardMenu } from "./links";
import { TLink } from "./AdvMenuTypes";
import { SIZE_2XL, useLayout } from "@/bik-lib/context/LayoutProvider";

interface IAdvMenuContext {
  showProjectAddModal: boolean;
  setShowProjectAddModal: (show: boolean) => void;
  drawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
  activeMenu: TLink;
  setActiveMenu: (menu: any) => void;
  toggle: () => void;
}

const defaultContext: IAdvMenuContext = {
  showProjectAddModal: false,
  setShowProjectAddModal: () => {},
  drawerOpen: true,
  setDrawerOpen: () => {},
  activeMenu: links[0],
  setActiveMenu: () => {},
  toggle: () => {},
};

const AdvMenuContext = createContext<IAdvMenuContext>(defaultContext);

export const useAdvMenu = () => {
  const context = React.useContext(AdvMenuContext);
  return context;
};

interface IAdvMenuContextProps {
  children: React.ReactNode;
}

// interface IProject {
//     id: number;
//     name: string;
//     icon: string;
// }

// interface INavigation {
//     (path: string): void;
// }

// export function getBreadcrumb() {
//     const cuPath = typeof window !== undefined && window.location.pathname;
//     return cuPath ? cuPath.split("/").slice(1, 3) : [];
// }

// export function setProject(navigate: INavigation, project: IProject): void {
//     const currentUrl = typeof window !== undefined ? window.location.href : '';
//     const URL = new URLParse(currentUrl, true);

//     if (project?.id) {
//         URL.query["project-id"] = project.id.toString();

//         const newUrl = URL.toString();
//         if (newUrl !== currentUrl) {
//             navigate(newUrl.split(URL.origin)[1]);
//         }
//     }
// }
// export function getProjectId() {
//     const URL = new URLParse(
//         typeof window !== undefined ? window.location.href : '',
//         true
//     );
//     return parseInt(URL.query["project-id"]?.toString() || "0", 10);
// }

// export function mkUrl(path: string) {
//     const URL = new URLParse(
//         typeof window !== undefined ? window.location.href : '',
//         true
//     );
//     URL.pathname = path;
//     return URL.toString();
// }

// export function mkRelativeUrl(path: string, queryParams = {}) {
//     const URL = new URLParse(
//         typeof window !== undefined ? window.location.href : '',
//         true
//     );
//     URL.pathname = path;
//     URL.query = { "project-id": getProjectId(), ...queryParams };

//     return URL.toString().split(URL.origin)[1];
// }

const AdvMenuProvider = ({ children }: IAdvMenuContextProps) => {
  // reload -2 = no reload, -1 = reload, 0 = default
  // project add
  const [showProjectAddModal, setShowProjectAddModal] = useState(false);

  // Menu Operation
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState(links[0]);

  const pathname = usePathname();

  const { windowWidth } = useLayout();

  const bodyRef = useRef<HTMLDivElement>(null);

  // Function to update the bodyWidth
  const updateWidth = () => {
    if (bodyRef.current) {
      const newWidth = (bodyRef.current.offsetWidth, 10);
      if (newWidth < 1230) {
        setDrawerOpen(false);
      } else if (newWidth > 1460) {
        setDrawerOpen(true);
      }
    }
  };

  useEffect(() => {
    // Add event listener on component mount
    typeof window !== undefined &&
      window.addEventListener("resize", updateWidth);

    // Call the updateWidth function initially
    updateWidth();

    // Clean up the event listener on component unmount
    return () => {
      typeof window !== undefined &&
        window.removeEventListener("resize", updateWidth);
    };
  }, []);

  useEffect(() => {
    // --Menu
    setActiveMenu((cuData) => {
      const loInfo = pathname.split("/").filter((d) => !!d);

      // Find the menu that matches the current pathname
      const menuSelected = links.find((data) => {
        const menuIdParts = data.id.split("/").filter((d) => !!d);
        return (
          loInfo.slice(0, menuIdParts.length).join("/") ===
          menuIdParts.join("/")
        );
      });

      if (cuData.id !== pathname && menuSelected) {
        const subMenu = menuSelected.subMenu.map((data) => ({
          ...data,
          active: data?.id?.split("?")?.[0] === `/${loInfo.join("/")}`,
        }));

        return { ...menuSelected, subMenu, location };
      }
      if (pathname === "/dashboard") {
        return dashboardMenu;
      }
      return cuData;
    });
  }, [pathname]);

  // console.log(activeMenu, "++++");

  // Only first time
  useEffect(() => {
    if (windowWidth < SIZE_2XL) {
      setDrawerOpen(false);
    }
  }, []);

  const value = useMemo(() => {
    const toggle = () => {
      setDrawerOpen((st) => !st);
    };

    // const handelMenu = (location) => {
    //     // --Menu
    //     setActiveMenu((cuData) => {
    //         const loInfo = location.split("/").filter((d) => !!d);
    //         const menuSelected = links.find((data) => data.id === loInfo[0]);
    //         if (cuData.location !== location && menuSelected) {
    //             const subMenu = menuSelected.subMenu.map((data) => ({
    //                 ...data,
    //                 active: data.id === `${loInfo[0]}/${loInfo[1]}`,
    //             }));

    //             return { ...menuSelected, subMenu, location };
    //         }
    //         return cuData;
    //     });

    //     // --Project
    //     // setActiveProject(() => {
    //     //     const id = getProjectId();
    //     //     return projects.find((item) => item.id === id);
    //     // });
    // };

    // const handleAddProject = () => {
    //     setShowProjectAddModal(true);
    // };
    // const handleManageProjects = () => {
    //     console.log("manage Projects");
    // };

    return {
      showProjectAddModal,
      setShowProjectAddModal,
      drawerOpen,
      setDrawerOpen,
      activeMenu,
      setActiveMenu,
      toggle,
    };
  }, [
    showProjectAddModal,
    setShowProjectAddModal,
    drawerOpen,
    setDrawerOpen,
    activeMenu,
    setActiveMenu,
  ]);

  return (
    <AdvMenuContext.Provider value={value}>{children}</AdvMenuContext.Provider>
  );
};

export default AdvMenuProvider;
