import React from 'react'
import withData from '../lib/withData'
import App from '../components/App'
import { Dimmer, Popup, Image, Menu } from 'semantic-ui-react'
import Link from 'next/link'

class Index extends React.Component {
  constructor (props) {
    super(props)
    this.state = {active: false}
  }

  render () {
    const { active } = this.state
    return (<App>
      <Menu inverted size='massive' widths={3}>

        <Menu.Item name='logo'>
          <Popup inverted trigger={<Image alt='consert' src='../static/logo.svg' size='tiny' />} content='consert' />
        </Menu.Item>

        <Menu.Item name='explore' position='right'>
          <Popup inverted trigger={<Image alt='explore' src='../static/explore.svg' size='tiny' />} content='explore' />
        </Menu.Item>

      </Menu>
    </App>

    )
  }
}

export default withData(Index)
