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

  handleClick (e) {
    if (e.target.className === 'vjs-icon-placeholder') {
      e.stopPropagation()
      /* global MouseEvent */
      const event = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true
      })
      const element = this.el()

      element.dispatchEvent(event)
    }
  }
}

videojs.registerComponent('ShareButton', ShareButton)

export default ShareButton
