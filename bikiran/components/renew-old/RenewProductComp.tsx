// import { FC } from "react";

// import { Checkbox } from "@/bikiran/components/ui/checkbox";
// import { showCurrencySign, showInt } from "@/bik-lib/utils/show";
// import capitalizeFirstLetter from "@/bik-lib/utils/capitalizeFirstLetter";
// import { TRenewProduct } from "./renewProductTypes";
// import { cn } from "@/bik-lib/utils/cn";

// type TProps = {
//   data: TRenewProduct;
//   setSelectedData?: () => void;
//   selectedData?: TRenewProduct[];
//   isSelected?: boolean;
// };

// const RenewProductComp: FC<TProps> = ({
//   data,
//   setSelectedData,
//   selectedData = [],
//   isSelected,
// }) => {
//   const isChecked =
//     isSelected ||
//     selectedData?.some(
//       (dt: TRenewProduct) => dt?.subscriptionId === data?.subscriptionId
//     );
//   return (
//     <>
//       <div
//         className={` border-[#E0C1FF] flex flex-wrap sm:flex-nowrap items-stretch justify-between gap-[15px] sm:pl-3 sm:pr-5 py-5 cursor-pointer ${isSelected ? "sm:border border-y sm:rounded-[13px]" : ""
//           }`}
//         onClick={setSelectedData}
//       >
//         <div
//           className={cn("flex gap-[15px] overflow-hidden", {
//             "items-center": true,
//             "items-start": data.domain,
//           })}
//         >
//           <Checkbox
//             id={`${data?.subscriptionId}`}
//             className={cn(' border border-primary-500 size-7 ring-0 data-[state=checked]:border-secondary  data-[state=checked]:bg-secondary data-[state=checked]:text-white',
//               {
//                 "mt-1.5": data.domain,
//               })}
//             onChange={setSelectedData}
//             checked={isChecked}
//           />
//           <div className="flex-1 overflow-hidden">
//             <h2 className="text-primary text-lg font-medium overflow-hidden text-ellipsis">
//               {data?.title}
//             </h2>
//             {data?.domain && (
//               <p className="text-primary text-sm font-normal mb-2">
//                 {data?.domain}
//               </p>
//             )}
//             <p className="text-error text-xs font-normal mb-2">
//               {data?.subTitle}
//             </p>
//             {/* {isSelected ? (
//               <p className="text-primary-500 text-xs font-medium mb-2">
//                 {" "}
//                 {data?.assetKey?.toLowerCase()} Renew for {data?.quantity}{" "}
//                 {data?.subTitle}
//               </p>
//             ) : (
//               <p className="text-error text-xs font-normal mb-2">
//                 {data?.subTitle}
//               </p>
//             )} */}
//           </div>
//         </div>

//         <div className="flex flex-col items-end gap-2">
//           <div>
//             <p className="text-[#F50057] text-lg font-bold font-lato">
//               {showCurrencySign(data?.currency)}
//               {showInt(data?.totalPrice)}
//             </p>
//             <p className="text-[#F50057] text-xs text-right font-medium">
//               /{data.quantity}{" "}
//               {capitalizeFirstLetter(data?.unitName.toLowerCase())}
//             </p>
//           </div>
//         </div>
//       </div>
//       <div
//         className={`border-b border-[#E0C1FF] last:border-b-0 mx-2.5 ${isSelected ? "border-b-0" : ""
//           }`}
//       ></div>
//     </>
//   );
// };

// export default RenewProductComp;
