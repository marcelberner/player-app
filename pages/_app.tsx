import "@/styles/globals.scss";
import "@/styles/variables.scss";
import type { AppProps } from "next/app";

import { Provider as StoreProvider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import store from "../store/index";
import { QueryClient, QueryClientProvider } from "react-query";

import Head from "next/head";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://cdn.plyr.io/3.6.8/plyr.css" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <StoreProvider store={store}>
        <SessionProvider session={pageProps.session}>
          <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />
          </QueryClientProvider>
        </SessionProvider>
      </StoreProvider>
    </>
  );
}
