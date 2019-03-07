import Document, { Head, Main, NextScript } from 'next/document'
import flush from 'styled-jsx/server'

class Doc extends Document {
  static async getInitialProps(ctx) {
    let pageContext
    const page = ctx.renderPage(Component => {
      const WrappedComponent = props => {
        pageContext = props.pageContext
        return <Component {...props} />
      }

      return WrappedComponent
    })

    let css
    // It might be undefined, e.g. after an error.
    if (pageContext) {
      css = pageContext.sheetsRegistry.toString()
    }

    return {
      ...page,
      pageContext,
      // Styles fragment is rendered after the app and page rendering finish.
      styles: (
        <React.Fragment>
          <style
            id="jss-server-side"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: css }}
          />
          {flush() || null}
        </React.Fragment>
      )
    }
  }

  render() {
    const { pageContext } = this.props
    return (
      <html>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          {/* PWA primary color */}
          <meta
            name="theme-color"
            content={pageContext ? pageContext.theme.palette.primary.main : null}
          />
          <link
            rel="stylesheet"
            href="https://use.fontawesome.com/releases/v5.4.1/css/regular.css"
            integrity="sha384-4e3mPOi7K1/4SAx8aMeZqaZ1Pm4l73ZnRRquHFWzPh2Pa4PMAgZm8/WNh6ydcygU"
            crossOrigin="anonymous"
          />
          <link
            rel="stylesheet"
            href="https://use.fontawesome.com/releases/v5.4.1/css/all.css"
            integrity="sha384-5sAR7xN1Nv6T6+dT2mhtzEpVJvfS3NScPQTrOxhwjIuvcA67KV2R5Jz6kr4abQsz"
            crossOrigin="anonymous"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Open+Sans:400,700,800"
          />
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
          <style jsx global>
            {`
              * {
                z-index: 0;
                outline: none;
              }

              html {
                margin: 0px;
                padding: 0px;
              }

              body {
                font-size: 18px;
                font-family: Open Sans, sans-serif;
                font-weight: 400;
                color: #333;
                background: white;
                margin: 0px;
                line-height: 2;
              }

              h1,
              h2,
              h3,
              h4,
              h5 {
                line-height: normal;
              }

              [contenteditable='true']:empty:before {
                content: attr(placeholder);
                display: block;
                color: #aaa;
              }

              .wrapper {
                max-width: 960px;
                margin-left: auto;
                margin-right: auto;
                padding-right: 16px;
                padding-left: 16px;
              }

              .cell {
                display: flex;
                flex: 1;
                padding: 16px;
                flex-direction: column;
                align-items: center;
              }

              /* Collection default theme */

              .ReactVirtualized__Collection {
              }

              .ReactVirtualized__Collection__innerScrollContainer {
              }

              /* Grid default theme */

              .ReactVirtualized__Grid {
              }

              .ReactVirtualized__Grid__innerScrollContainer {
              }

              /* Table default theme */

              .ReactVirtualized__Table {
              }

              .ReactVirtualized__Table__Grid {
              }

              .ReactVirtualized__Table__headerRow {
                font-weight: 700;
                text-transform: uppercase;
                display: flex;
                flex-direction: row;
                align-items: center;
              }
              .ReactVirtualized__Table__row {
                display: flex;
                flex-direction: row;
                align-items: center;
              }

              .ReactVirtualized__Table__headerTruncatedText {
                display: inline-block;
                max-width: 100%;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
              }

              .ReactVirtualized__Table__headerColumn,
              .ReactVirtualized__Table__rowColumn {
                margin-right: 10px;
                min-width: 0px;
                text-align: center;
              }
              .ReactVirtualized__Table__rowColumn {
                text-overflow: ellipsis;
                white-space: nowrap;
              }

              .ReactVirtualized__Table__headerColumn:first-of-type,
              .ReactVirtualized__Table__rowColumn:first-of-type {
                margin-left: 10px;
              }
              .ReactVirtualized__Table__sortableHeaderColumn {
                cursor: pointer;
              }

              .ReactVirtualized__Table__sortableHeaderIconContainer {
                display: flex;
                align-items: center;
              }
              .ReactVirtualized__Table__sortableHeaderIcon {
                flex: 0 0 24px;
                height: 1em;
                width: 1em;
                fill: currentColor;
              }

              .ReactVirtualized__Table__headerTruncatedText {
                display: inline;
                width: auto;
                white-space: normal;
                text-overflow: clip;
                overflow: auto;
              }

              /* List default theme */

              .ReactVirtualized__List {
              }
            `}
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
