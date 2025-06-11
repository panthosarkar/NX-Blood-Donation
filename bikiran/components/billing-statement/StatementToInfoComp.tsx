import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { TAddressBilling, TInvoiceData } from "@/bik-lib/types/invoice";
import Image from "next/image";
import { FC } from "react";

const EditIcon: FC<{ data: TInvoiceData }> = ({ data }) => {
  const { openModal } = useTemplate();
  return (
    <button
      onClick={() => openModal("address-modify", data)}
      className="size-5 print:hidden"
    >
      <Image
        src="https://files.bikiran.com/assets/images/icon/profile-edit.svg"
        alt="edit"
        width={20}
        height={20}
        sizes="100vw"
        className="w-full h-auto"
      />
    </button>
  );
};

const StatementToInfoComp: FC<{
  data: TInvoiceData;
  editable: boolean;
}> = ({ data, editable }) => {
  const addressBilling = data?.addressBilling as TAddressBilling;
  const {
    name,
    organization,
    email,
    mobile,
    line1,
    line2,
    line3,
    country,
    state,
    city,
    zipCode,
  } = addressBilling || {};

  return (
    <div className="text-sm flex-1 overflow-hidden">
      <div className="flex items-center gap-1 mb-2">
        <h2 className="text-primary text-lg md:text-xl font-medium ">To</h2>
        {/* {isDue && ( */}
        {editable && <EditIcon data={data} />}
        {/* )} */}
      </div>

      <h2 className="text-primary text-base md:text-lg font-medium">
        <span>
          {name || "---"}
          {organization ? `(${organization})` : "--"}
        </span>
      </h2>
      <div className="text-primary-700 font-normal space-y-[2px]">
        <div>
          <p>
            {" "}
            {[line1, line2, line3, city, state, zipCode, country]
              .filter((x) => !!x)
              .join(", ") || "----"}
          </p>
        </div>
        <div className="whitespace-nowrap">
          <p className="font-medium">
            Contact: {mobile || "----"}, {email || "----"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StatementToInfoComp;
