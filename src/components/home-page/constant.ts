import { icons } from "@/library/icons";

export const servicesList = [
  {
    id: 1,
    title: "Smart Matching System",
    description:
      "Our system automatically connects patients with suitable donors based on blood type, location, and eligibility",
    icon: icons.imgBloodMatching,
  },
  {
    id: 2,
    title: "Emergency Blood",
    description:
      "Our system immediately alerts nearby eligible donors to respond quickly.",
    icon: icons.imgEmergencyBlood,
  },
  {
    id: 3,
    title: "Blood Donor ",
    description:
      "Provide your basic details and be ready to help someone in need when it matters most.",
    icon: icons.imgBloodDonor,
  },
  {
    id: 4,
    title: "Ambulance Service",
    description:
      "Our system immediately alerts nearby eligible donors to respond quickly.",
    icon: icons.imgAmbulance,
  },
];

//contact info

export const contactInfo = [
  {
    icon: icons.iconSolidEmail,
    title: "Email",
    value: "info@bloodDonor.com",
  },
  {
    icon: icons.iconSolidPhone,
    title: "Phone",
    value: "+880 1613 727 212",
  },
  {
    icon: icons.iconSolidLocation,
    title: "Location",
    value: "Dhaka, Bangladesh",
  },
];

// footer links
export const linkInfo = [
  {
    title: "Information Links",
    links: [
      { name: "Home", url: "#", icon: "" },
      { name: "About Us", url: "#", icon: "" },
      { name: "Contact", url: "#", icon: "" },
    ],
  },
  {
    title: "Important Links",
    links: [
      { name: "Request Blood", url: "#", icon: "" },
      { name: "Donate Blood", url: "#", icon: "" },
      { name: "Find Donors", url: "#", icon: "" },
    ],
  },
  {
    title: "Social Links",
    links: [
      { name: "Facebook", url: "#", icon: icons.iconSolidFacebook },
      { name: "Twitter", url: "#", icon: icons.iconSolidTwitter },
      { name: "Instagram", url: "#", icon: icons.iconSolidInstagram },
    ],
  },
];
