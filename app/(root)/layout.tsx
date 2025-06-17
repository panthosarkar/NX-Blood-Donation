import Navbar from "@/src/shared/navbar-section/Navbar";
import Image from "next/image";
import { ReactNode } from "react";
import backgroundImage from "@/public/assets/image/bg-body.svg";
import backgroundComp1 from "@/public/assets/image/bg-section-comp1.svg";
import backgroundComp2 from "@/public/assets/image/bg-section-comp2.svg";

export const metadata = {
  title: "Blood Donation",
  description: "Blood Donation App",
};
type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="max-h-screen overflow-auto relative pb-[300px] custom-scrollbar">
      {/* main bg image */}
      <Image
        alt=""
        src={backgroundImage}
        sizes="100vh"
        className="h-screen absolute top-0 right-0"
      />
      {/* comp 1 */}
      <Image
        alt=""
        src={backgroundComp1}
        sizes="100vh"
        className="absolute top-[207px] left-[56px]"
      />
      {/* comp2 */}
      <Image
        alt=""
        src={backgroundComp2}
        sizes="100vh"
        className="absolute top-[800px] right-[113px]"
      />
      <Navbar />
      <div className="relative top-[72px] max-w-[1400px] mx-auto mt-[60px]">
        {children}
      </div>

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
