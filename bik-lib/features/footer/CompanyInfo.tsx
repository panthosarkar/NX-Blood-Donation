import Link from "next/link";
import { getBikiranUrl } from "@/bik-lib/utils/Env";

const links = [
  {
    url: `${getBikiranUrl()}/about`,
    text: "About Us",
  },
  {
    url: `${getBikiranUrl()}/services`,
    text: "Service",
  },
  {
    url: `${getBikiranUrl()}/contact`,
    text: "Contact Us",
  },
];

const CompanyInfo = ({ className }: { className: string }) => {
  return (
    <div className={`flex flex-col gap-3 sm:gap-5 ${className}`}>
      <div className="text-base sm:text-xl text-p font-medium mt-3 sm:mt-0">
        COMPANY
      </div>
      <ul className="flex gap-3 sm:gap-5 flex-col text-primary-700 ">
        {links.map((link) => (
          <li key={link.url}>
            <Link href={link.url} className="flex items-center gap-1">
              <span className="text-p-700 font-medium text-xs sm:text-base">
                {link.text}
              </span>
              {/* <span className="size-4 inline-block text-primary">
              <LinkArrow />
            </span> */}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CompanyInfo;
