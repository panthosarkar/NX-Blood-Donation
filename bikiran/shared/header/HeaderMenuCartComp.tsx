"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { headerIcons } from "./icons/icons";
import { FC } from "react";
import { TCartData } from "@/bik-lib/context/cart/cartDataType";

const HeaderMenuCartComp: FC<{ cartData: TCartData[] }> = ({ cartData }) => {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.push("/cart/")}
      className="header_cart_button"
    >
      <div className="size-full relative">
        <Image
          src={headerIcons.iconCart}
          alt="cart"
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-auto"
        />
        {cartData?.length > 0 ? (
          <span className="cart_counter">{cartData?.length}</span>
        ) : null}
      </div>
    </button>
  );
};

export default HeaderMenuCartComp;
