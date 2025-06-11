import iconUser from "./add-button-icons/user.svg";
import iconDomain from "./add-button-icons/domain.svg";
import iconHosting from "./add-button-icons/hosting.svg";
import iconPricing from "./add-button-icons/pricing.svg";
import iconInvoice from "./add-button-icons/invoice.svg";
import iconAppOcean from "./add-button-icons/app-ocean.svg";
import iconPremium from "./add-button-icons/premium.svg";
import iconCredit from "./add-button-icons/credit-note.svg";
import iconDebit from "./add-button-icons/debit-note.svg";

import iconUserHover from "./add-button-icons/user-hover.svg";
import iconDomainHover from "./add-button-icons/domain-hover.svg";
import iconHostingHover from "./add-button-icons/hosting-hover.svg";
import iconPricingHover from "./add-button-icons/pricing-hover.svg";
import iconInvoiceHover from "./add-button-icons/invoice-hover.svg";
import iconAppOceanHover from "./add-button-icons/app-ocean-hover.svg";
import iconPremiumHover from "./add-button-icons/premium-hover.svg";
import iconCreditHover from "./add-button-icons/credit-hover.svg";
import iconDebitHover from "./add-button-icons/debit-hover.svg";

type TBtn = {
  id: number;
  icon: string;
  iconFill: string;
  title: string;
  tag?: string;
  onClick: () => void;
}[];

export const btn: TBtn = [
  {
    id: 1,
    icon: iconUser,
    iconFill: iconUserHover,
    title: "Add New User",
    onClick: () => window.open(`/user/list#create-user`, "_blank"),
  },
  {
    id: 2,
    icon: iconAppOcean,
    iconFill: iconAppOceanHover,
    title: "Create AppOcean app",
    onClick: () => window.open(`/appocean/apps#create-app`, "_blank"),
  },
  {
    id: 3,
    icon: iconDomain,
    iconFill: iconDomainHover,
    title: "Add Domain",
    onClick: () => window.open(`/domain/list#domain-add`, "_blank"),
  },
  {
    id: 4,
    icon: iconHosting,
    iconFill: iconHostingHover,
    title: "Add Hosting",
    onClick: () => window.open(`/hosting/list#create-hosting`, "_blank"),
  },
  {
    id: 5,
    icon: iconPremium,
    iconFill: iconPremiumHover,
    title: "Add Premium Subscription",
    onClick: () => window.open(`/premium#add-premium`, "_blank"),
  },
  {
    id: 6,
    icon: iconInvoice,
    iconFill: iconInvoiceHover,
    title: "Add Invoice",
    onClick: () => window.open(`/billing/invoice#create-invoice`, "_blank"),
  },
  {
    id: 7,
    icon: iconCredit,
    iconFill: iconCreditHover,
    title: "Add Credit/Debit Note",
    onClick: () =>
      window.open(
        `/billing/account?status=active&type=Customer#add-credit-debit-note`,
        "_blank"
      ),
  },
  // {
  //   id: 8,
  //   icon: iconDebit,
  //   iconFill: iconDebitHover,
  //   title: "Add a Debit Note",
  //   onClick: () => window.open(`/billing/account#add-debit-note`, "_blank"),
  // },
  //   {
  //     id: 9,
  //     icon: iconPricing,
  //     iconFill: iconPricingHover,
  //     title: "Add Pricing",
  //     onClick: () => {},
  //   },
];
