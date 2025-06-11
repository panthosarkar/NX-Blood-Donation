import { useApp } from "@/bik-lib/context/AppProvider";
import { CurrencySelector } from "@src/utils";
import Image from "next/image";
import Link from "next/link";

const ContactCard = ({
  icon,
  alt,
  type,
  text,
}: {
  icon: string;
  alt: string;
  type: string;
  text: string;
}) => {
  const isEmail = type === "email";
  return (
    <a
      href={isEmail ? `mailto:${text}` : `tel:${text}`}
      className="flex items-center gap-1.5 lg:gap-2.5"
    >
      <div className="sm:size-7.5 size-4 inline-block min-w-max">
        <Image
          src={icon}
          alt={alt}
          width={100}
          height={100}
          className="size-full"
        />
      </div>
      <span className="text-p-700 text-xs sm:text-base font-normal sm:font-medium">
        {text}
      </span>
    </a>
  );
};

const AddressInfo = ({
  className,
  footerIcons,
  dark,
}: {
  className: string;
  footerIcons: any;
  dark?: boolean;
}) => {
  return (
    <div
      className={`flex flex-col sm:flex-row xl:flex-col gap-2 md:gap-3 lg:gap-4 ${className}`}
    >
      <div className="flex flex-col gap-4">
        <div className="flex gap-9">
          <Link href="/" className={"logo w-40 h-12"}>
            <Image
              src={footerIcons.logo}
              alt="src"
              width={100}
              height={100}
              className="w-full h-auto"
            />
          </Link>

          <div className="w-13">
            <CurrencySelector useApp={useApp} />
          </div>
        </div>

        <div className="address-sec w-full sm:w-9/12 flex flex-col gap-3">
          <div className="address_1 md:font-normal sm:text-base text-xs leading-6">
            <span className="text-p font-medium">Dhaka:</span>&nbsp;
            <span className="text-p-light">
              House-02, Block-F, Shangbadik Abashik Elaka, Kalshi Road,
              Mirpur-11, Dhaka-1216, Bangladesh
            </span>
          </div>
          <div className="address_1 md:font-normal sm:text-base text-xs  leading-6">
            <span className="text-p font-medium">Khulna:</span>&nbsp;
            <span className="text-p-light">
              Office No. 401, IT Incubation & Training Center KUET, Khulna 9203
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2.5  xl:w-full mt-[8px] sm:mt-[23px]">
        <div className="flex flex-row gap-2 w-full">
          <ContactCard
            icon={footerIcons.phone}
            alt="phone"
            type="phone"
            text="+880 1925 363333 - +880 1313 563366"
          />
        </div>
        <div className="flex flex-row gap-2">
          <ContactCard
            icon={footerIcons.mail}
            alt="email"
            type="email"
            text="info@src.com - support@src.com"
          />
        </div>
      </div>
    </div>
  );
};

export default AddressInfo;
