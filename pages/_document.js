import Document, { Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  static getInitialProps ({ renderPage }) {
    // Returns an object like: { html, head, errorHtml, chunks, styles }     
    return renderPage();
  }

  render () {    
    return (
      <html>
        <Head>
          <link rel="manifest" href="static/manifest.json"/>
          <link rel="shortcut icon" href="static/images/icon.png" />
          <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,700" rel="stylesheet"/>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}