import App from '../components/App'
import withDataAndRootTheme from '../lib/withDataAndRootTheme'
import styled from 'styled-components'

import SplitViewCommand from 'react-uwp/SplitViewCommand'
import NavigationView from 'react-uwp/NavigationView'

const StyledNavigation = styled(NavigationView)`
     height: 100vh;
     width: 400 !important;
     color: red !important;
`

const StyledSplitViewCommand = styled(SplitViewCommand)`
    width: 100;
`
const navigationTopNodes = [
  <StyledSplitViewCommand  label='Home' icon='Home' visited />
]

export default withDataAndRootTheme((props) => (
  <App>
        <NavigationView style={{height: '100vh', margin: 10}}
                          displayMode="overlay"
                          autoResize={true}
                          background="none"
                          initWidth={100}
                          expandedWidth={200}
                          navigationTopNodes={navigationTopNodes}
                          > </NavigationView>
  </App>
))
