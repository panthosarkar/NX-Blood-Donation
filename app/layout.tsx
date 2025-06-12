import { ReactNode } from "react";
import localFont from "next/font/local";
import ComposeProviders from "@/bik-lib/lib/ComposeProviders";
import "@/src/styles/styles.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import { getMode } from "@/bik-lib/utils/Env";
import dynamic from "next/dynamic";
import { Metadata, Viewport } from "next";
const CrispWithNoSSR = dynamic(() => import("@/bik-lib/utils/crisp"));

export const poppins = localFont({
  src: [
    {
      path: "../public/assets/fonts/Poppins-Regular.ttf",
      weight: "400",
    },
    {
      path: "../public/assets/fonts/Poppins-Medium.ttf",
      weight: "500",
    },
    {
      path: "../public/assets/fonts/Poppins-SemiBold.ttf",
      weight: "600",
    },
    {
      path: "../public/assets/fonts/Poppins-Bold.ttf",
      weight: "700",
    },
  ],
  variable: "--font-poppins",
});

// Viewport configuration for zoom prevention
// This will generate the <meta name="viewport" ...> tag
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
  maximumScale: 1.0,
  userScalable: false, // This is the key property to prevent user scaling (zoom)
  // or you can use userScalable: 'no'
};

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
      <body className={`${poppins.variable} `}>
        <ComposeProviders components={[]}>{children}</ComposeProviders>

        {getMode() === "com" ? (
          <>
            <GoogleAnalytics gaId="G-HC30L40DJS" />
            <CrispWithNoSSR />
          </>
        ) : null}
      </body>
    </html>
  );
}
