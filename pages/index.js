import React from 'react'
import withData from '../lib/withData'
import App from '../components/App'
class Index extends React.Component {
  render () {
    return (<App />

    )
  }
}

export default withData(Index)
