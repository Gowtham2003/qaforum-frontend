import "../styles/globals.css";
import type { AppProps } from "next/app";
import UserContext, { UserProvider } from "../components/userContext";
import { useEffect } from "react";
import Nav from "../components/nav";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Nav />
      <Component {...pageProps} />
    </UserProvider>
  );
}
