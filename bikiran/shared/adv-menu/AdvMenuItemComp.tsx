import { FC } from "react";
import { TLink } from "./AdvMenuTypes";
import { useAdvMenu } from "./AdvMenuProvider";
import Link from "next/link";
import { cn } from "@/bik-lib/utils/cn";
import Image from "next/image";
import ButtonWrapper from "@/bik-lib/features/button-wrapper/ButtonWrapper";

const AdvMenuItemComp: FC<{
  menu: TLink;
  closePopup: () => void;
}> = ({ menu, closePopup }) => {
  const { activeMenu } = useAdvMenu();
  return (
    <div className="h-auto">
      <div className="mb-[15px] text-xl font-medium ">{menu.title}</div>
      <div className="flex flex-col gap-2 text-secondary-700">
        {menu.subMenu?.map(({ id, title, iconL, iconF, active }) => {
          const isActive = activeMenu.subMenu.find((i) => i.id === id)?.active;
          return (
            <Link
              key={id}
              href={id}
              className={cn("  text-primary-700 hover:text-primary", {
                "text-secondary ": isActive,
              })}
              onClick={closePopup}
            >
              <div className="flex items-center gap-4">
                {isActive ? (
                  <div className=" flex items-center gap-4">
                    <Image
                      src={iconF}
                      alt="title"
                      width={0}
                      height={0}
                      sizes="100vh"
                      className="size-5"
                    />
                    <span> {title}</span>
                  </div>
                ) : (
                  <ButtonWrapper className=" items-center w-full">
                    <Image
                      src={iconL}
                      alt="title"
                      width={0}
                      height={0}
                      sizes="100vh"
                      className="size-5 "
                    />
                    <Image
                      src={iconF}
                      alt="title"
                      width={0}
                      height={0}
                      sizes="100vh"
                      className=" size-5"
                    />
                    <span className=" pl-9 text-nowrap"> {title}</span>
                  </ButtonWrapper>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
export default AdvMenuItemComp;
