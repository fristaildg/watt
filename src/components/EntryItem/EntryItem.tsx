import { Collapsible, Text, IconButton } from '@spark-digital/ignition'
import { Todo, deleteTodo } from '../../slices/todos'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'

type ColorMap = {
  [key: number]: string;
}

type EntryItemProps = {
  todo: Todo;
  number: number;
  onEditClick?: (todo: Todo) => void;
  onDeleteClick?: (todo?: Todo) => void;
}

const importanceColorMap: ColorMap = {
  1: '#B3D321',
  2: '#FF9800',
  3: '#E81A0C',
}

const ControlsContainer = styled.div`
  display: flex;
  justify-content: flex-end;

  svg {
    margin: 0 5px;
  }
`

const EntryItem = ({ todo, number, onEditClick, onDeleteClick }: EntryItemProps) => {
  const dispatch = useDispatch()
  const { title, importance, description } = todo
  const color = importanceColorMap[importance.value]

  const handleEditClick = () => {
    if (onEditClick) {
      onEditClick(todo)
    }
  }

  const handleDeleteClick = () => {
    onDeleteClick && onDeleteClick()
    dispatch(deleteTodo(todo))
  }

  return (
    <Collapsible title={title} key={title} number={`${number}`} color={color}>
      <>
        <Text>
          {description ? description : 'No description'} - <span style={{ color }}>
            {importance.label}
          </span>
        </Text>
        <ControlsContainer>
          <IconButton icon='edit' onClick={handleEditClick} size='sm' />
          <IconButton icon='trash' onClick={handleDeleteClick} size='sm' />
        </ControlsContainer>
      </>
    </Collapsible>
  )
}

export default EntryItem
