import Link from 'next/link'
import Head from 'next/head'
import React from 'react'
import withData from '../lib/withData'
import App from '../components/App'
import Player from '../components/Player'
import { Button } from 'semantic-ui-react'
import '../semantic/dist/components/button.min.css'

class Index extends React.Component {
  render () {
    const videoJsOptions = {
      techOrder: ['youtube'],
      autoplay: false,
      controls: true,
      muted: true,
      sources: [{
        src: 'https://www.youtube.com/watch?v=jiLkBxw2pbs',
        type: 'video/youtube'
      }]
    }

    return (<App>
      <Player {...videoJsOptions} />
      <Button>Button</Button>
    </App>

    )
  }
}

export default withData(Index)
