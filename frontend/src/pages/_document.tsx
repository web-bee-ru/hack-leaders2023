import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <title>Web-Bee</title>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="/fonts/Grtsk-Peta-Regular.ttf" rel="stylesheet" />
        <link href="/fonts/Grtsk-Peta-SemiBold.ttf" rel="stylesheet" />
      </Head>
      <body>
        <Main />
        <NextScript />
        <style>{`
          /* Other global styles such as 'html, body' etc... */

          #__next {
            min-height: 100%;
          }
        `}</style>
      </body>
    </Html>
  );
}
