import NewEntry from '../NewEntry'
import { Text, Heading } from '@spark-digital/ignition'
import { CenteredContainer } from '../common'

const NoEntriesContainer = () => {
  return (
    <CenteredContainer>
      <div className="gcse-search"></div>
      <Heading level={2}>Welcome!</Heading>
      <Text>Looks like you have nothing to do yet</Text>
      <br /><br />
      <NewEntry />
    </CenteredContainer>
  )
}

export default NoEntriesContainer
