import React from "react";
import UserAvatar from "../user-avatar/UserAvatar";
import { TAuthInfo } from "@/bik-lib/context/auth/authTypes";
import AuthCompWrapper from "@/bik-lib/context/auth/AuthCompWrapper";
import LoginBtn from "./LoginBtn";
import { LoadingRoundDottedIcon } from "./icons";
import Link from "next/link";

type TProfileView = {
  auth: TAuthInfo;
  loginUrl: string;
  onClick: () => void;
};

const ProfileView: React.FC<TProfileView> = ({ auth, onClick, loginUrl }) => {
  return (
    <div className="profile_view w-auto lg:w-full h-8 sm:h-10 flex items-center">
      <AuthCompWrapper auth={auth}>
        <Link
          href="#"
          type="button"
          className="size-8 sm:size-10 rounded-full border border-[#AE00B9] relative"
          onClick={onClick}
        >
          <UserAvatar authInfo={auth} />

          {/* Notification Bullet point */}
          {/* <span className="size-2 bg-warning rounded-full absolute top-0 right-0 " /> */}
        </Link>
        <LoginBtn loginUrl={loginUrl} />
        <Link href="#" type="button" className="size-10">
          <LoadingRoundDottedIcon />
        </Link>
      </AuthCompWrapper>
    </div>
  );
};

export default ProfileView;
