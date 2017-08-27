import withDataAndRootTheme from '../lib/withData'
import App from '../components/App'
import { Button } from 'semantic-ui-react'

export default withDataAndRootTheme((props) => (
  <App>
    <Button> echo</Button>
  </App>
))
