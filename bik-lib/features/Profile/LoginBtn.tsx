"use client";
import { FC } from "react";
import { useRouter } from "next/navigation";
import { LoginFill } from "./icons";
import { SIZE_SM, useLayout } from "@/bik-lib/context/LayoutProvider";

const LoginBtn: FC<{
  loginUrl: string;
}> = ({ loginUrl = "" }) => {
  const { windowWidth } = useLayout();
  const router = useRouter();

  if (!windowWidth) return null;
  if (windowWidth && windowWidth < SIZE_SM) {
    return (
      <button
        type="button"
        className="block size-7"
        onClick={() => router.push(loginUrl)}
      >
        <LoginFill />
      </button>
    );
  }
  return (
    <button
      type="button"
      onClick={() => router.push(loginUrl)}
      className="bg-secondary-100 text-secondary rounded-lg leading-6 text-base font-normal p-2 w-24 hover:text-white hover:bg-secondary transition"
    >
      Login
    </button>
  );
};

export default LoginBtn;
