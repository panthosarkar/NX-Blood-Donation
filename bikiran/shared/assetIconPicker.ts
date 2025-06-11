import { icons } from "@/bikiran/lib/icons";

const assetIconPicker = (assetName: string) => {
  switch (assetName) {
    case "domain":
      return icons.iconDomainFill;
    case "hosting":
      return icons.iconHostingFill;
    case "appocean":
      return icons.iconAction;
    case "edusoft":
      return icons.iconAction;
    case "syncsolution":
      return icons.iconAction;
    default:
      return icons.iconAction;
  }
};

export default assetIconPicker;
