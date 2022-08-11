import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import Header from "./../components/Header";
import Banner from "./../components/Banner";
import Footer from "../components/Footer";

import { SessionProvider, signIn, useSession } from "next-auth/react";
import SignIn from "./signin";
import { PocketBaseProvider } from "../lib/PocketBaseProvider";

function SportspocketApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <>
      <Head>
        {/* maximum-scale 1 meta tag need to prevent ios input focus auto zooming */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1 maximum-scale=1"
        />
      </Head>
      <SessionProvider session={pageProps.session} refetchInterval={5 * 60}>
        <PocketBaseProvider>
          <div className="page">
            <AuthGuard>
              <div className="main mb-12">
                <>
                  <Header />
                  <main className="content container pt-16">
                    <Component {...pageProps} />
                  </main>
                </>
              </div>
            </AuthGuard>
            {/* <div className="bg-sky-500 h-12 relative bottom-0 -mb-4 shadow-sky-200 shadow origin-center rotate-1 scale-105 skew-x-0 skew-y-0 w-full min-w-min"></div> */}

            <Footer />
          </div>
        </PocketBaseProvider>
      </SessionProvider>
    </>
  );
}

export function AuthGuard({ children }: { children: JSX.Element }) {
  const { data: session } = useSession();
  const isUser = !!session?.user;

  // useEffect(() => {
  //   if (!initializing) {
  //     //auth is initialized and there is no user
  //     if (!user) {
  //       // remember the page that user tried to access
  //       setRedirect(router.route)
  //       router.push("/signin")
  //     }
  //   }
  // }, [initializing, router, user, setRedirect])

  // if auth initialized with a valid user show protected page
  if (isUser) {
    return <>{children}</>;
  }

  /* otherwise don't return anything, will do a redirect from useEffect */
  return (
    <main className="flex-1 w-full flex flex-col justify-center">
      <SignIn />
    </main>
  );
}

export default SportspocketApp;
