import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cName(...inputs) {
  return twMerge(clsx(inputs));
}
