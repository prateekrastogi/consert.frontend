import React from 'react'
import Head from 'next/head'
import Cookies from 'js-cookie'
import cuid from 'cuid'
import Manifest from 'next-manifest/manifest'

export default class App extends React.Component {
  render () {
    return (
      <main>
        <Head>
          <link href='https://fonts.googleapis.com/css?family=Comfortaa|Nunito' rel='stylesheet' />

          <link rel='stylesheet' href='/_next/static/style.css' />

          <Manifest
            // path for manifest that will be deployed
            href='/static/manifest/manifest.json'
            // color for `theme-color`
            themeColor='#F0F0F0'
            // scale for `viewport` meta tag
            initialScale='1'
          />

          <script dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${process.env.GTM_CODE}');`
          }} />
        </Head>
        <noscript
          dangerouslySetInnerHTML={{__html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${process.env.GTM_CODE}"
          height="0" width="0" style="display:none;visibility:hidden;"></iframe>`}} />

        <div>
          {this.props.children}
        </div>

      </main>
    )
  }

  componentDidMount () {
    if (process.browser) {
      window.Fingerprint = require('fingerprintjs2') // In future https://github.com/zeit/next.js/issues/2940
    }
    this.fingerPrintBrowser()
  }

  fingerPrintBrowser () {
    if (!Cookies.get('clientId')) {
      Cookies.set('clientId', cuid(), {expires: (process.env.COOKIE_TTL * 365)})
    }

    if (!Cookies.get('browserId')) {
      new Fingerprint().get((fingerprint) => {
        Cookies.set('browserId', fingerprint, {expires: parseInt(process.env.COOKIE_TTL)})
      })
    }
  }
}
