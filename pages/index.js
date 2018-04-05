import Link from 'next/link'
import Head from 'next/head'
import React from 'react'
import withData from '../lib/withData'
import App from '../components/App'
import { Button } from 'semantic-ui-react'
import '../semantic/dist/components/button.min.css'

class Index extends React.Component {
  render () {
    return (<App>
      <Button>Button</Button>
    </App>

    )
  }
}

export default withData(Index)
