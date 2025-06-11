import React, { useState } from "react";
import { cartIcons } from "./icons/cartIcons";
import Image from "next/image";

const Copy = () => {
  const [isCopied, setIsCopied] = useState(false);

  const copy = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        // setMessage("Copied");
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 1000);
      })
      .catch((err: Error) => {
        console.error(err);
      });
  };

  return { copy, isCopied };
};

type TProps = {
  closeClick: () => void;
};

const CartCollectionSharePopup: React.FC<TProps> = ({ closeClick }) => {
  const { copy, isCopied } = Copy();
  return (
    <div className="size-full fixed top-0 left-0 bg-[#292929d4] z-[2000]">
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] overflow-hidden flex flex-col rounded-xl bg-white">
        <div className="border-b px-4 py-3 flex justify-between items-center">
          <h2 className="text-base font-medium">Share cart collection</h2>

          <button
            type="button"
            className="size-7 bg-[rgba(245,3,3,0.10)] rounded-full p-2"
            onClick={closeClick}
          >
            <Image
              src={cartIcons.cross}
              alt="alt"
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-auto"
            />
          </button>
        </div>

        <div className="px-4 py-5 flex items-center gap-1">
          <div className="w-full flex items-center gap-1 border rounded-10 px-3">
            <input
              type="text"
              name="cart"
              onChange={() => {}}
              value="https://bikiran.com/cart/123456rtfgbhrtfdhbtfdrhyfdrhytfdrhytfdrghytfdrgh"
              disabled
              className="w-full h-10 py-2.5 text-sm overflow-hidden text-ellipsis"
            />

            <button
              type="button"
              onClick={() => copy("https://bikiran.com/cart/123456")}
              className="w-7"
            >
              <Image
                src={isCopied ? cartIcons.tick : cartIcons.copy}
                alt="copy"
                width={0}
                height={0}
                sizes="100vw"
                className="w-full h-auto opacity-80"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartCollectionSharePopup;
