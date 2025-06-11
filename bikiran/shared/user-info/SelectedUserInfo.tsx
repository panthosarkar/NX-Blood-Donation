import { icons } from "@/bikiran/lib/icons";
import Image from "next/image";
import React, { FC } from "react";
import { TUser } from "../user-search/UserSearchType";
import { TState } from "@/bik-lib/types/event";

const SelectedUserInfo: FC<{
  selectedUser: TUser;
  setSelectedUser: TState<TUser>;
}> = ({ selectedUser, setSelectedUser }) => {
  return (
    <div className="grid grid-cols-[150px_auto] items-center gap-4">
      <label htmlFor="" className="text-base text-primary font-medium">
        User
      </label>
      <div className="flex justify-between items-center mt-1 border border-primary-100 rounded-8 h-[35px] px-[10px]">
        <div className="flex gap-2 item-center">
          <Image
            src={selectedUser.photoUrl}
            width={0}
            height={0}
            alt="User Image"
            sizes="100vw"
            className="rounded-full size-6"
          />
          <div className="">
            <span className="text-sm ">{selectedUser.displayName}, </span>
            <span className="text-xs text-primary-700">
              {selectedUser.email}
            </span>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <button
            onClick={() => setSelectedUser({} as TUser)}
            className="text-primary-500"
          >
            <Image
              src={icons.iconCloseFill}
              width={100}
              height={100}
              sizes="100vw"
              alt="Close Icon"
              className="rounded-full size-5"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectedUserInfo;
