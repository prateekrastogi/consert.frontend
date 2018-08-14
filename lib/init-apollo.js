import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost'
import { setContext } from 'apollo-link-context'
import fetch from 'isomorphic-unfetch'

let apolloClient = null

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  global.fetch = fetch
}

function create (initialState, options) {
  const {getCookies} = options

  const authLink = setContext((_, { headers }) => {
    const cookies = getCookies()

    return {
      headers: {
        'Cookie': cookies
      }
    }
  })

  return new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
    link: authLink.concat(new HttpLink({
      uri: process.env.GRAPHQL_ENDPOINT, // Server URL (must be absolute)
      credentials: 'include' // Additional fetch() options like `credentials` or `headers`
    })),
    cache: new InMemoryCache().restore(initialState || {})
  })
}

export default function initApollo (initialState, options) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return create(initialState, options)
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState, options)
  }

  return apolloClient
}
