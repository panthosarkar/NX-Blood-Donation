import { FC } from "react";
import { TCartMenuData } from "./cartMenuTypes";
import CartProductSection from "./CartProductSection";

type TProps = {
  cartData: TCartMenuData[];
  removeProduct: (productId: number) => void;
};

const CartPopupBody: FC<TProps> = ({ cartData, removeProduct }) => {
  return (
    <div className="h-full">
      {cartData && cartData.length === 0 ? (
        <div className="h-full flex items-center justify-center text-center mx-5 text-2xl text-primary-500 font-normal py-10 border border-[#E0C1FF] rounded-20">
          Cart is empty!
        </div>
      ) : null}
      <div className="px-5">
        {cartData?.map((item: TCartMenuData) => (
          <CartProductSection
            data={item}
            key={item.id}
            removeProduct={removeProduct}
          />
        ))}
      </div>
    </div>
  );
};

export default CartPopupBody;
