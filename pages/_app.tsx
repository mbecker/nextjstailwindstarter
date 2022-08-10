import "../styles/globals.css";
import type { AppProps } from "next/app";

import Header from "./../components/Header";
import Banner from "./../components/Banner";
import Footer from "../components/Footer";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="page">
      <div className="main mb-12">
        <Header />
        <main className="content container">
          <Component {...pageProps} />
        </main>
      </div>
      {/* <div className="bg-sky-500 h-12 relative bottom-0 -mb-4 shadow-sky-200 shadow origin-center rotate-1 scale-105 skew-x-0 skew-y-0 w-full min-w-min"></div> */}

      <Footer />

      <Banner />
    </div>
  );
}

export default MyApp;
