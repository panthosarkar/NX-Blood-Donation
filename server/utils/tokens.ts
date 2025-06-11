import { getTimestamp } from "./time";
import { hash } from "crypto";

const randomString =
  "OLGY7yrCMN9UJzx9UJxvARV9wREwnbdwzOfD8MZOgAh6pNvoFTnLpeabNUt7MEnk";
const validity = 300; // 10 seconds

export const generateToken = (userId: number) => {
  const timestamp = getTimestamp();

  const tokenString = `${userId}-${timestamp}-${randomString}`;
  const token = hash("sha256", tokenString);

  return `${userId}:${timestamp}:${token}`;
};

export const validateToken = (token: string) => {
  const tokenParts = token.split(":");
  if (tokenParts.length !== 3) {
    return false;
  }

  const userId = parseInt(tokenParts[0]);
  const timestamp = parseInt(tokenParts[1]);
  const tokenString = tokenParts[2];

  if (getTimestamp() - timestamp > validity) {
    return false;
  }

  const tokenStringGen = hash(
    "sha256",
    `${userId}-${timestamp}-${randomString}`
  );

  return tokenString === tokenStringGen;
};

export const parseToken = (token: string) => {
  const tokenParts = token.split(":");
  if (tokenParts.length !== 3) {
    return null;
  }

  const userId = parseInt(tokenParts[0]);
  const timestamp = parseInt(tokenParts[1]);
  const tokenString = tokenParts[2];

  return { userId };
};
