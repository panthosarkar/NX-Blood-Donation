import { FC } from "react";
import { cn } from "@/bik-lib/utils/cn";
import BottomMiniSection from "./BottomMinSection";
import AddressInfo from "./AddressInfo";
import ContactSec from "./ContactSec";
import "./footerStyle.css";
import { getFooterIcons } from "./icons/footerIcons";

type TFooterProps = {
  bordered?: boolean;
  dark?: boolean;
  className?: string;
};

const FooterSection: FC<TFooterProps> = ({
  bordered = false,
  dark = false,
  className,
}) => {
  const footerIcons = getFooterIcons(dark);

  return (
    <footer
      className={cn(
        " pt-2 sm:pt-6 lg:pt-12", // Default classes
        { "border-t border-primary-300": bordered }, // Conditional classes
        className
      )}
    >
      <div
        className={`container md:pb-0 footer-section-container ${
          dark ? "dark" : "light"
        }`}
      >
        <div className="contact-body w-full flex flex-col">
          <div className="flex flex-col gap-2 sm:gap-3 md:gap-6 xl:gap-0 xl:flex-row mb-3 md:mb-6 lg:mb-12">
            <AddressInfo
              className="address-info w-full xl:w-5/12"
              footerIcons={footerIcons}
              dark={dark}
            />
            <ContactSec
              className="contact-sec w-full xl:w-7/12"
              footerIcons={footerIcons}
              dark={dark}
            />
          </div>
          <BottomMiniSection footerIcons={footerIcons} dark={true} />
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
