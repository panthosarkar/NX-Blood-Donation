import { ReactNode } from "react";
import { TooltipProvider } from "@/src/components/ui/tooltip";
import AppProvider from "@/bik-lib/context/AppProvider";
import LayoutProvider from "@/bik-lib/context/LayoutProvider";
import TemplateProvider from "@/bik-lib/context/template/TemplateProvider";
import ComposeProviders from "@/bik-lib/lib/ComposeProviders";
// import AdvMenuProvider from "@/src/shared/adv-menu/AdvMenuProvider";
import AdvMenuLayout from "@/src/shared/adv-menu/AdvMenuLayout";
import HeaderSection from "@/src/shared/header/HeaderSection";
import { CookiesAcceptPopup } from "@bikiran/utils";

export const metadata = {
  title: "src Admin",
  description: "src Admin Panel",
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <ComposeProviders
      components={[
        TemplateProvider,
        AppProvider,
        LayoutProvider,
        TooltipProvider,
        // AdvMenuProvider,
      ]}
    >
      <HeaderSection />
      <div className="relative top-[72px]">{children}</div>
      {/* <AdvMenuLayout className=""></AdvMenuLayout> */}
      {/* Accept Cookies */}
      <CookiesAcceptPopup />
    </ComposeProviders>
  );
}
