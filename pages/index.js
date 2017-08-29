import React from 'react'
import withData from '../lib/withData'
import App from '../components/App'
import { Button } from 'semantic-ui-react'

class Index extends React.Component {
  render () {
    return (<App>
      <Button> echo</Button>
    </App>)
  }
}

export default withData(Index)
