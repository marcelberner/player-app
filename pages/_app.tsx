import "@/styles/globals.scss";
import "@/styles/variables.scss";
import type { AppProps } from "next/app";

import { Provider } from "react-redux";
import store from "../store/index";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </Provider>
  );
}
