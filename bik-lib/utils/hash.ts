import { createHash } from "crypto";

export const md5 = (input: string): string => {
  return createHash("md5").update(input).digest("hex");
};
