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
          <title>Coding-bear Next/express Boilerplate</title>
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