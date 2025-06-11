import type { Metadata } from "next";
import "./../src/styles/style-main.css";
import localFont from "next/font/local";
import ComposeProviders from "@/src/lib/ComposeProviders";
import TemplateProvider from "@/src/contexts/template/TemplateProvider";
// import { InitProvider } from "@/src/contexts/InitProvider";
// import { AuthProvider } from "@/src/contexts/AuthProvider";
import LayoutProvider from "@/src/contexts/LayoutProvider";
import { MainNavbar } from "@/src/shared/navbar/MainNavbar";
import Footer from "@/src/shared/footer/Footer";

const dmSans = localFont({
  display: "swap",
  src: "./../public/assets/fonts/DMSans-VariableFont_opsz,wght.ttf",
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Deshi Alumni",
    default: "Deshi Alumni - Your destination for alumni connections",
  },
  description:
    "Discover the vast opportunities for alumni connections at Deshi Alumni. Reconnect with old friends, build networks, and stay connected with your alumni community.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} !mr-0 !w-full !overflow-y-auto`}>
        <ComposeProviders components={[TemplateProvider, LayoutProvider]}>
          <MainNavbar />
          <main>{children}</main>
          <Footer />
        </ComposeProviders>
      </body>
    </html>
  );
}
