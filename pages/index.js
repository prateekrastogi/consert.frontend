import React from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'

const GET_APP_METADATA_TAGS = gql`
query{
  appMetadata {
    appMetadataGetTags {
      edges {
        node
      }
    }
  }
}
`

class Index extends React.Component {
  render () {
    return (
      <Query query={GET_APP_METADATA_TAGS} >
        {({loading, error, data}) => {
          if (loading) return 'Loading...'
          if (error) return `Error! ${error.message}`
          return (<p>{JSON.stringify(data)}</p>)
        }
        }
      </Query>
    )
  }
}

export default Index
