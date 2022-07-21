import "../styles/globals.css";
import type { AppProps } from "next/app";
import React from "react";
import { ToastContainer } from "react-toastify";
import "rsuite/dist/rsuite.min.css";
import "react-toastify/dist/ReactToastify.css";

import { Hydrate, QueryClient, QueryClientProvider } from "react-query";

// eslint-disable-next-line require-jsdoc
function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Component {...pageProps}>
          <ToastContainer
            position="top-center"
            autoClose={4000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            theme="dark"
          />
        </Component>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;
