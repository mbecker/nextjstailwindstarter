import "../styles/globals.css";
import type { AppProps } from "next/app";

import Header from "./../components/Header";
import Banner from "./../components/Banner";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="page">
      <div className="main mb-12">
        <Header />
        <main className="content container">
          <Component {...pageProps} />
        </main>
      </div>
      <div className="bg-sky-500 h-12 relative bottom-0 -mb-4 shadow-sky-200 shadow origin-center rotate-1 scale-105 skew-x-0 skew-y-0 w-full min-w-min"></div>
      <footer className="z-10 footer py-4 px-4">
        <div className="container sm:flex justify-between">
          <div className="mb-6 sm:mb-0 sm:flex">
            <p>Copyright © 2022 Tailwind Labs Inc.</p>
            <p className="sm:ml-4 sm:pl-4 sm:border-l sm:border-slate-200 dark:sm:border-slate-200/5">
              <a className="link-footer" href="/brand">
                Trademark Policy
              </a>
            </p>
          </div>
          <a
            className="link-footer"
            href="https://github.com/tailwindlabs/tailwindcss.com/edit/master/src/pages/docs/background-color.mdx"
          >
            Edit this page on GitHub
          </a>
        </div>
      </footer>

      <Banner />
    </div>
  );
}

export default MyApp;
