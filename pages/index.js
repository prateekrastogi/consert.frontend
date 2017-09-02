import React from 'react'
import withData from '../lib/withData'
import App from '../components/App'
import { Sidebar, Menu } from 'semantic-ui-react'

class Index extends React.Component {
  render () {
    return (<App>
      <Sidebar as={Menu} animation='overlay' width='thin' visible icon='labeled' vertical inverted>
        <Menu.Item name='' />
      </Sidebar>
    </App>
    )
  }
}

export default withData(Index)
