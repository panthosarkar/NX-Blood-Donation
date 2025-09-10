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
      {/* main bg image */}
      <Image
        alt=""
        src={backgroundImage}
        sizes="100vh"
        className="h-screen absolute sm:top-0 sm:right-0 top-[250px]"
      />
      {/* comp 1 */}
      <Image
        alt=""
        src={backgroundComp1}
        sizes="100vh"
        className="absolute sm:top-[207px] top-[450px] sm:left-[56px] left-5"
      />
      {/* comp2 */}
      <Image
        alt=""
        src={backgroundComp2}
        sizes="100vh"
        className="absolute sm:top-[800px] top-[850px] sm:right-[113px] right-5"
      />
      <Navbar />
      <div className="relative top-[72px] max-w-[1400px] mx-auto sm:mt-[60px] mt-5 pb-[300px] sm:px-0 px-4">
        {children}
      </div>
      {/* <Footer /> */}
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
