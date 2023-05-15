import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="pl">
      <Head>
        <link rel="stylesheet" href="https://cdn.plyr.io/3.6.8/plyr.css" />
      </Head>
      <body>
        <div id="modal"></div>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
