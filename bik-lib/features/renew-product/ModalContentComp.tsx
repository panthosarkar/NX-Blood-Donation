// import { showInt } from "@/bik-lib/utils/show";
// import { useAuth2 } from "@/bik-lib/context/auth/Auth2Provider";
// import { TRenewData } from "./renewProductTypes";
// import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
// import { useHostingInfo } from "@/bikiran/components/hosting-manage/context/HostingInfoProvider";
// import { FC, useEffect, useState } from "react";
// import { ApiCreateRenewInvoice, ApiLoadRenewData } from "./RenewOperations";
// import RenewProductHostingComp from "./RenewProductHostingComp";

// const ModalContentComp: FC = () => {
//   const [renewData, setRenewData] = useState<TRenewData[]>([]);
//   const [reloadKey, setReloadKey] = useState<number>(-1);
//   const [loading, setLoading] = useState<boolean>(false);

//   const defaultSelectedData =
//     renewData?.filter((dt: TRenewData) => dt.isChecked) || [];

//   const [selectedData, setSelectedData] =
//     useState<TRenewData[]>(defaultSelectedData);

//   const { authInfo, chkLoginReq } = useAuth2();
//   const { setMessage } = useTemplate();
//   const { hostingInfo, subscriptionData } = useHostingInfo();

//   const selectProduct = (data: TRenewData) => {
//     setSelectedData((prevDt) => {
//       const prevData = prevDt;
//       if (prevData.some((dt) => dt.subscriptionId === data.subscriptionId)) {
//         return prevData.filter(
//           (dt) => dt.subscriptionId !== data.subscriptionId
//         );
//       } else {
//         return [...prevData, data];
//       }
//     });
//   };

//   const projectId = hostingInfo.projectId || 0;

//   const subTotal = selectedData.reduce((acc, dt) => acc + dt.price, 0);

//   useEffect(() => {
//     if (reloadKey !== -2) {
//       ApiLoadRenewData(authInfo, chkLoginReq, subscriptionData.id, projectId)
//         .then(({ data }) => {
//           setRenewData(data.scopes);
//         })
//         .catch((err: Error) => {
//           console.log(err.message);
//         })
//         .finally(() => {
//           setReloadKey(-2);
//         });
//     }
//   }, [projectId, subscriptionData.id, reloadKey]);

//   const handleCheckout = () => {
//     const payload = {
//       subscriptionIds: selectedData.map((dt) => dt.subscriptionId),
//     };

//     setLoading(true);
//     setMessage("Creating invoice...");

//     ApiCreateRenewInvoice(authInfo, chkLoginReq, projectId, payload)
//       .then(({ message }) => {
//         setMessage(message);
//       })
//       .catch((err: Error) => {
//         setMessage(err.message);
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   };

//   if (reloadKey === -1) {
//     return <div>Loading.......</div>;
//   }

//   if (renewData.length === 0) {
//     return <div>Hello</div>;
//   }
//   return (
//     <div className="text-white ">
//       {defaultSelectedData?.length > 0 && (
//         <RenewProductHostingComp
//           data={defaultSelectedData[0]}
//           isSelected={true}
//         />
//       )}

//       <h2 className="text-primary font-medium mt-2.5 mb-2">Recommended</h2>
//       <div className="border border-[#E0C1FF] rounded-[13px] px-2.5">
//         {renewData
//           ?.filter((i: TRenewData) => !i.isChecked)
//           ?.map((item: TRenewData) => {
//             return (
//               <RenewProductHostingComp
//                 key={item.subscriptionId}
//                 data={item}
//                 setSelectedData={() => selectProduct(item)}
//                 selectedData={selectedData}
//               />
//             );
//           })}
//       </div>

//       <div className="flex items-center justify-end gap-7 text-primary text-base font-medium mt-4 mb-5">
//         <span>Subtotal ({selectedData.length || 0} Items )</span>{" "}
//         <span>${showInt(subTotal)}</span>
//       </div>

//       <div className="flex justify-end">
//         <Button
//           variant="secondary"
//           className="px-5 py-2.5"
//           onClick={handleCheckout}
//           loading={loading}
//         >
//           Checkout
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default ModalContentComp;
