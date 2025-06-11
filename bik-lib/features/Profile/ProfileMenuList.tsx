import React, { FC } from "react";
import Link from "next/link";
import {
  ActivityHistoryIcon,
  BillingInfoIcon,
  NotificationIcon,
  ContactSupportIcon,
} from "./icons";
import { getAccountUrl, getSupportUrl } from "@/bik-lib/utils/Env";

const billingSubmenu = [
  {
    title: "Invoice",
    link: "/user/billing/invoice",
  },
  {
    title: "Payments",
    link: "/user/billing/payment",
  },
  {
    title: "Subscription",
    link: "/user/subscriptions",
  },
];

type TMenu = {
  path?: string;
  fullPath?: string;
  target?: string;
  icon: React.ReactNode;
  title: string;
  notifCount?: number;
  className: string;
};

const OptionBilling: FC = () => {
  return (
    <div className="flex items-center gap-2.5 px-[15px] py-[11px] bg-white">
      <div className="size-7">
        <BillingInfoIcon />
      </div>
      <div className="">
        <div className="text-primary-900 font-normal text-base">
          Billings Information
        </div>
        <div className="flex items-center gap-2 ML">
          {billingSubmenu.map(({ title, link }, index) => {
            return (
              <Link
                key={title}
                href={`${getAccountUrl()}${link}`}
                target="_blank"
                className="text-primary-700 hover:text-secondary-700 font-normal text-[13px] transition-all relative"
              >
                {index !== 0 && <span>&bull; &nbsp;</span>}
                {title}

                {/* Notification Bullet point */}
                {/* <span className="size-1.5 bg-warning rounded-full absolute top-[2px] -right-1 " /> */}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const Option: React.FC<TMenu> = ({
  path,
  fullPath,
  icon,
  title,
  notifCount,
  className,
}) => {
  const href = fullPath !== undefined ? fullPath : `${getAccountUrl()}/${path}`;

  return (
    <Link
      href={href}
      target="_blank"
      className={`group flex items-center gap-2.5 px-[15px] py-[11px] bg-white relative ${className}`}
    >
      <span className="size-7">{icon}</span>
      <span className="text-primary-900 font-normal text-base">{title}</span>

      {notifCount !== undefined && (
        <div className="size-6.5 rounded-full flex justify-center items-center bg-[#FF3B30] absolute right-2.5 top-1/2 transform -translate-y-1/2">
          <span className="text-white text-sm font-medium">15</span>
        </div>
      )}
    </Link>
  );
};

const ProfileMenuList: FC = () => {
  return (
    <div className="menu-section flex flex-col gap-0.5">
      <Option
        path="user/activities"
        icon={<ActivityHistoryIcon />}
        title="Activity History"
        className="rounded-[12px_12px_3px_3px]"
      />
      <Option
        path="user/notifications"
        icon={<NotificationIcon />}
        title="Notifications"
        className="rounded-[3px]"
      />

      <OptionBilling />

      <Option
        fullPath={getSupportUrl()}
        icon={<ContactSupportIcon />}
        title="Contact Support"
        className="rounded-[0px_0px_12px_12px]"
      />
    </div>
  );
};

export default ProfileMenuList;
