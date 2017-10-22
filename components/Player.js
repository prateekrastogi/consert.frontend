import React from 'react'
import ReactPlayer from 'react-player'

export default class Player extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  render () {
    return (<ReactPlayer volume={1} {...this.props} />)
  }
}
