import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
      <script src="https://cdn.tailwindcss.com"></script>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Courgette" />
      
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto+Condensed" />
      
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
