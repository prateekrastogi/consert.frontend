import React from 'react'
import stylesheet from 'styles/semantic.min.css'
import Head from 'next/head'
import Cookies from 'universal-cookie'
import Fingerprint from 'fingerprintjs2'

export default class App extends React.Component {
  render () {
    return (
      <main>
        <Head>
          <link rel='stylesheet prefetch' href={process.env.SEMANTIC_UI_ICON_URL} />

          <style dangerouslySetInnerHTML={{__html: stylesheet}} />

          <script dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${process.env.GTM_CODE}');`
          }} />
        </Head>

        <noscript dangerouslySetInnerHTML={{
          __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${process.env.GTM_CODE}"
                    height="0" width="0" style="display:none;visibility:hidden"></iframe>`
        }} />

        <div>
          {this.props.children}
        </div>

      </main>
    )
  }

  componentDidMount () {
    const cookies = new Cookies()

    if (!cookies.get('browserId')) {
      new Fingerprint().get((fingerprint) => {
        cookies.set('browserId', fingerprint, {maxAge: process.env.COOKIE_TTL})
      })
    }
  }
}
