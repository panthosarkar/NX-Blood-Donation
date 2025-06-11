import { useEffect, useState } from "react";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { usePathname } from "next/navigation";

// const checkModal = (type: string) => {
//   const { openModal } = useTemplate();
//   const pathname = usePathname();

//   useEffect(() => {
//     const hash =
//       typeof window !== undefined ? window?.location?.hash?.substring(1) : "";
//     const [modalType] = hash.split("?");
//     if (modalType === type) {
//       openModal(modalType);
//       // Clear the hash to avoid reopening modal on subsequent renders
//       history.replaceState(null, "", pathname);
//     }
//   }, []);
//   return null;
// };

const checkModal = (type: string) => {
  const [isHash, setIsHash] = useState<boolean>(false);

  const { openModal } = useTemplate();
  const pathname = usePathname();

  // Check if the URL hash is present
  const hash =
    typeof window !== undefined ? window.location.hash.substring(1) : "";

  useEffect(() => {
    // If no hash is present, return early
    if (!hash) return;
    // Split the hash into modal type and query string
    const [modalType, queryString] = hash.split("?");
    // Convert the query string into an object
    const queryParams = Object.fromEntries(new URLSearchParams(queryString));
    if (modalType === type) {
      setIsHash(true);
      openModal(modalType, queryParams);
      // Clear the hash to avoid reopening modal on subsequent renders
      history.replaceState(null, "", pathname);
    }

    () => setIsHash(false);
  }, []);
  return {
    isHash,
  };
};

export default checkModal;
