import withData from '../lib/withData'
import { Icon, Button } from 'semantic-ui-react'
import App from '../components/App'
import Player from '../components/Player'
import '../semantic/dist/components/button.min.css'
import '../semantic/dist/components/icon.min.css'

function About (props) {
  const videoJsOptions = {
    techOrder: ['youtube'], // https://github.com/videojs/video.js/issues/953
    autoplay: false,
    controls: true,
    controlBar: {
      volumePanel: {
        inline: false
      },
      playbackRateMenuButton: false,
      progressControl: false,
      remainingTimeDisplay: false
    },
    muted: true,
    sources: [{
      src: 'https://www.youtube.com/watch?v=jiLkBxw2pbs',
      type: 'video/youtube'
    }]
  }

  return (
    <App>
      <Icon name='.vjs-icon-expand-screen' />
      <Player {...videoJsOptions} />
      <Button>Button</Button>
    </App>
  )
}

export default withData(About)
