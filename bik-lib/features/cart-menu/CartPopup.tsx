import { TCartMenuData } from "./cartMenuTypes";
import CartPopupHeader from "./CartPopupHeader";
import CartPopupBody from "./CartPopupBody";
import Link from "next/link";

type TProps = {
  cartData: TCartMenuData[];
  setAction: (action: any) => void;
  removeProduct: (productId: number) => void;
  action: any;
  closeClick: () => void;
  elementRef: React.RefObject<HTMLDivElement | null>;
};

const CartPopup: React.FC<TProps> = ({
  cartData,
  removeProduct,
  setAction,
  action,
  closeClick,
  elementRef,
}) => {
  const isCartEmpty = cartData && cartData.length === 0;

  return (
    <div
      className="fixed sm:absolute top-0 sm:top-10 right-0 sm:-right-24 md:-right-2 z-[999999] w-full sm:w-[500px] h-full sm:h-[500px] shadow-[0px_4px_50px_0px_rgba(19,15,64,0.10)] bg-white overflow-hidden pb-5 pt-[10px] sm:rounded-[25px] border-0"
      ref={elementRef}
    >
      <div className="h-13 p-5">
        <CartPopupHeader
          cartData={cartData}
          setAction={setAction}
          action={action}
          closeClick={closeClick}
        />
      </div>
      <div
        className={`overflow-auto custom-scrollbar ${isCartEmpty ? "h-[calc(100%_-_55px)]" : "h-[calc(100%_-_100px)]"
          }`}
      >
        <CartPopupBody cartData={cartData} removeProduct={removeProduct} />
      </div>
      {!isCartEmpty ? (
        <div className="flex items-center justify-end h-[70px] px-5">
          <Link
            href="/cart"
            className="bg-secondary text-white px-5 py-2.5 rounded-10"
          >
            Checkout
          </Link>
        </div>
      ) : null}
    </div>
  );
};

export default CartPopup;
