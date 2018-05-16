import React, { Component } from 'react'
import videojs from 'video.js'
import 'videojs-youtube'
import 'video.js/dist/video-js.css'
import './Player.css'
import './videojs-icons.css'

class Player extends Component {
  constructor (props) {
    super(props)
    this.togglePause = this.togglePause.bind(this)
  }

  componentDidMount () {
    // instantiate Video.js
    this.player = videojs(this.videoNode, this.props, function onPlayerReady () {
      console.log('onPlayerReady', this)
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
        <div data-vjs-player onClick={this.togglePause}>
          <video ref={node => (this.videoNode = node)} className='video-js' />
        </div>
      </div>
    )
  }

  togglePause (e) {
    if (this.player.paused()) {
      this.player.play()
    } else {
      this.player.pause()
    }
  }
}

export default Player
