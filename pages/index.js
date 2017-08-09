import App from '../components/App'
import Header from '../components/Header'
import Submit from '../components/Submit'
import PostList from '../components/PostList'
import withDataAndRootTheme from '../lib/withDataAndRootTheme'
import styled from 'styled-components'
import Button from 'react-uwp/Button'
import { Flex, Box } from 'grid-styled'

const StyledButton = styled(Button)`
  font-size: 50px;
  color: red !important;
  background: blue !important;
`

export default withDataAndRootTheme((props) => (
  <App>
    <Flex>
      <Box width={[
        1/2
      ]} px={2}>
        <StyledButton icon='RatingStarFillZeroWidthLegacy' tooltip='click here'>Button </StyledButton>
      </Box>
      <Box width={[
        1/2,
        1/3,
        1/4,
        1/6
      ]} px={2}>
        <StyledButton icon='RatingStarFillZeroWidthLegacy' tooltip='click here'>Button </StyledButton>
        <Header pathname={props.url.pathname} />
        <Submit />
        <PostList />
      </Box>
    </Flex>
  </App>
))
