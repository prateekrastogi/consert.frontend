import withData from '../lib/withData'
import { Icon } from 'semantic-ui-react'
import App from '../components/App'
import '../semantic/dist/components/icon.min.css'

function About (props) {
  return (
    <App>
      <Icon name='world' />
    </App>
  )
}

export default withData(About)
