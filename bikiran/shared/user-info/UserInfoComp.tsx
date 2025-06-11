import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/bikiran/components/ui/avatar";
import Image from "next/image";
import { FC } from "react";

const UserInfoComp: FC<{
  photoUrl: string;
  name: string;
  email: string;
}> = ({ photoUrl, name, email }) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-[14px]">
        <div className="size-10 overflow-hidden">
          <Image
            src={photoUrl}
            alt="user"
            width={0}
            height={0}
            sizes="100vh"
            className="rounded-full size-10"
          />
        </div>

        <div className="flex flex-col">
          <div className="full-name text-primary text-sm 2xl:text-base font-medium">
            {name}
          </div>
          <div className="full-name text-primary-700 text-[13px] 2xl:text-sm leading-[19px] font-normal">
            {email}
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserInfoComp;
