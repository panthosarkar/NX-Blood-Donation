import Image from "next/image";
import Link from "next/link";
import { cartIcons } from "./icons/cartIcons";
import { FC } from "react";

type TBtnProps = {
  show?: boolean;
  onClick: () => void;
  active?: boolean;
};

const ButtonAddFavorite: FC<TBtnProps> = ({
  show = false,
  onClick,
  active,
}) => {
  if (!show) return null;
  return (
    <button
      type="button"
      onClick={onClick}
      className={`size-11 rounded-10 p-2.5 hover:bg-[rgba(255,45,85,0.05)] transition-colors ${
        active ? "bg-[rgba(255,45,85,0.05)]" : ""
      }`}
    >
      <Image
        src={cartIcons.heartLine}
        alt="heartLine"
        width={0}
        height={0}
        sizes="100vw"
        className="w-full h-auto rounded-10"
      />
    </button>
  );
};

const ButtonShare: FC<TBtnProps> = ({ show = false, onClick, active }) => {
  if (!show) return null;
  return (
    <button
      type="button"
      onClick={onClick}
      className={`size-11 rounded-10 p-2.5 hover:bg-secondary-50 transition-colors ${
        active ? "bg-secondary-50" : ""
      }`}
    >
      <Image
        src={cartIcons.shareLine}
        alt="shareLine"
        width={0}
        height={0}
        sizes="100vw"
        className="w-full h-auto rounded-10"
      />
    </button>
  );
};

const ButtonClose: FC<TBtnProps> = ({ onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="size-[32px] bg-[rgba(245,3,3,0.10)] rounded-full p-2 ml-3"
    >
      <Image
        src={cartIcons.cross}
        alt="cross"
        width={0}
        height={0}
        sizes="100vw"
        className="w-full h-auto rounded-full"
      />
    </button>
  );
};

type TProps = {
  cartData: any[];
  setAction: (action: any) => void;
  action: any;
  closeClick: () => void;
};

const CartPopupHeader: FC<TProps> = ({
  cartData,
  setAction,
  action,
  closeClick,
}) => {
  return (
    <div className="flex items-center justify-between h-full">
      <div className="flex items-center gap-4">
        <h2 className="text-black text-[25px] font-medium">Cart</h2>

        <Link
          href="/cart"
          className="text-secondary text-sm font-medium whitespace-nowrap"
        >
          Manage Cart
        </Link>
      </div>

      <div className="flex items-center gap-1">
        {/* <ButtonAddFavorite
          show={cartData.length > 0}
          onClick={() =>
            setAction((prev: any) => ({ ...prev, fav: !prev.fav }))
          }
          active={action.fav}
        /> */}
        {/* <ButtonShare
          show={cartData.length > 0}
          onClick={() =>
            setAction((prev: any) => ({ ...prev, share: !prev.share }))
          }
          active={action.share}
        /> */}
        <ButtonClose onClick={closeClick} />
      </div>
    </div>
  );
};

export default CartPopupHeader;
