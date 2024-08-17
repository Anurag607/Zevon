import "../src/styles/globals.css";
import type { AppProps } from "next/app";
import { usePathname, useSearchParams } from "next/navigation";
import Cookie from "js-cookie";
import { createContext, useContext, useEffect, useState } from "react";
import styles from "./home/home.module.scss";

const AppContext = createContext(null);

function MyApp({ Component, pageProps }: AppProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleRouteChange = () => {
      setIsLoading(false);
    };

    handleRouteChange();
  }, [pathname, searchParams]);

  return (
    <AppContext.Provider value={{ isLoading, setIsLoading }}>
      {isLoading && (
        <div className={styles["spinner-overlay"]}>
          <div className={styles.spinner}></div>
        </div>
      )}
      <Component {...pageProps} />
    </AppContext.Provider>
  );
}

export { AppContext };
export default MyApp;
