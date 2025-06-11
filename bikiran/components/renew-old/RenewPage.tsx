// "use client";
// import {
//   TRenewData,
//   TRenewProduct,
//   TRenewProductPayload,
// } from "./renewProductTypes";
// import { useRouter } from "next/navigation";
// import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
// import { getAdminUrl, getBikiranUrl } from "@/bik-lib/utils/Env";
// import { initialRenewData } from "./renewProductConstants";
// import { FC, useEffect, useState } from "react";
// import { showCurrencySign, showInt } from "@/bik-lib/utils/show";
// import ProductNotFoundSection from "./ProductNotFoundSection";
// import RenewProductComp from "./RenewProductComp";
// import ProductRenewHeaderSection from "./ProductRenewHeaderSection";
// import ProductRenewSkeletonSection from "./ProductRenewSkeletonSection";
// import { useAuth2 } from "@/bik-lib/context/auth/Auth2Provider";
// import { Button } from "@bikiran/button";
// import useApi from "@/bik-lib/utils/userApi";

// const ProductCalculation: FC<{
//   subTotal: number;
//   selectedData: number;
//   currency: string;
// }> = ({ subTotal, selectedData, currency }) => {
//   return (
//     <div className="flex items-center justify-end gap-7 text-primary text-base font-medium mt-4 mb-5">
//       <span>Subtotal ({selectedData} Items )</span>{" "}
//       <span>
//         {showCurrencySign(currency)}
//         {showInt(subTotal)}
//       </span>
//     </div>
//   );
// };

// const RecommendedProducts: FC<{
//   data: TRenewProduct[];
//   selectProduct: (data: TRenewProduct) => void;
//   selectedData: TRenewProduct[];
// }> = ({ data, selectProduct, selectedData }) => {
//   return (
//     <div>
//       <h2 className="text-primary font-medium mt-2.5 mb-2">Recommended</h2>
//       <div className="sm:border border-y border-[#E0C1FF] sm:rounded-[13px]">
//         {data?.map((item: TRenewProduct) => {
//           return (
//             <RenewProductComp
//               key={item.subscriptionId}
//               data={item}
//               setSelectedData={() => selectProduct(item)}
//               selectedData={selectedData}
//             />
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// const RenewPage: FC<{
//   query: Record<string, any>;
// }> = ({ query }) => {
//   const [renewData, setRenewData] = useState<TRenewData>(initialRenewData);
//   const [reloadKey, setReloadKey] = useState<number>(-1);
//   const [loading, setLoading] = useState<boolean>(false);
//   const router = useRouter();
//   // Destructuring renewData
//   const products = renewData.scopes || [];
//   const billingAccounts = renewData.billingAccounts || [];
//   const currency = renewData.currency || "";
//   const [formData, setFormData] = useState<Record<string, any>>({});
//   const [dataLength, setDataLength] = useState<number>(2);

//   // Default checked product
//   const defaultSelectedData =
//     products?.filter((dt: TRenewProduct) => dt.isChecked) || [];
//   // State to store selected renew products
//   const [selectedData, setSelectedData] =
//     useState<TRenewProduct[]>(defaultSelectedData);

//   const { authInfo } = useAuth2();
//   const { setMessage } = useTemplate();
//   const { get, post } = useApi();

//   const subTotal = selectedData.reduce((acc, dt) => acc + dt.totalPrice, 0);

//   const recommendedProducts = products?.filter(
//     (i: TRenewProduct) => !i.isChecked
//   );

//   useEffect(() => {
//     if (reloadKey !== -2 && !authInfo.loading) {
//       get(`/admin/billing/renew`, query)
//         .then(({ data }) => {
//           if (data) {
//             // If no data found
//             if (Object.keys(data).length === 0) {
//               setRenewData({ ...data, notFound: true });
//             } else {
//               setRenewData(data);
//             }
//             setSelectedData(
//               data?.scopes.filter((dt: TRenewProduct) => dt.isChecked)
//             );
//           }
//         })
//         .catch(() => {
//           setRenewData({ ...initialRenewData, notFound: true });
//         })
//         .finally(() => {
//           setReloadKey(-2);
//         });
//     }
//   }, [reloadKey, query]);

//   useEffect(() => {
//     setFormData((prev) => ({
//       ...prev,
//       currency,
//     }));
//   }, [currency]);

//   const reloadRenewData = () => {
//     setReloadKey(-1);
//   };

//   const selectProduct = (data: TRenewProduct) => {
//     setSelectedData((prevData) => {
//       if (prevData.some((dt) => dt.subscriptionId === data.subscriptionId)) {
//         return prevData.filter(
//           (dt) => dt.subscriptionId !== data.subscriptionId
//         );
//       } else {
//         return [...prevData, data];
//       }
//     });
//   };

//   // Create an array of selected product IDs
//   const selectedProductIds = selectedData.map(
//     (product) => product.subscriptionId
//   );

//   // handler to checkout
//   const handleCheckout = () => {
//     const { subscriptionId, asset, userId } = query;
//     const payload = {
//       primarySubscriptionId: subscriptionId,
//       currency: currency,
//       subscriptionIds: selectedProductIds,
//     };
//     setLoading(true);
//     setMessage("Creating invoice...");
//     post(
//       `/admin/billing/renew/create-invoice?subscriptionId=${subscriptionId}&asset=${asset}&userId=${userId}`,
//       payload
//     )
//       .then(({ message, data }) => {
//         setMessage(message);
//         router.push(
//           `${getAdminUrl()}/billing/invoice/${data.invoiceId}/update`
//         );
//       })
//       .catch((err: Error) => {
//         setMessage(err.message);
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   };

//   const isLoading = reloadKey === -1;

//   if (isLoading) return <ProductRenewSkeletonSection />;

//   if (renewData.notFound) {
//     return (
//       <section className="">
//         <ProductRenewHeaderSection
//           formData={formData}
//           setFormData={setFormData}
//           billingAccounts={billingAccounts}
//           reloadRenewData={reloadRenewData}
//           notFound
//         />
//         <ProductNotFoundSection />
//       </section>
//     );
//   }
//   return (
//     <section>
//       <ProductRenewHeaderSection
//         formData={formData}
//         setFormData={setFormData}
//         billingAccounts={billingAccounts}
//         reloadRenewData={reloadRenewData}
//       />

//       {/* Selected Renew Product */}

//       <div className="overflow-auto pb-7 custom-scrollbar">
//         {defaultSelectedData?.length > 0 && (
//           <RenewProductComp data={defaultSelectedData[0]} isSelected={true} />
//         )}

//         {/* Recommend Renew Products */}
//         {recommendedProducts.length !== 0 && (
//           <RecommendedProducts
//             data={recommendedProducts?.slice(0, dataLength)}
//             selectProduct={selectProduct}
//             selectedData={selectedData}
//           />
//         )}

//         {/* Load more button*/}

//         {dataLength < recommendedProducts?.length && (
//           <button
//             type="button"
//             className="text-secondary font-medium mt-2 border-b border-secondary"
//             onClick={() => setDataLength((prev) => prev + 2)}
//           >
//             Load more +{recommendedProducts?.length - dataLength}
//           </button>
//         )}

//         <ProductCalculation
//           subTotal={subTotal}
//           selectedData={selectedData.length}
//           currency={currency}
//         />

//         <div className="flex justify-end">
//           <Button
//             variant="secondary"
//             className="px-5 py-2.5"
//             onClick={handleCheckout}
//             loading={loading}
//           >
//             Checkout
//           </Button>
//         </div>
//       </div>
//     </section>
//   );
// };
// export default RenewPage;
