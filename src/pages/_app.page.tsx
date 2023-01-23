import "../lib/dayjs";
import { DefaultSeo } from "next-seo";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";

import "../styles/main.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../lib/react-query";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>
        <DefaultSeo
          openGraph={{
            type: "website",
            locale: "pt_BR",
            url: "https://ignite-cal.com",
            siteName: "Ignite Call",
          }}
        />
        <Component {...pageProps} />
      </SessionProvider>
    </QueryClientProvider>
  );
}
