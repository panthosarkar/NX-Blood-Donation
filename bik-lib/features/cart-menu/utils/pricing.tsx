import { useApp } from "@/bik-lib/context/AppProvider";

type TProductData = {
  type: string;
  price: any;
  durations: Durations[];
  minDuration: number;
};

type Durations = {
  duration: number;
  offer_percent: number;
  save: number;
};
export const showOfferPrice = (productData: TProductData, duration: number) => {
  const price =
    (productData.type === "domain_registration"
      ? productData?.price?.registration
      : productData.price) * duration;
  const durationFloat = parseInt(duration.toString(), 10);

  // --Implement Duration Offer
  const offerPercent =
    productData.durations.find((item) => item.duration === durationFloat)
      ?.offer_percent || 0;

  return (price * (100 - offerPercent)) / 100;
}

export function ShowCurrencySign() {
  const { locale } = useApp();

  if (locale?.currency === "USD") {
    return "$";
  }
  if (locale?.currency === "BDT") {
    return "৳";
  }
  return "";
}

export function CurrencyFormatter(value: any) {
  return value?.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}
