import React from 'react'
import PropTypes from 'prop-types'
import { ApolloProvider, getDataFromTree } from 'react-apollo'
import initApollo from './initApollo'

import { Theme as UWPThemeProvider, getTheme } from 'react-uwp/Theme'


// Gets the display name of a JSX component for dev tools
function getComponentDisplayName (Component) {
  return Component.displayName || Component.name || 'Unknown'
}

export default ComposedComponent => {
  return class WithData extends React.Component {
    static displayName = `WithData(${getComponentDisplayName(ComposedComponent)})`
    static propTypes = {
      serverState: PropTypes.object.isRequired
    }

    static async getInitialProps (ctx) {
      const { req } = ctx
      const userAgent = req ? req.headers['user-agent'] : navigator.userAgent
      let serverState = {}

      // Evaluate the composed component's getInitialProps()
      let composedInitialProps = {}
      if (ComposedComponent.getInitialProps) {
        composedInitialProps = await ComposedComponent.getInitialProps(ctx)
      }

      // Run all GraphQL queries in the component tree
      // and extract the resulting data
      if (!process.browser) {
        const apollo = initApollo()
        // Provide the `url` prop data in case a GraphQL query uses it
        const url = {query: ctx.query, pathname: ctx.pathname}

        try {
          // Run all GraphQL queries
          await getDataFromTree(
            <ApolloProvider client={apollo}>
              <ComposedComponent url={url} {...composedInitialProps} />
            </ApolloProvider>
          )
        } catch (error) {
          // Prevent Apollo Client GraphQL errors from crashing SSR.
          // Handle them in components via the data.error prop:
          // http://dev.apollodata.com/react/api-queries.html#graphql-query-data-error
        }

        // Extract query data from the Apollo store
        const state = apollo.getInitialState()

        serverState = {
          apollo: {
            // Only include the Apollo data state
            data: state.data
          }
        }
      }

      return {
        userAgent,
        serverState,
        ...composedInitialProps
      }
    }

    constructor (props) {
      super(props)
      this.apollo = initApollo(this.props.serverState)
    }

    render () {
      return (
        <ApolloProvider client={this.apollo}>
          <UWPThemeProvider
            theme={getTheme({
              themeName: 'dark',
              accent: '#0078D7',
              useFluentDesign: true,
              userAgent: this.props.userAgent
            })}>
          <ComposedComponent {...this.props}/>
          </UWPThemeProvider>
        </ApolloProvider>
      )
    }
  }
}