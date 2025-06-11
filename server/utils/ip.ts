import { NextRequest } from "next/server";

export const ipToLong = (clientIp: string): number => {
  return (
    clientIp.split(".").reduce((acc: number, octet: string) => {
      return (acc << 8) + parseInt(octet, 10);
    }, 0) >>> 0
  );
};

export const longToIp = (long: number): string => {
  const bigIntLong = BigInt(long);
  return [
    (bigIntLong >> BigInt(24)) & BigInt(255),
    (bigIntLong >> BigInt(16)) & BigInt(255),
    (bigIntLong >> BigInt(8)) & BigInt(255),
    bigIntLong & BigInt(255),
  ].join(".");
};

export const reqToLong = (req: NextRequest): number => {
  const clientIpOfCloudFlare = req.headers.get("cf-connecting-ip") || ""; // cf-connecting-ip

  const clientIp =
    clientIpOfCloudFlare || req.headers.get("x-forwarded-for") || "";

  if (!clientIp) return 0;

  return ipToLong(clientIp);
};

export const reqToIpStr = (req: NextRequest): string => {
  const clientIpOfCloudFlare = req.headers.get("cf-connecting-ip") || ""; // cf-connecting-ip

  const clientIp =
    clientIpOfCloudFlare || req.headers.get("x-forwarded-for") || "";

  if (!clientIp) return "";

  return clientIp;
};
