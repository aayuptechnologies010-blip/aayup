import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Outfit } from "next/font/google";
import "@/index.css";
import "@/performance-optimizations.css";
import { Providers } from "@/components/Providers";
import InitialLoader from "@/components/InitialLoader";
import PageTransitionLoader from "@/components/PageTransitionLoader";
import ScrollProgressBar from "@/components/ui/ScrollProgressBar";
import JsonLdSchema from "@/components/seo/JsonLdSchema";
import SmoothScrollToTop from "@/components/SmoothScrollToTop";
import { constructMetadata } from "@/lib/seo";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = constructMetadata();

export const viewport: Viewport = {
  themeColor: "#0066cc",
  width: "device-width",
  initialScale: 1,
};

import Script from "next/script";
import FloatingContactButtons from "@/components/ui/FloatingContactButtons";
import RecentActivityToast from "@/components/ui/RecentActivityToast";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${plusJakarta.variable} ${outfit.variable}`}>
      <head>
        <JsonLdSchema />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased selection:bg-primary/20 selection:text-primary">
        <Providers>
          <SmoothScrollToTop />
          <InitialLoader />
          <PageTransitionLoader />
          <ScrollProgressBar />
          {children}
          <RecentActivityToast />
          <FloatingContactButtons />
        </Providers>

        {/* Official Tawk.to Live Chat Script */}
        <Script
          id="tawk-to-script"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
              (function(){
              var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
              s1.async=true;
              s1.src='https://embed.tawk.to/6ad21b4577e5de34c612ad6f/1k52bl2m1';
              s1.charset='UTF-8';
              s1.setAttribute('crossorigin','*');
              s0.parentNode.insertBefore(s1,s0);
              })();
            `,
          }}
        />
      </body>
    </html>
  );
}
