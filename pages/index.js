import React from 'react'
import withData from '../lib/withData'
import App from '../components/App'
import {Sidebar, Menu, Icon} from 'semantic-ui-react'
import Player from '../components/Player'

class Index extends React.Component {
  render () {
    return (<App>
      <Sidebar as={Menu} animation='overlay' width='thin' visible icon='labeled' vertical inverted>
        <Menu.Item name='home'>
          <Icon name='home' />
            Home
        </Menu.Item>
        <Menu.Item name='gamepad'>
          <Icon name='gamepad' />
            Games
        </Menu.Item>
        <Menu.Item name='camera'>
          <Icon name='camera' />
            Channels
        </Menu.Item>
      </Sidebar>
      <Player url='https://www.youtube.com/watch?v=uth-8cr4XFc' muted />
    </App>

    )
  }
}

export default withData(Index)
