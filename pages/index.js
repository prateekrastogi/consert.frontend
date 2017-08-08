import App from '../components/App'
import Header from '../components/Header'
import Submit from '../components/Submit'
import PostList from '../components/PostList'
import withData from '../lib/withData'
import styled from 'styled-components'

const Title = styled.h1`
  color: red;
  font-size: 50px;
`

export default withData((props) => (
  <App>
    <Title>My page</Title>
    <Header pathname={props.url.pathname} />
    <Submit />
    <PostList />
  </App>
))
