import Document, { Head, Main, NextScript } from 'next/document'
import css from 'styled-jsx/css'

import styles from '../styles/index.js'

class Doc extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <html>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>WiseD</title>
          <link
            rel="stylesheet"
            href="https://use.fontawesome.com/releases/v5.4.1/css/regular.css"
            integrity="sha384-4e3mPOi7K1/4SAx8aMeZqaZ1Pm4l73ZnRRquHFWzPh2Pa4PMAgZm8/WNh6ydcygU"
            crossorigin="anonymous"
          />
          <link
            rel="stylesheet"
            href="https://use.fontawesome.com/releases/v5.4.1/css/all.css"
            integrity="sha384-5sAR7xN1Nv6T6+dT2mhtzEpVJvfS3NScPQTrOxhwjIuvcA67KV2R5Jz6kr4abQsz"
            crossorigin="anonymous"
          />
          <style jsx global>
            {styles}
          </style>
        </Head>
        <body className="body">
          {this.props.customValue}
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}

export default Doc
