"use client";
import { assetKeys } from "@/bik-lib/lib/assets";
import CartProductDomain from "./CartProductDomain";
import CartProductHosting from "./CartProductHosting";
import { TCartMenuData } from "./cartMenuTypes";
import { FC } from "react";

type TProps = {
  data: TCartMenuData;
  removeProduct: (productId: number) => void;
};

const CartProductSection: FC<TProps> = ({ data, removeProduct }) => {
  if (data?.type === assetKeys.hosting) {
    return <CartProductHosting data={data} removeProduct={removeProduct} />;
  }
  return <CartProductDomain data={data} removeProduct={removeProduct} />;
};

export default CartProductSection;
