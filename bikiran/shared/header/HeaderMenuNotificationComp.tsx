import Image from "next/image";
import { headerIcons } from "./icons/icons";

function HeaderMenuNotificationComp() {
  return (
    <div className="header_notification_button">
      <div
        role="button"
        tabIndex={-1}
        // onClick={() => setOpenModal(true)}
        className="size-full"
      >
        <Image
          src={headerIcons.iconBellFill}
          alt="bellIcon"
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-auto"
        />
      </div>
    </div>
  );
}

export default HeaderMenuNotificationComp;
