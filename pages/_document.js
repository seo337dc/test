import Document, { Html, Head, Main, NextScript } from "next/document";

class RootDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta charSet="utf-8" />
          <meta name="description" content="" />
          <meta name="keywords" content="" />
          <link
            rel="shortcut icon"
            href="/img/lotte_fav.png"
            type="image/x-icon"
          />
          <link
            rel="stylesheet"
            href="//cdn.jsdelivr.net/npm/xeicon@2.3.3/xeicon.min.css"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700&display=swap"
            rel="stylesheet"
          />
          <link
            rel="stylesheet"
            href="https://uicdn.toast.com/tui-color-picker/latest/tui-color-picker.min.css"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
          <script type="text/javascript" src="/js/jquery-3.2.1.min.js" />
          <script type="text/javascript" src="/js/cmxg.js" />
          <script type="text/javascript" src="/js/ext.js" />
          <script type="text/javascript" src="/js/rtc.js" />
          <script type="text/javascript" src="/js/index.js" />
        </body>
      </Html>
    );
  }
}

export default RootDocument;
