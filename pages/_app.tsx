import "../styles/globals.css";
import type { AppProps } from "next/app";
import React from "react";
import { ToastContainer } from "react-toastify";
import "rsuite/dist/rsuite.min.css";
import "react-toastify/dist/ReactToastify.css";

// import { CustomProvider, Button } from "rsuite";

// eslint-disable-next-line require-jsdoc
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* <CustomProvider theme="dark"> */}
      <Component {...pageProps} />
      {/* </CustomProvider> */}
      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        theme="light"
      />
    </>
  );
}

export default MyApp;
