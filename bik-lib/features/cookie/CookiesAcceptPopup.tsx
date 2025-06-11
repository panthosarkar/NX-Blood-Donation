"use client";
import { useEffect, useState } from "react";
import { getBaseDomain, getBikiranUrl } from "@/bik-lib/utils/Env";
import Cookie from "@/bik-lib/utils/Cookie";

const CookiesAcceptPopup = () => {
  // State to control the popup visibility
  const [mode, setMode] = useState<boolean>(false);

  // State to check if the user has already accepted the cookie policy
  const [isAccept, setIsAccept] = useState<boolean>(
    new Cookie("accept-tc", getBaseDomain()).verifyCookie("yes")
  );

  // Handle mode change when the user accepts cookies
  useEffect(() => {
    if (mode) {
      // Set Data to cookies to parent domain
      const cookie = new Cookie("accept-tc", getBaseDomain());
      cookie.setCookie("yes", 365);
      setIsAccept(true);
    }
  }, [mode]);

  // Return null if cookies have already been accepted
  if (isAccept) {
    return null;
  }

  return (
    <div className="fixed bottom-7 z-[9999999] sm:bottom-16 left-5 w-[320px] sm:w-[405px] bg-white shadow-[0px_3px_50px_0px_rgba(19,15,64,0.08)] rounded-15 p-5 sm:px-5 sm:py-[25px]">
      <p className="text-primary-700 text-sm sm:text-base font-normal leading-[25px] mb-4 sm:mb-[18px]">
        This site uses cookies. By continuing to use this website, you agree to
        their use. For details, please check our{" "}
        <a
          href={getBikiranUrl() + "/legal/privacy-policy"}
          target="_blank"
          className="text-secondary"
        >
          Privacy Policy
        </a>
        .
      </p>

      <button
        type="button"
        className="h-10 bg-secondary text-white text-sm sm:text-base font-medium px-4 sm:px-5 rounded-[8px]"
        onClick={() => setMode(true)}
      >
        I Accept
      </button>
    </div>
  );
};

export default CookiesAcceptPopup;
