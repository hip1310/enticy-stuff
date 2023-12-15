import React from "react";
import { UserProvider } from "@auth0/nextjs-auth0/client";

import Header from "../components/Header";
import Footer from "../components/Footer";
import "./globals.css";
import Head from "next/head";

export default function App({ Component, pageProps }: any) {
  return (
    <UserProvider>
      <Header />
      <Head>
        <title>Enticy Stuff</title>
        <link rel="icon" href="/enticy-stuff.jpeg" />
      </Head>
      <Component {...pageProps} />
      <Footer />
    </UserProvider>
  );
}
