import { Icon, Button } from 'semantic-ui-react'
import Player from '../components/PlayerCard/Player/Player'
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
    youtube: { iv_load_policy: 3 },
    enablePrivacyEnhancedMode: true
  }

  return (
    <div>
      <Icon name='world' />
      <Player {...videoJsOptions} />
      <Button>Button</Button>
    </div>
  )
}

export default About
