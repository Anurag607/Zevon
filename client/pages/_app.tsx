import "../src/styles/globals.css";
import React from "react";
import type { AppProps } from "next/app";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import Cookie from "js-cookie";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  React.useEffect(() => {
    const handleRouteChange = () => {
      Cookie.remove("selectedParams", { path: "" });
    };

    // Trigger the cookie removal on route change
    handleRouteChange();
  }, [pathname, searchParams]);

  return <Component {...pageProps} />;
}

export default MyApp;
