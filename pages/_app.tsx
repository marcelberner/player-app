import "@/styles/globals.scss";
import "@/styles/variables.scss";
import type { AppProps } from "next/app";

import { Provider as StoreProvider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import store from "../store/index";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider store={store}>
      <SessionProvider session={pageProps.session}>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </SessionProvider>
    </StoreProvider>
  );
}
