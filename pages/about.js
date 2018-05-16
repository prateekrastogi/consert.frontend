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
      playbackRateMenuButton: false
    },
    muted: true,
    sources: [{
      src: 'https://www.youtube.com/watch?v=OrcVS3s5D34',
      type: 'video/youtube'
    }],
    youtube: { iv_load_policy: 3 }
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
