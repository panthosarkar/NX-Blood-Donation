"use client";
import { FC, ReactNode, useState } from "react";
import links from "./links";
import Link from "next/link";
import { cn } from "@/bik-lib/utils/cn";
import SearchBar from "@/bik-lib/features/search/SearchBar";
import Image from "next/image";
import AdvMenuItemComp from "./AdvMenuItemComp";

type TProps = {
  show: boolean;
};

const Container: FC<
  TProps & {
    children: ReactNode;
  }
> = ({ show, children }) => {
  if (!show) return null;
  return (
    <div
      className={cn(
        "w-[550px] h-screen fixed left-[67px] top-0 bg-white shadow-[4px_0px_50px_0px_rgba(19,15,64,0.10)] z-50 transition-all overflow-hidden flex flex-col"
        // {
        //   "w-[450px]": show,
        // }
      )}
    >
      {children}
    </div>
  );
};
const AdvAllMenuHeaderComp: FC<{
  closePopup: () => void;
  search: string;
  setSearch: (value: string) => void;
}> = ({ closePopup, search, setSearch }) => {
  return (
    <div className="mx-6 py-5 flex items-center justify-between gap-[14px]">
      <h2 className="text-lg text-nowrap font-medium text-primary">
        All Tools
      </h2>
      <div className="py-1.5 w-[325px] border border-primary-200 rounded-lg">
        <SearchBar
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          autoComplete="off"
          placeholder="Search..."
          className="!bg-white"
        />
      </div>
      <button onClick={closePopup}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.65769 6.99866L13.5121 2.14426C13.7341 1.92355 13.8569 1.62839 13.8569 1.31496C13.8569 1.00152 13.7341 0.707666 13.5121 0.485647C13.0707 0.0429134 12.2975 0.0403014 11.8535 0.485647L6.99907 5.34004L2.14467 0.485647C1.68757 0.0285474 0.943155 0.0285474 0.486056 0.485647C0.0289563 0.942746 0.0289563 1.68586 0.486056 2.14426L5.34045 6.99866L0.486056 11.8531C0.264036 12.0751 0.142578 12.3702 0.142578 12.6824C0.142578 12.9958 0.264036 13.291 0.486056 13.5117C0.930095 13.957 1.70455 13.9544 2.14467 13.5117L6.99907 8.65728L11.8535 13.5117C12.0755 13.7337 12.3706 13.8565 12.6828 13.8565C12.9962 13.8565 13.2927 13.7337 13.5121 13.5117C13.7341 13.291 13.8569 12.9958 13.8569 12.6837C13.8569 12.3715 13.7341 12.0751 13.5121 11.8531L8.65769 6.99866Z"
            fill="#130F40"
          />
        </svg>
      </button>
    </div>
  );
};
const AdvAllMenuRecentComp: FC = () => {
  return (
    <div className=" mx-6 my-2">
      <h2 className="text-lg font-medium text-primary">Recently Used</h2>
      <div className="overflow-x-auto flex gap-5  overflow-y-hidden h-full pt-5 custom-scrollbar">
        {links?.slice(0, 1).map((menu) => (
          <div key={menu.id}>
            <div className="flex  gap-5 text-secondary-700">
              {menu.subMenu
                ?.slice(0, 4)
                .map(({ id, title, iconL, iconF, active }) => {
                  return (
                    <Link
                      key={id}
                      href={id}
                      className={cn("text-primary-700 ", {
                        "text-secondary": active,
                      })}
                    >
                      <div className="items-center flex justify-center bg-white shadow-[0px_5px_20px_0px_rgba(19,15,64,0.07)] size-[84px] rounded-xl">
                        <Image
                          src={iconF}
                          alt="title"
                          width={0}
                          height={0}
                          sizes="100vh"
                          className="size-10"
                        />
                      </div>
                      <span className="text-sm pt-2.5 text-center text-wrap overflow-hidden line-clamp-2 overflow-ellipsis">
                        {title}
                      </span>
                    </Link>
                  );
                })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const AdvAllMenuPopup: FC<
  TProps & {
    closePopup: () => void;
  }
> = ({ show, closePopup }) => {
  const [search, setSearch] = useState("");
  const filteredLinks = links.filter(
    (menu) =>
      menu.title.toLowerCase().includes(search.toLowerCase()) ||
      menu.subMenu.some((sub) =>
        sub.title.toLowerCase().includes(search.toLowerCase())
      )
  );

  return (
    <Container show={show}>
      <AdvAllMenuHeaderComp
        closePopup={closePopup}
        search={search}
        setSearch={setSearch}
      />
      {/* <AdvAllMenuRecentComp /> */}
      <div className="overflow-y-auto  overflow-x-hidden h-full px-[25px] pb-10 custom-scrollbar">
        <div className="flex items-start gap-7.5">
          <div className="flex flex-col gap-5 w-full">
            {filteredLinks.slice(0, 5).map((menu) => (
              <AdvMenuItemComp
                key={menu.id}
                menu={menu}
                closePopup={closePopup}
              />
            ))}
          </div>
          <div className="flex flex-col gap-5 w-full">
            {filteredLinks.slice(5).map((menu) => (
              <AdvMenuItemComp
                key={menu.id}
                menu={menu}
                closePopup={closePopup}
              />
            ))}
          </div>
        </div>
        {filteredLinks.length === 0 && (
          <div className="text-center text-secondary-700 text-lg py-20">
            No Admin Menu found
          </div>
        )}
      </div>
    </Container>
  );
};

export default AdvAllMenuPopup;
