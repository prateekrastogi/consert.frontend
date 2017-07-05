/*
 Ignore the warning of graphql-transport-ws
 https://github.com/apollographql/subscriptions-transport-ws/issues/169
*/

import { ApolloClient, createNetworkInterface } from 'react-apollo'
import fetch from 'isomorphic-fetch'
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws'
import ws from 'socket.io-client'

let apolloClient = null

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  global.fetch = fetch
}

function create (initialState) {
  const wsClient = new SubscriptionClient(`ws://api.graph.cool/simple/v1/cixmkt2ul01q00122mksg82pn`, {
    reconnect: true
  }, ws)

  const networkInterface = createNetworkInterface({
    uri: 'https://api.graph.cool/simple/v1/cixmkt2ul01q00122mksg82pn', // Server URL (must be absolute)
    opts: { // Additional fetch() options like `credentials` or `headers`
      credentials: 'same-origin'
    }
  })

  // Extend the network interface with the WebSocket
  const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
    networkInterface,
    wsClient
  )

  return new ApolloClient({
    initialState,
    ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
    networkInterface: networkInterfaceWithSubscriptions
  })
}

export default function initApollo (initialState) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return create(initialState)
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState)
  }

  return apolloClient
}
