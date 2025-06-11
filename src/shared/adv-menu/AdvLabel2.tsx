import React from "react";
import Image from "next/image";
import Link from "next/link";
import { TLink } from "./AdvMenuTypes";

function AdvLabel2({ menu }: { menu: TLink }) {
  return (
    <div className="adv-l2-cont">
      <div className="adv-l2-head flex items-center">
        <Image
          src={menu.iconFill}
          alt="alt"
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-auto"
        />
        <span className="text-dot"> {menu.title}</span>
      </div>
      <ul className="adv-list-2">
        {menu.subMenu?.map(({ id, title, iconL, iconF, active }) => (
          <li key={id} className={active ? "active" : ""}>
            <Link href={`${id}`} title={title} className="menu">
              <Image
                src={iconL}
                alt="alt"
                width={0}
                height={0}
                sizes="100vw"
                className="w-full h-auto"
              />
              <Image
                src={iconF}
                alt="alt"
                width={0}
                height={0}
                sizes="100vw"
                className="w-full h-auto"
              />
              <span>{title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdvLabel2;
