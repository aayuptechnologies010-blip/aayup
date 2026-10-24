import type { AppProps } from "next/app";
import "@/index.css";
import "@/performance-optimizations.css";
import { Providers } from "@/components/Providers";
import ScrollProgressBar from "@/components/ui/ScrollProgressBar";
import Script from "next/script";
import FloatingContactButtons from "@/components/ui/FloatingContactButtons";
import RecentActivityToast from "@/components/ui/RecentActivityToast";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <ScrollProgressBar />
      <Component {...pageProps} />
      <RecentActivityToast />
      <FloatingContactButtons />

      {/* Official Tawk.to Live Chat Script */}
      <Script
        id="tawk-to-script-pages"
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
    </Providers>
  );
}
