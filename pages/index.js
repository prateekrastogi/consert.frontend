import Link from 'next/link'
import Head from 'next/head'
import React from 'react'
import withData from '../lib/withData'
import App from '../components/App'
import { Popup, Image, Menu, Icon } from 'semantic-ui-react'
import '../semantic/dist/semantic.min.css'

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
          <Popup inverted trigger={<Image alt='consert' src={require('../assets/logo.svg')} size='tiny' />} content='consert' />
        </Menu.Item>

        <Menu.Item name='explore' position='right'>
          <Popup inverted trigger={<Image alt='explore' src='../assets/explore.svg' size='tiny' />} content='explore' />
        </Menu.Item>

      </Menu>
      <Icon name='world' />
    </App>

    )
  }
}

export default withData(Index)
