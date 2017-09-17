import React from 'react'
import stylesheet from 'styles/semantic.min.css'
import Head from 'next/head'

export default class App extends React.Component {
  render () {
    return (
      <main>
        <Head>
          <link rel='stylesheet prefetch' href={process.env.SEMANTIC_UI_ICON_URL} />
          <style dangerouslySetInnerHTML={{__html: stylesheet}} />
          <style dangerouslySetInnerHTML={{__html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${process.env.GTM_CODE}');`}} />
        </Head>

        <div>
          {this.props.children}</div>

        <noscript dangerouslySetInnerHTML={{__html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${process.env.GTM_CODE}"
height="0" width="0" style="display:none;visibility:hidden"></iframe>`}} />
      </main>
    )
  }
}
