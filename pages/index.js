import React from 'react'
import withData from '../lib/withData'
import App from '../components/App'
import { Image, Icon, Menu } from 'semantic-ui-react'

class Index extends React.Component {
  constructor (props) {
    super(props)
    this.state = {activeItem: 'logo'}
  }

  render () {
    return (<App>
      <Menu inverted size='massive' widths={3}>

        <Menu.Item name='logo'>
          <Image as='a' href={process.env.LOGO_HOME} alt='consert' src='../static/logo.svg' size='tiny' />
        </Menu.Item>

        <Menu.Item name='explore' position='right'>
          <Image alt='explore' src='../static/explore.svg' size='tiny' />
        </Menu.Item>
      </Menu>

    </App>

    )
  }
}

export default withData(Index)
