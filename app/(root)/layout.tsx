import Navbar from "@/src/shared/navbar-section/Navbar";
import { ReactNode } from "react";

export const metadata = {
  title: "Blood Donation",
  description: "Blood Donation App",
};
type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <div>
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
