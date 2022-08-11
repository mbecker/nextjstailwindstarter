import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import Header from "./../components/Header";

import Footer from "../components/Footer";

import { SessionProvider, signIn, useSession } from "next-auth/react";
import SignIn from "./signin";
import { PocketBaseProvider } from "../lib/PocketBaseProvider";
import { RealViewportProvider, ViewportHeightBox } from "next-real-viewport";
import { ThemeProvider } from "next-themes";
import { GetServerSideProps, GetStaticProps, NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";

/* eslint-disable */
function SportspocketApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <>
      <ThemeProvider>
        <Head>
          {/* maximum-scale 1 meta tag need to prevent ios input focus auto zooming */}
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1 maximum-scale=1"
          />
        </Head>
        <SessionProvider session={pageProps.session} refetchInterval={5 * 60}>
          <PocketBaseProvider>
            <RealViewportProvider>
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
                <Footer />
              </div>
            </RealViewportProvider>
          </PocketBaseProvider>
        </SessionProvider>
      </ThemeProvider>
    </>
  );
}
/* eslint-enable */

export function AuthGuard({ children }: { children: JSX.Element }) {
  const { data: session } = useSession({
    required: true,
  });
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

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  return {
    props: {
      session: await unstable_getServerSession(req, res, authOptions)
    }
  }
}