import withData from '../lib/withData'
import App from '../components/App'
import { Button } from 'semantic-ui-react'

export default withData((props) => (
  <App>
    <Button> echo</Button>
  </App>
))
