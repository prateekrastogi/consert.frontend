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
      autoplay: true,
      controls: true,
      sources: [{
        src: 'http://vjs.zencdn.net/v/oceans.mp4',
        type: 'video/mp4'
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
