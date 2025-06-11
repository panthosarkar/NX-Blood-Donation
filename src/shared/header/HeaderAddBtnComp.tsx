import Image from "next/image";
import React from "react";
import { btn } from "./constant";

const HeaderAddBtnComp = () => {
  const hoverRef = React.useRef<HTMLDivElement>(null);

  return (
    <div className="group hidden md:block" ref={hoverRef}>
      <div className="relative bg-secondary hover:bg-secondary-700 text-white transition-colors duration-300 rounded-5 md:rounded-8 md:px-[15px] md:py-[5px] md:text-base px-2.5 py-1 text-xs cursor-pointer md:after:absolute md:after:-bottom-2 md:after:right-0 md:after:w-20 md:after:h-[45px] md:after:opacity-0 text-nowrap font-medium ">
        + Add
      </div>
      <div className="group-hover:block hidden absolute top-[50px] right-0 -translate-x-1/2 bg-white shadow-lg rounded-8 ">
        {btn.map((i) => (
          <button
            key={i.id}
            className="flex items-center gap-2.5 text-primary hover:text-secondary hover:bg-secondary-50 px-[15px] py-[10px] group/img first:rounded-t-8 last:rounded-b-8 w-[300px] text-nowrap"
            onClick={i.onClick}
          >
            <Image
              width={100}
              height={100}
              sizes="100vw"
              src={i.icon}
              alt="iconBlock"
              className="size-5 group-hover/img:hidden block"
            />
            <Image
              width={100}
              height={100}
              sizes="100vw"
              src={i.iconFill}
              alt="iconFill"
              className="size-5 group-hover/img:block hidden"
            />
            <span>{i.title}</span>
            {i.tag && (
              <span className="bg-secondary text-white rounded-5 uppercase px-[11px] py-0.5 text-nowrap">
                {i.tag}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default HeaderAddBtnComp;
