export function convertToYears(quantity: number, unit?: string): string {
  // Default to "months" if no unit provided
  const normalizedUnit = unit?.toLowerCase() || "months";

  // Calculate years based on unit
  let years: number;
  switch (normalizedUnit) {
    case "day":
    case "days":
      years = quantity / 365;
      // If less than a year, return the original quantity with unit
      if (years < 1) return `${quantity} D`;
      break;
    case "week":
    case "weeks":
      years = quantity / 52;
      // If less than a year, return the original quantity with unit
      if (years < 1) return `${quantity} W`;
      break;
    case "month":
    case "months":
      years = quantity / 12;
      // If less than a year, return the original quantity with unit
      if (years < 1) return `${quantity} M`;
      break;
    case "year":
    case "years":
      years = quantity;
      break;
    default:
      years = quantity / 12; // Default to months if unknown unit
      // If less than a year, return the original quantity with unit
      if (years < 1) return `${quantity} M`;
  }

  // Format the result with up to 2 decimal places, removing trailing zeros
  const formattedYears =
    years % 1 === 0 ? years.toString() : years.toFixed(2).replace(/\.?0+$/, "");

  // Return the formatted result
  return `${formattedYears}y`;
}
