import Link from "next/link";
import Image from "next/image";
import { SIZE_SM, useLayout } from "@/bik-lib/context/LayoutProvider";

const FindUsSocial = ({
  className,
  footerIcons,
  dark,
}: {
  className: string;
  footerIcons: any;
  dark?: boolean;
}) => {
  const links = [
    {
      title: "Facebook",
      url: "https://www.facebook.com/bikiran12",
      icon: footerIcons.iconFacebook,
    },
    {
      title: "YouTube",
      url: "https://www.youtube.com/@bikiranofficial",
      icon: footerIcons.iconYoutube,
    },
    {
      title: "LinkedIn",
      url: "https://www.linkedin.com/company/bikiran-com/about/",
      icon: footerIcons.iconLinkedin,
    },
    // {
    //   title: "X (Twitter)",
    //   url: "https://x.com/?lang=en",
    //   icon: footerIcons.iconTwitter,
    // },
    {
      title: "GitHub",
      url: "https://github.com/bikirandev",
      icon: footerIcons.iconGithub,
    },
  ];

  const { windowWidth } = useLayout();
  const isMobile = windowWidth < SIZE_SM;

  return (
    <>
      {dark && isMobile ? (
        <div className="flex gap-3.5 mt-7.5">
          {links.map((item) => (
            <div key={item.title}>
              <Link
                href={item.url}
                target="_blank"
                className="flex gap-2 sm:gap-3 items-center"
              >
                <span>
                  <Image
                    src={item.icon}
                    alt={item.title}
                    width={40}
                    height={40}
                  />
                </span>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className={`flex flex-col gap-2 md:gap-5 ${className}`}>
          <h3 className="text-base sm:text-xl text-p font-medium ">
            FIND US ON SOCIAL
          </h3>

          <ul className="flex gap-4 md:gap-5 flex-col text-primary-700 text-base font-normal mt-2 sm:mt-0">
            {links.map((item) => (
              <li key={item.title}>
                <Link
                  href={item.url}
                  target="_blank"
                  className="flex gap-2 sm:gap-3 items-center"
                >
                  <span className="sm:size-6.5 size-4">
                    <Image src={item.icon} alt={item.title} />
                  </span>
                  <span className="text-p-700 font-normal text-xs sm:text-base">
                    {item.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default FindUsSocial;
