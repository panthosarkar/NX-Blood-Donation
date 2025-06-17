import Cookie from "./Cookie";
// import { getBaseDomain } from "./Env";

// export const showCurrencySign = (currency?: string) => {
//   const localeData =
//     typeof window !== "undefined"
//       ? new Cookie("locale", getBaseDomain()).getCookie()
//       : null;
//   const value = currency?.toLowerCase();
//   const localeCurrency = localeData ? JSON.parse(localeData).currency : "";

//   if (currency !== undefined && currency?.length > 0) {
//     return value === "usd" ? "$" : value === "bdt" ? "৳" : "₹";
//   }
//   return localeCurrency?.toLowerCase() === "usd"
//     ? "$"
//     : localeCurrency?.toLowerCase() === "bdt"
//       ? "৳"
//       : "₹";
// };

export const showInt = (value: number, fixedCount: number = 2) => {
  // Handle string input if needed
  if (typeof value === "string") {
    value = parseFloat(value || "0");
  }

  let formattedInt = value.toFixed(fixedCount);
  const [integerPart, decimalPart] = formattedInt.split(".");
  const formattedInteger = formatNumber(integerPart);
  formattedInt = decimalPart
    ? `${formattedInteger}.${decimalPart}`
    : formattedInteger;

  return formattedInt;
};

function formatNumber(numStr: string): string {
  const num = parseFloat(numStr);
  if (isNaN(num)) return numStr; // handle invalid numbers

  // Use international formatting (3-digit grouping)
  return new Intl.NumberFormat("en-US").format(num);

  // Or alternatively, without Intl.NumberFormat:
  // const parts = numStr.split('.');
  // parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  // return parts.join('.');
}
