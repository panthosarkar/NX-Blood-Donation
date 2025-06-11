"use client";

import { FC, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { TCartMenuData } from "./cartMenuTypes";
import { useCart } from "@/bik-lib/context/cart/CartProvider";
import CartCollectionSharePopup from "./CartCollectionSharePopup";
import CartPopup from "./CartPopup";
import Image from "next/image";
import { TCartData } from "@/bik-lib/context/cart/cartDataType";

type TProps = {
  cartData: TCartMenuData[];
  removeProduct: (productId: number) => void;
};

const CartMenuIcon: FC<{
  data: TCartData[];
  showCart: () => void;
}> = ({ data, showCart }) => {
  return (
    <button
      type="button"
      className="w-auto flex items-center"
      onClick={showCart}
    >
      <div className="size-full relative">
        <Image
          src="https://files.bikiran.com/assets/images/icon/icon-cart.svg"
          alt="cart"
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-auto"
        />
        {data?.length > 0 ? (
          <span className="absolute -top-2.5 sm:-top-[9px] -right-2.5 sm:-right-[9px] size-[18px] sm:size-5 flex justify-center items-center border-[3px] border-[#fdfdfd] bg-secondary text-white text-[9px] rounded-full">
            {data?.length}
          </span>
        ) : null}
      </div>
    </button>
  );
};

const CartMenu: FC<TProps> = ({ cartData, removeProduct }) => {
  const [show, setShow] = useState(false);
  const [action, setAction] = useState({
    fav: false,
    share: false,
  });
  const { cartItems } = useCart();
  const pathname = usePathname();

  const ref = useRef<HTMLDivElement>(null);

  // const handleClickOutside = (event: MouseEvent) => {
  //   // Check if the clicked target is outside the referenced element
  //   if (ref.current && !ref.current.contains(event.target as Node)) {
  //     setShow(false);
  //   }
  // };

  // useEffect(() => {
  //   // Bind the event listener
  //   document.addEventListener("mousedown", handleClickOutside);

  //   return () => {
  //     // Unbind the event listener on cleanup
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);

  if (pathname === "/cart") return null;
  return (
    <div className="relative">
      <CartMenuIcon showCart={() => setShow(true)} data={cartItems} />
      {show ? (
        <CartPopup
          elementRef={ref}
          cartData={cartData}
          removeProduct={removeProduct}
          setAction={setAction}
          action={action}
          closeClick={() => setShow(false)}
        />
      ) : null}

      {action.share ? (
        <CartCollectionSharePopup
          closeClick={() =>
            setAction((prev) => ({ ...prev, share: !prev.share }))
          }
        />
      ) : null}
    </div>
  );
};

export default CartMenu;
