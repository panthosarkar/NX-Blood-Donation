import Navbar from "@/src/shared/navbar-section/Navbar";
import Image from "next/image";
import { ReactNode } from "react";
import backgroundImage from "@/public/assets/image/bg-body.svg";

export const metadata = {
  title: "Blood Donation",
  description: "Blood Donation App",
};
type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="relative min-h-screen">
      <Image
        alt=""
        src={backgroundImage}
        fill
        sizes="100vw"
        className="object-cover fixed top-0 right-0"
        priority
      />
      <Navbar />
      <div className="relative top-[72px] container">{children}</div>

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
