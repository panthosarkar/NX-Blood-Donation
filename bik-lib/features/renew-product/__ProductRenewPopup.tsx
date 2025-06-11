// import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
// import { cn } from "@/bik-lib/utils/cn";
// import Image from "next/image";
// import { FC, useEffect, useRef } from "react";
// import { productRenewIcons } from "./icons/productRenewIcons";
// import RenewProductHosting from "./RenewProductHosting";
// import { useHostingInfo } from "@/bikiran/components/hosting-manage/context/HostingInfoProvider";

// type Props = {
//   top?: number;
//   align?: "left" | "right" | "center";
//   className?: string;
// };

// const HeaderComp: FC = () => {
//   return (
//     <div className="h-14 w-full flex justify-between items-center py-2.5 pl-5 pr-2.5">
//       <h2 className="text-primary text-2xl font-medium">Renew</h2>
//       <button
//         type="button"
//         className="bg-[rgba(245,3,3,0.10)] rounded-full size-[35px] p-2.5"
//       >
//         <Image
//           src={productRenewIcons.close}
//           alt="close"
//           width={0}
//           height={0}
//           sizes="100vw"
//           className="w-full h-auto"
//         />
//       </button>
//     </div>
//   );
// };

// const ProductInfoComp: FC = () => {
//   const { modalData: data } = useTemplate();

//   return <div className="text-white ">{/* <RenewProductHosting /> */}</div>;
// };

// const ProductRenewPopup: FC<Props> = ({ align = "right", className }) => {
//   const ref = useRef<HTMLDivElement>(null);

//   const { modalType, closeModal } = useTemplate();

//   const handleClickOutside = (event: MouseEvent) => {
//     // Check if the clicked target is outside the referenced element
//     if (ref.current && !ref.current.contains(event.target as Node)) {
//       closeModal();
//     }
//   };

//   useEffect(() => {
//     // Bind the event listener
//     document.addEventListener("mousedown", handleClickOutside);

//     return () => {
//       // Unbind the event listener on cleanup
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [ref]);

//   return (
//     <div
//       ref={ref}
//       className={cn(
//         `absolute top-11 z-10 sm:w-[500px] h-full sm:h-[500px] shadow-[0px_4px_50px_0px_rgba(19,15,64,0.10)] bg-white overflow-hidden rounded-[25px] transform scale-0 transition-all`,
//         className,
//         {
//           "left-0": align === "left",
//           "right-0": align === "right",
//           "left-1/2 -translate-x-1/2": align === "center",
//           "scale-100": modalType === "renew-product",
//         }
//       )}
//     >
//       <HeaderComp />

//       <ProductInfoComp />
//     </div>
//   );
// };

// export default ProductRenewPopup;
