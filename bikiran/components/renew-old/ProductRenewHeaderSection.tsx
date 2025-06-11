// import { FC } from "react";
// import { useApp } from "@/bik-lib/context/AppProvider";
// import { TState } from "@/bik-lib/types/event";
// import { Select } from "@bikiran/inputs";
// import { addOption } from "@/bik-lib/utils/option";
// import { ButtonRefresh } from "@/bik-lib/lib/button";
// import { TBillingAccount } from "./renewProductTypes";

// type Props = {
//   formData: Record<string, any>;
//   setFormData: TState<Record<string, any>>;
//   billingAccounts: TBillingAccount[];
//   reloadRenewData: () => void;
//   notFound?: boolean;
// };

// const ProductRenewHeaderSection: FC<Props> = ({
//   formData,
//   setFormData,
//   billingAccounts,
//   reloadRenewData,
//   notFound,
// }) => {
//   const { currencies } = useApp();
//   return (
//     <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
//       <h1 className="text-primary text-2xl lg:text-3xl font-medium text-left">
//         Product Renew
//       </h1>
//       <div className="flex flex-wrap items-center gap-3">
//         {/* Only visible when products is available */}
//         {!notFound && (
//           <Select
//             label=""
//             placeholder="Currency"
//             options={
//               currencies
//                 ? currencies.map((item: Record<string, string>) =>
//                     addOption(item.currency, item.currency, item.currency)
//                   )
//                 : []
//             }
//             name="currency"
//             formData={formData}
//             onChange={(ev) =>
//               setFormData((prev) => ({ ...prev, currency: ev.target.value }))
//             }
//             className="text-primary text-left !w-30 !h-10 mt-0"
//           />
//         )}

//         {/* Only visible when billing accounts is available */}
//         {billingAccounts?.length !== 0 && billingAccounts?.length > 1 && (
//           <Select
//             label=""
//             placeholder="Billing account"
//             options={billingAccounts?.map((item: TBillingAccount) =>
//               addOption(
//                 item.id?.toString(),
//                 item.title.toString(),
//                 item.id?.toString()
//               )
//             )}
//             name="billingAccountId"
//             formData={formData}
//             onChange={(ev) =>
//               setFormData((prev) => ({
//                 ...prev,
//                 billingAccountId: ev.target.value,
//               }))
//             }
//             className="text-primary text-left w-50 h-10 whitespace-nowrap"
//           />
//         )}

//         {/* Page data reload button */}
//         <div className="items-center grid justify-center w-10">
//           <ButtonRefresh onClick={reloadRenewData} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductRenewHeaderSection;
