"use client";
import { useAuth2 } from "@/bik-lib/context/auth/Auth2Provider";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { getAccountUrl } from "@/bik-lib/utils/Env";
import links from "@/bikiran/shared/adv-menu/links";
import { PageLoading } from "@bikiran/utils";
export default function NotFound() {
  const pathname = usePathname();
  const router = useRouter();
  const { authInfo } = useAuth2();

  const currentUrl = `${window.location.origin}${pathname}`;
  const urlEncode = encodeURIComponent(currentUrl);

  useEffect(() => {
    if (pathname === "/" && !authInfo.loading && !authInfo.error) {
      router.push(links[0].subMenu[0].id);
    } else if (authInfo.error && !authInfo.loading) {
      router.push(`${getAccountUrl()}/login/?continue=${urlEncode}`);
    }
  }, [authInfo.error, authInfo.loading, pathname, router, urlEncode]);

  return <PageLoading />;
}
