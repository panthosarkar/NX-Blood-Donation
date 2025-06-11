import { FC } from "react";
import { cn } from "@/bik-lib/utils/cn";
import { icons } from "@/src/lib/icons";
import { TUser } from "../user-search/UserSearchType";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { UserInfoComp } from "@src/utils";
import { TInvoiceData, TInvoiceInfo } from "@/bik-lib/types/invoice";
import Image from "next/image";
import editIcon from "./icon-edit.svg";
import InvoiceInfo from "./InvoiceInfo";
import InvoiceToInfo from "./InvoiceToInfo";
import InvoiceSummery from "./InvoiceSummery";
import InvoiceTableBody from "./InvoiceTableBody";
import InvoiceNoteComp from "./InvoiceNoteComp";
import { TInvoiceResponse } from "@/src/components/billing-invoice-manage/invoiceManageTypes";
import { showCurrencySign } from "@/bik-lib/utils/show";

const InvoiceUserComp: FC<{ userData: TUser; editable: boolean }> = ({
  userData,
  editable,
}) => {
  const { openModal } = useTemplate();
  return (
    <div
      className={cn("relative !-left-4 print:hidden", {
        group: editable,
      })}
    >
      <div className="px-4 py-4 group-hover:bg-[#8080802e] rounded-10">
        <UserInfoComp
          ImageComponent={Image}
          email={userData?.email}
          name={userData?.displayName}
          photoUrl={userData?.photoUrl}
        />
      </div>
      <div className="absolute top-[calc(50%_-_10px)] left-[calc(100%_-_15px)] invisible group-hover:visible invoice-edit-btn">
        <div className="flex flex-col gap-3">
          <button
            type="button"
            className="size-6 -mr-2 bg-error rounded-full p-1.5"
            onClick={() => openModal("change-user", userData)}
          >
            <Image
              src={editIcon}
              alt="edit icon"
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-auto"
            />
          </button>
        </div>
      </div>
    </div>
  );
};
const InvoiceComp: FC<{
  data: TInvoiceResponse;
  editable?: boolean;
  scopes?: string[];
  reload?: () => void;
}> = ({ data, editable = true, scopes, reload }) => {
  const invoice: TInvoiceInfo = data?.invoice as TInvoiceInfo;

  const userData: TUser = {
    displayName: data?.invoiceOwner?.displayName || "---------",
    email: data?.invoiceOwner?.email || "---------",
    photoUrl: data?.invoiceOwner?.photoUrl || icons.iconUser,
    id: data?.invoiceOwner?.id || 0,
    phone: data?.invoiceOwner?.phone,
  };

  const checkEditable = (operation: string): boolean => {
    return scopes !== undefined
      ? scopes?.indexOf(operation) !== -1 && editable
      : editable;
  };
  const ownershipEditable: boolean = checkEditable("UpdateOwnership");
  const addressEditable: boolean = checkEditable("UpdateAddress");
  const productEditable: boolean = checkEditable("ProductOperations");

  return (
    <div className="w-full text-gray-800 bg-white shadow-[0px_4px_70px_0px_rgba(19,15,64,0.05)] px-[25px] sm:px-5 py-6 print:!px-0 print:shadow-none ">
      <h2 className="text-primary text-2xl text-center font-medium mb-5 hidden print:block">
        Invoice
      </h2>
      {/* Sending To... */}
      <div className="grid grid-cols-2 gap-10 mb-8 print:!max-w-[650px]">
        <div>
          <InvoiceUserComp userData={userData} editable={ownershipEditable} />
          <InvoiceToInfo data={data} editable={addressEditable} />
        </div>
        <InvoiceInfo data={data} />
      </div>
      {/* Order Summary */}
      <div className="mb-5">
        <h3 className="text-lg font-medium mb-3">Order Summary</h3>
        <table className="w-full border border-black mb-6 text-sm print:!max-w-[650px]">
          <thead>
            <tr className="[&>th]:border [&>th]:bg-primary-100 [&>th]:border-black [&>th]:px-2 [&>th]:h-8 [&>th]:text-[10px] [&>th]:text-primary [&>th]:font-medium h-8">
              <th className="w-[40px]">#</th>
              <th className=" text-left">Item</th>
              <th className="w-[82px]">
                Value ({showCurrencySign(invoice?.localCurrency)})
              </th>
              <th className="w-[82px]">Quantity</th>
              <th className="w-[82px]">
                Price ({showCurrencySign(invoice?.localCurrency)})
              </th>
              <th className="w-[82px]">
                Total ({showCurrencySign(invoice?.localCurrency)})
              </th>
            </tr>
          </thead>
          <InvoiceTableBody
            data={data}
            editable={productEditable}
            reload={reload}
          />
        </table>
      </div>
      {/* Payment Summary */}
      <InvoiceSummery data={data} />
      <InvoiceNoteComp
        show={editable}
        data={invoice}
        reload={reload as () => void}
      />
    </div>
  );
};

export default InvoiceComp;
