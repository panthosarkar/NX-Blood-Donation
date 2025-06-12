// "use client";
// import { useAuth2 } from "@/bik-lib/context/auth/Auth2Provider";
// import { usePathname, useRouter } from "next/navigation";
// import { useEffect } from "react";
// import { getAccountUrl } from "@/bik-lib/utils/Env";
// import links from "@/src/shared/adv-menu/links";
// import { PageLoading } from "@src/utils";
// export default function NotFound() {
//   const pathname = usePathname();
//   const router = useRouter();
//   // const { authInfo } = useAuth2();

//   const currentUrl = `${window.location.origin}${pathname}`;
//   const urlEncode = encodeURIComponent(currentUrl);

//   useEffect(() => {
//     if (pathname === "/" && !authInfo.loading && !authInfo.error) {
//       router.push(links[0].subMenu[0].id);
//     } else if (authInfo.error && !authInfo.loading) {
//       router.push(`${getAccountUrl()}/login/?continue=${urlEncode}`);
//     }
//   }, [authInfo.error, authInfo.loading, pathname, router, urlEncode]);

//   return <PageLoading />;
// }
import HomePage from "@/src/components/home-page/HomePage";
import React from "react";

const page = () => {
  return (
    <div>
      <HomePage />
    </div>
  );
};

export default page;
