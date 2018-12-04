import initApollo from './init-apollo'
import Head from 'next/head'
import { getDataFromTree } from 'react-apollo'
import { parseCookies, setCookie } from 'nookies'
import cuid from 'cuid'

function getCookies(req) {
  return req ? req.headers.cookie : document.cookie
}

export default (App) => {
  return class Apollo extends React.Component {
    static displayName = 'withApollo(App)'
    static async getInitialProps (ctx) {
      const { Component, router, ctx: { req, res } } = ctx

      /* generating cookie and thereby anonymous userId for first load
       if check also ensures that the code block is not triggered on asynchronous first browser render */
      if (!Object.keys(parseCookies(ctx.ctx)).includes('clientId')) {
        const clientId = cuid()

        setCookie(ctx.ctx, 'clientId', clientId, {
          maxAge: process.env.COOKIE_TTL * 365
        })

        req.headers.cookie = `clientId=${clientId};`  //mutating request object header passing generated cookie on first load
      }

      let appProps = {}
      if (App.getInitialProps) {
        appProps = await App.getInitialProps(ctx)
      }

      // Run all GraphQL queries in the component tree
      // and extract the resulting data
      const apollo = initApollo({}, {
        getCookies: () => getCookies(req)
      })

      ctx.ctx.apolloClient = apollo

      if (!process.browser) {
        try {
          // Run all GraphQL queries
          await getDataFromTree(
            <App
              {...appProps}
              Component={Component}
              router={router}
              apolloClient={apollo}
            />
          )
        } catch (error) {
          // Prevent Apollo Client GraphQL errors from crashing SSR.
          // Handle them in components via the data.error prop:
          // http://dev.apollodata.com/react/api-queries.html#graphql-query-data-error
          console.error('Error while running `getDataFromTree`', error)
        }

        // getDataFromTree does not call componentWillUnmount
        // head side effect therefore need to be cleared manually
        Head.rewind()
      }

      // Extract query data from the Apollo store
      const apolloState = apollo.cache.extract()

      return {
        ...appProps,
        apolloState
      }
    }

    constructor (props) {
      super(props)
      this.apolloClient = initApollo(props.apolloState, {
        getCookies: () => getCookies(req)
      })
    }

    render () {
      return <App {...this.props} apolloClient={this.apolloClient} />
    }
  }
}
