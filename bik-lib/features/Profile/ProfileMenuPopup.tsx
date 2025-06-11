import { FC } from "react";
import { TAuthInfo } from "@/bik-lib/context/auth/authTypes";
import { CrossIcon } from "./icons";
import { getAccountUrl, getBikiranUrl } from "@/bik-lib/utils/Env";
import Link from "next/link";
import ProfileMenuList from "./ProfileMenuList";
import ProfileUserInformation from "./ProfileUserInformation";

type TProps = {
  show: boolean;
  authInfo: TAuthInfo;
  logout: () => void;
  closeClick: () => void;
};

type TTerm = {
  title: string;
  link: string;
};

const termsArr: TTerm[] = [
  {
    title: "Privacy Policy",
    link: `${getBikiranUrl()}/legal/privacy-policy/`,
  },
  {
    title: "Terms of Service",
    link: `${getBikiranUrl()}/legal/terms-of-service/`,
  },
];

const CloseBtn: FC<{ closeClick: () => void }> = ({ closeClick }) => {
  return (
    <button
      type="button"
      onClick={closeClick}
      className="absolute -top-12 -right-2 size-8 p-2 border rounded-full transition-colors block sm:hidden"
    >
      <CrossIcon />
    </button>
  );
};

const ProfileMenuPopup: FC<TProps> = ({
  show,
  authInfo,
  logout,
  closeClick,
}) => {
  if (!show) return null;
  return (
    <div className="w-full sm:w-100 h-full sm:h-[440px] fixed z-50 sm:absolute right-0 top-0 sm:top-[55px] sm:rounded-30 bg-[#F7F3F8] shadow-[0px_0px_30px_0px_rgba(19,15,64,0.20)]">
      <div className="size-full p-5">
        <div className="flex flex-col justify-center gap-5 mt-10 sm:mt-0 relative">
          <ProfileUserInformation auth={authInfo} logout={logout} />

          <div className="w-full flex justify-center items-center">
            <Link
              href={`${getAccountUrl()}/user/personal-info`}
              target="_blank"
              className="p-[7px_16px] border border-[#D780DC] rounded-10 text-[#AE00B9] text-center"
            >
              Manage Your Bikiran Account
            </Link>
          </div>

          <ProfileMenuList />

          {/* Close button for mobile device only */}
          <CloseBtn closeClick={closeClick} />
        </div>

        {/* Terms and Conditions links */}
        <div className="flex items-center justify-center text-xs text-primary mt-3">
          {termsArr?.map((item: TTerm, index: number) => (
            <div key={item.title}>
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:bg-primary-100 px-[6px] py-[2px] rounded-5 transition-all"
              >
                {item.title}
              </a>
              {index === 0 ? (
                <span className="text-primary mx-1">&#8226;</span>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileMenuPopup;
