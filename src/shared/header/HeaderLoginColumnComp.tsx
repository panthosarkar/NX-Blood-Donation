"use client";
import { FC } from "react";
import { useAuth2 } from "@/bik-lib/context/auth/Auth2Provider";
import HeaderServiceBtnComp from "./HeaderServiceBtnComp";
import HeaderMenuNotificationComp from "./HeaderMenuNotificationComp";
// import { ProfileManage } from "@src/utils";
import AuthCompWrapper from "@/bik-lib/context/auth/AuthCompWrapper";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@bikiran/button";
import HeaderAddBtnComp from "./HeaderAddBtnComp";
import { usePathname } from "next/navigation";
import { cn } from "@/bik-lib/utils/cn";

const HeaderLoginColumnComp: FC = ({}) => {
  const pathname = usePathname();
  const isDashboard = pathname === "/dashboard";

  return (
    <ul className="flex items-center justify-end gap-3.5 lg:gap-4">
      <li>
        <Button
          variant={!isDashboard ? "blue-line-bordered" : "blue"}
          className="group"
        >
          <Link href="/dashboard" className="flex items-center gap-2.5">
            <svg
              width="16"
              height="16"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={cn("text-[#4370ff] group-hover:text-white", {
                "text-white": isDashboard,
              })}
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2.14001 1.42857C4.19375 1.42857 6.24749 1.42857 8.30209 1.42857C8.77352 1.42857 9.01181 1.66429 9.01267 2.12972C9.01352 4.18946 9.01352 6.2492 9.01267 8.30894C9.01267 8.77352 8.77352 9.01009 8.30209 9.01009C7.57008 9.01095 6.83807 9.01095 6.10692 9.01009H2.15801C1.66086 9.01009 1.42943 8.78123 1.42857 8.28923C1.42857 6.24235 1.42857 4.19461 1.42857 2.14772C1.42943 1.66429 1.66172 1.42943 2.14001 1.42857ZM11.693 1.42943C13.7536 1.42857 15.8133 1.42857 17.8731 1.42943C18.3316 1.42943 18.5734 1.66943 18.5734 2.12201C18.5742 4.18775 18.5742 6.25435 18.5734 8.32009C18.5734 8.77181 18.3308 9.01095 17.8713 9.01181C17.2602 9.01267 16.649 9.01267 16.0379 9.01181H11.7101C11.2267 9.01181 10.991 8.77866 10.991 8.30037C10.9901 6.24663 10.9901 4.19375 10.991 2.14001C10.9918 1.66772 11.2276 1.42943 11.693 1.42943ZM8.30209 10.9893C7.27522 10.9893 6.24835 10.9893 5.22148 10.9893C4.19461 10.9893 3.16774 10.9893 2.14087 10.9893C1.66257 10.9893 1.43029 11.225 1.42943 11.7084C1.42943 12.2801 1.42943 12.851 1.42943 13.4227V15.6813C1.42943 16.4099 1.42943 17.1393 1.43029 17.8688C1.43029 18.3274 1.66943 18.5708 2.12115 18.5708C4.18775 18.5716 6.25435 18.5716 8.32009 18.5708C8.77266 18.5708 9.01267 18.3282 9.01267 17.8696C9.01352 15.8099 9.01352 13.7502 9.01267 11.6904C9.01181 11.225 8.77266 10.9893 8.30209 10.9893ZM14.645 10.9935C15.635 10.9464 16.5856 11.2927 17.3228 11.9664C18.0788 12.6573 18.5194 13.6087 18.5639 14.6459C18.6076 15.6496 18.2554 16.6096 17.5722 17.3485C16.8813 18.0959 15.9368 18.5271 14.9116 18.5639C12.7996 18.6394 11.0793 17.0236 10.9935 14.8867C10.9498 12.8013 12.5536 11.0913 14.645 10.9935Z"
                fill="currentColor"
              />
            </svg>
            <span className="hidden md:block"> Dashboard</span>
          </Link>
        </Button>
      </li>
      <li>{/* <HeaderAddBtnComp /> */}</li>
      <li>{/* <HeaderMenuNotificationComp /> */}</li>
      {/* {pathname !== "/cart" ? (
        <li className="flex -mx-1">
          <CartMenu cartData={cartItems} removeProduct={removeItem} />
        </li>
      ) : null} */}
      <li className="-mx-1">{/* <HeaderServiceBtnComp /> */}</li>
      <li>
        {/* <ProfileManage
          authFn={useAuth2}
          AuthCompWrapper={AuthCompWrapper}
          ImageComponent={Image}
          LinkComponent={Link}
        /> */}
      </li>
    </ul>
  );
};

export default HeaderLoginColumnComp;
