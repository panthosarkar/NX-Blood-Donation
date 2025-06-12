import { ReactNode } from "react";
import { TooltipProvider } from "@/src/components/ui/tooltip";
import LayoutProvider from "@/bik-lib/context/LayoutProvider";
import TemplateProvider from "@/bik-lib/context/template/TemplateProvider";
import ComposeProviders from "@/bik-lib/lib/ComposeProviders";
import HeaderSection from "@/src/shared/header/HeaderSection";
import { CookiesAcceptPopup } from "@bikiran/utils";
import Image from "next/image";
import bgImg from "@/public/assets/images/bg-home.svg";

export const metadata = {
  title: "Blood Donation",
  description: "Blood Donation App",
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <ComposeProviders
      components={[
        TemplateProvider,
        LayoutProvider,
        TooltipProvider,
        // AdvMenuProvider,
      ]}
    >
      <HeaderSection />
      <div className="fixed top-0 left-0 w-full h-full">
        <Image src={bgImg} alt="bg" width={0} height={0} className="w-full" />
      </div>
      <div className="relative top-[72px] container">{children}</div>
      {/* <AdvMenuLayout className=""></AdvMenuLayout> */}
      {/* Accept Cookies */}
      <CookiesAcceptPopup />
    </ComposeProviders>
  );
}
