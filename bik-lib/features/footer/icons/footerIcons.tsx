import phoneLight from "./icon-contacts-phone-light.svg";
import phoneDark from "./icon-contacts-phone-dark.svg";

import mailLight from "./icon-contacts-mail-light.svg";
import mailDark from "./icon-contacts-mail-dark.svg";

import logoLight from "./icon-logo-light.svg";
import logoDark from "./icon-logo-dark.svg";

import linkArrowLight from "./icon-link-arrow-light.svg";
import linkArrowDark from "./icon-link-arrow-dark.svg";
import paymentGateway from "./icon-payment-gateway.svg";

// social icons
import iconFacebookLight from "./icon-facebook-light.svg";
import iconFacebookDark from "./icon-facebook-dark.svg";

import iconYoutubeLight from "./icon-youtube-light.svg";
import iconYoutubeDark from "./icon-youtube-dark.svg";

import iconLinkedinLight from "./icon-linkedin-light.svg";
import iconLinkedinDark from "./icon-linkedin-dark.svg";

import iconTwitterLight from "./icon-twitter-light.svg";
import iconTwitterDark from "./icon-twitter-dark.svg";

import iconGithubLight from "./icon-github-light.svg";
import iconGithubDark from "./icon-github-dark.svg";

type TFooterIcons = {
  [key: string]: string;
};

export const getFooterIcons = (dark: boolean): TFooterIcons => {
  if (dark) {
    return {
      phone: phoneLight,
      mail: mailLight,
      logo: logoLight,
      linkArrow: linkArrowLight,
      paymentGateway,
      //social
      iconFacebook: iconFacebookLight,
      iconYoutube: iconYoutubeLight,
      iconLinkedin: iconLinkedinLight,
      iconGithub: iconGithubLight,
      iconTwitter: iconTwitterLight,
    };
  } else {
    return {
      phone: phoneDark,
      mail: mailDark,
      logo: logoDark,
      linkArrow: linkArrowDark,
      paymentGateway,
      //social
      iconFacebook: iconFacebookDark,
      iconYoutube: iconYoutubeDark,
      iconLinkedin: iconLinkedinDark,
      iconGithub: iconGithubDark,
      iconTwitter: iconTwitterDark,
    };
  }
};
