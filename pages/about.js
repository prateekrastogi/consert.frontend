import withData from '../lib/withData'
import { Icon, Button } from 'semantic-ui-react'
import App from '../components/App'
import Player from '../components/Player'
import '../semantic/dist/components/icon.min.css'
import '../semantic/dist/components/button.min.css'

function About (props) {
  const videoJsOptions = {
    techOrder: ['youtube'],
    autoplay: false,
    controls: true,
    controlBar: {
      volumePanel: {
        inline: false
      },
      playbackRateMenuButton: false
    },
    muted: true,
    sources: [{
      src: 'https://www.youtube.com/watch?v=jiLkBxw2pbs',
      type: 'video/youtube'
    }]
  }

  return (
    <App>
      <Icon name='world' />
      <Player {...videoJsOptions} />
      <Button>Button</Button>
    </App>
  )
}

export default withData(About)
