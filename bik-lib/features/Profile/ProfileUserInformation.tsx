import { FC } from "react";
import { TAuthInfo } from "@/bik-lib/context/auth/authTypes";
import { LogoutIcon } from "./icons";
import UserAvatar from "../user-avatar/UserAvatar";

const ProfileUserInformation: FC<{
  auth: TAuthInfo;
  logout: () => void;
}> = ({ auth, logout }) => {
  const user = auth.currentUser;

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-[14px]">
        <div className="size-[70px] overflow-hidden">
          <UserAvatar authInfo={auth} />
        </div>

        <div className="flex flex-col">
          <div className="full-name text-primary text-xl font-medium">
            {user.name}
          </div>
          <div className="full-name text-primary-700 text-base font-normal">
            {user.email}
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={logout}
        className="size-10 p-2 bg-primary-100 sm:bg-transparent sm:hover:bg-primary-100 rounded-full transition-colors"
      >
        <LogoutIcon />
      </button>
    </div>
  );
};

export default ProfileUserInformation;
