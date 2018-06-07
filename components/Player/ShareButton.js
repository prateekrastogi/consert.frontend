import videojs from 'video.js'

const Button = videojs.getComponent('Button')

class ShareButton extends Button {
  constructor (player, options) {
    super(player, options)

    this.controlText(player.localize('Share'))
  }

  buildCSSClass () {
    return 'vjs-share-button'
  }
}

videojs.registerComponent('ShareButton', ShareButton)

export default ShareButton
