import { cn } from "@/bik-lib/utils/cn";
import { icons } from "@/bikiran/lib/icons";
import { showInt } from "@/bik-lib/utils/show";
import { TInvoiceTableItem } from "./InvoiceListTypes";
import { FC, useEffect, useState } from "react";
import Image from "next/image";

const InvoiceCustomSummaryComp: FC<{
  data: TInvoiceTableItem[];
}> = ({ data }) => {
  const [show, setShow] = useState<boolean>(false);

  const handleShow = () => {
    setShow((prev) => !prev);
  };

  // Show the summary if there is any data
  useEffect(() => {
    if (data.length) {
      setShow(true);
    }
  }, [data]);

  const productPrice = data?.reduce(
    (price, item) => price + item.priceTotal,
    0
  );
  const discount = data?.reduce(
    (price, item) => price + (item.priceOfferTotal - item.priceTotal),
    0
  );
  const vat = data?.reduce((price, item) => price + item.amountVat, 0);
  const paid = data?.reduce((price, item) => price + item.amountPaid, 0);
  const payable = paid - (productPrice + discount + vat);

  return (
    <div className="z-50">
      <div
        className={cn(
          "fixed top-[40%] right-0 max-w-[40px] transform -translate-y-[38%]"
        )}
      >
        <button
          onClick={handleShow}
          className="bg-secondary flex justify-center items-center text-white size-10 rounded-s-full  hover:bg-primary-600"
        >
          <Image
            src={icons.iconLeftArrow}
            width={0}
            height={0}
            alt="arrow-right"
            className="size-4"
          />
        </button>
      </div>
      <div
        className={cn(
          "w-[400px] bg-white shadow-[0px_1px_10px_3px_rgba(0,0,0,0.1)] fixed top-1/2 right-[-405px] transform -translate-y-1/2 rounded-s-15 transition-all duration-300 ease-in-out",
          {
            "right-0": show,
          }
        )}
      >
        <div className="flex items-center justify-between p-4">
          <div className="text-primary text-xl font-medium">Summary</div>
          <button onClick={handleShow} className="w-6 h-6 group">
            <div className="relative w-full h-full">
              {/* Default Icon */}
              <Image
                src={icons.iconClose}
                width={24}
                height={24}
                alt="close"
                className="block group-hover:hidden w-full h-full"
              />
              {/* Hover Icon */}
              <Image
                src={icons.iconCloseFill}
                width={24}
                height={24}
                alt="close filled"
                className="hidden group-hover:block absolute top-0 left-0 w-full h-full"
              />
            </div>
          </button>
        </div>
        <hr />
        <div className="p-4 space-y-2 w-[400px]">
          <div className=" grid grid-cols-[auto_150px] gap-2">
            {/* row 1 */}
            <div className="text-primary-700">Product Price</div>
            <div className="text-primary-700 text-end">
              {showInt(productPrice)}
            </div>
            {/* row 2 */}
            <div className="text-primary-700">Discount</div>
            <div className="text-primary-700 text-end">{showInt(discount)}</div>
            {/* row 3 */}
            <div className="text-primary-700">
              VAT <span className="text-xs">(Where Application)</span>
            </div>
            <div className="text-primary-700 text-end">{showInt(vat)}</div>
            {/* row 4 */}
            <div className="text-primary-700">Paid</div>
            <div className="text-primary-700 text-end">{showInt(paid)}</div>
          </div>
          <hr />
          <div className=" grid grid-cols-2 gap-2">
            {/* row 5 */}
            <div className="text-base font-medium text-primary-900">
              Payable
            </div>
            <div className="text-base font-medium text-primary-900 text-end">
              {showInt(payable)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceCustomSummaryComp;
