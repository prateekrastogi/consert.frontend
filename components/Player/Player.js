import React, { Component } from 'react'
import videojs from 'video.js'
import './ShareButton'
import 'video.js/dist/video-js.min.css'
import './Player.css'
import './videojs-icons.css'

class Player extends Component {
  constructor (props) {
    super(props)

    this.eventDispatcher = this.eventDispatcher.bind(this)
  }

  componentDidMount () {
    // instantiate video.js
    this.player = videojs(this.videoNode, this.props, function onPlayerReady () {
      console.log('onPlayerReady', this)
    })

    this.player.addChild('ShareButton', {})

    // initializing video.js plugins
    require('videojs-youtube')
    require('videojs-landscape-fullscreen')

    // configuring plugins
    this.player.landscapeFullscreen({
      fullscreen: {
        enterOnRotate: true,
        alwaysInLandscapeMode: true,
        iOS: true
      }
    })
  }

  // destroy player on unmount
  componentWillUnmount () {
    if (this.player) {
      this.player.dispose()
    }
  }

  // wrap the player in a div with a `data-vjs-player` attribute
  // so videojs won't create additional wrapper in the DOM
  // see https://github.com/videojs/video.js/pull/3856
  render () {
    return (
      <div>
        <div data-vjs-player onClick={this.eventDispatcher}>
          <video ref={node => (this.videoNode = node)} className='video-js vjs-big-play-centered' />
        </div>
      </div>
    )
  }

  eventDispatcher (event) {
    this.togglePause(event)
  }

  togglePause (e) {
    console.log(e.target.className)
    if (e.target.className.includes('vjs-workinghover')) {
      this.player.paused() ? this.player.play() : this.player.pause()
    }
  }
}

export default Player
