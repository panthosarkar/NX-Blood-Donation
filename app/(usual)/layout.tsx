import Navbar from "@/src/shared/navbar-section/Navbar";
import Image from "next/image";
import { ReactNode } from "react";
import backgroundImage from "@/public/assets/image/bg-body.svg";
import backgroundComp1 from "@/public/assets/image/bg-section-comp1.svg";
import backgroundComp2 from "@/public/assets/image/bg-section-comp2.svg";
import Footer from "@/src/shared/footer/Footer";

export const metadata = {
  title: "Blood Donation",
  description: "Blood Donation App",
};
type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="max-h-screen overflow-auto relative custom-scrollbar">
      <Navbar />
      <div className="relative top-[72px] max-w-[1400px] mx-auto mt-[60px] pb-[300px]">
        {children}
      </div>
      <Footer />
      {/* <CookiesAcceptPopup /> */}
    </div>
    // <ComposeProviders
    //   components={[
    //     TemplateProvider,
    //     AppProvider,
    //     LayoutProvider,
    //     TooltipProvider,
    //     AdvMenuProvider,
    //   ]}
    // >
    //   <HeaderSection />
    //   <AdvMenuLayout className="">{children}</AdvMenuLayout>
    //   {/* Accept Cookies */}
    //   <CookiesAcceptPopup />
    // </ComposeProviders>
  );
}
