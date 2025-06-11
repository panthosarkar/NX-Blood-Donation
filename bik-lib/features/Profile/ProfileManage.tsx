"use client";
import { useState, useRef, useEffect, FC } from "react";
import { TAuthInfo } from "@/bik-lib/context/auth/authTypes";
import ProfileView from "./ProfileView";
import ProfileMenuPopup from "./ProfileMenuPopup";

const ProfileManage: FC<{
  auth: TAuthInfo;
  loginUrl: string;
  logout: () => void;
}> = ({ auth, logout, loginUrl }) => {
  const bodyRef = useRef<HTMLDivElement | null>(null);

  const [showMenu, setShowMenu] = useState<boolean>(false);

  const handleLogout = () => {
    // -- handler for logout
    logout();
    // -- close the popup
    setShowMenu(false);
  };

  useEffect(() => {
    // bodyRef outside focus or click or scroll then close the profile info
    const handleClickOutside = (event: any) => {
      if (bodyRef.current && !bodyRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="profile-manage relative z-50" ref={bodyRef}>
      <div className="flex items-center gap-2">
        <ProfileView
          auth={auth}
          onClick={() => setShowMenu((prev) => !prev)}
          loginUrl={loginUrl}
        />
      </div>

      <ProfileMenuPopup
        show={showMenu}
        authInfo={auth}
        logout={handleLogout}
        closeClick={() => setShowMenu((prev) => !prev)}
      />
    </div>
  );
};

export default ProfileManage;
