import React from "react";
import Head from "next/head";
import type { AppProps } from "next/app";
import "./App.global.scss";
import "antd/dist/antd.css";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <React.Fragment>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <Component {...pageProps} />
    </React.Fragment>
  );
}
