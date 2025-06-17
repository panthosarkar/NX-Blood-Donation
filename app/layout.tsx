import { Metadata } from "next";
import { ReactNode } from "react";
import localFont from "next/font/local";
import "@/src/styles/style.css";

const dm = localFont({
  src: [
    {
      path: "../public/assets/fonts/DMSans-Regular.ttf",
      weight: "400",
    },
    {
      path: "../public/assets/fonts/DMSans-Medium.ttf",
      weight: "500",
    },
    {
      path: "../public/assets/fonts/DMSans-SemiBold.ttf",
      weight: "600",
    },
    {
      path: "../public/assets/fonts/DMSans-Bold.ttf",
      weight: "700",
    },
  ],
  variable: "--font-dm",
});

export const metadata: Metadata = {
  title: "Blood Donation",
  description: "Blood Donation App",
};

type RootLayoutProps = {
  children: ReactNode;
};
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={`${dm.variable} `}>
        {/* <ComposeProviders
          components={[Com2Provider, InitProvider, Auth2Provider]}
        > */}
        {children}
        {/* </ComposeProviders> */}

        {/* {getMode() === "com" ? (
          <>
            <GoogleAnalytics gaId="G-HC30L40DJS" />
            <CrispWithNoSSR />
          </>
        ) : null} */}
      </body>
    </html>
  );
}
