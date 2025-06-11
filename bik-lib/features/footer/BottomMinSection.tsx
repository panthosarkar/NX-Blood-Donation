import Image from "next/image";
import Link from "next/link";

const BottomMiniSection = ({
  footerIcons,
  dark,
}: {
  footerIcons: any;
  dark?: boolean;
}) => {
  return (
    <div
      className={`flex flex-col lg:flex-row justify-center md:justify-between items-center border-t ${
        dark ? "border-[#958CFF] " : "border-[rgb(19,15,64,0.2)]"
      } text-primary-700 w-full`}
      style={{
        borderTopColor: dark ? "rgba(149, 140, 255, 0.4)" : "",
      }}
      
    >
      <div className="text-sm leading-10 md:leading-[70px] flex justify-center lg:justify-start items-center lg:w-1/2">
        &copy; {new Date().getFullYear()} All Rights Reserved by&nbsp;
        <Link
          href="https://bikiran.com"
          target="_blank"
          className="text-[rgba(174,0,185)] flex items-center gap-1"
        >
          <span>Bikiran.com</span>
          <div className="size-3 inline-block text-primary">
            <Image
              src={footerIcons.linkArrow}
              alt="arrow"
              width={0}
              height={0}
              className="w-full h-auto"
            />
          </div>
        </Link>
      </div>
      <div className="w-full box-border lg:w-1/2">
        <div className="flex flex-row justify-end items-end">
          <Image
            src={footerIcons.paymentGateway}
            alt="Payment Gateway"
            width={0}
            height={0}
            className="size-full -mt-2"
            style={{ maxWidth: "-webkit-fill-available" }}
          />
        </div>
      </div>
    </div>
  );
};

export default BottomMiniSection;
