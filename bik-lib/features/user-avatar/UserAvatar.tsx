/* eslint-disable no-unused-vars */
import Image from "next/image";
import { icons } from "@/bikiran/lib/icons";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/bikiran/components/ui/avatar";
import { cn } from "@/bik-lib/utils/cn";
import React from "react";
import { TInputChangeEvent } from "@/bik-lib/types/event";

type TUserAvatar = {
  authInfo: any;
  editable?: boolean;
  className?: string;
  selectPhoto?: () => void;
};

const UserAvatar: React.FC<TUserAvatar> = ({
  authInfo,
  editable = false,
  selectPhoto,
  className,
}) => {
  const { name, photoUrl } = authInfo.currentUser;
  return (
    <Avatar className={cn("relative !size-full mb-3 group", className)}>
      <AvatarImage src={photoUrl} />
      <AvatarFallback className="uppercase bg-secondary-300">
        {name ? name?.charAt(0) + name?.charAt(1) : "CN"}
      </AvatarFallback>

      {editable ? (
        <button
          type="button"
          className="absolute bottom-1 left-1/2 transform -translate-x-1/2 z-50"
          onClick={selectPhoto}
        >
          <Image
            src={icons.iconCameraFill}
            alt="camera"
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-auto size-6 opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
          />
        </button>
      ) : null}

      {/* {editable ? (
        <form
          encType="multipart/form-data"
          className="absolute bottom-1 left-1/2 transform -translate-x-1/2 z-50"
        >
          <label className="inline-block cursor-pointer">
            <Image
              src={icons.iconCameraFill}
              alt="camera"
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-auto size-6 opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
            />
            <input
              type="file"
              onChange={selectPhoto}
              hidden
              accept="image/png, image/jpeg, image/jpg"
            />
          </label>
        </form>
      ) : null} */}
    </Avatar>
  );
};

export default UserAvatar;
