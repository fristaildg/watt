import { useState } from 'react'
import { Accordion, useModal, Alert, useAlert } from '@spark-digital/ignition'
import { CenteredContainer } from '../common'
import Header from '../Header'
import { useSelector } from 'react-redux'
import { Todo } from '../../slices/todos'
import EntryModal from '../EntryModal'
import EntryItem from '../EntryItem'
import { useDispatch } from 'react-redux'
import { updateTodo } from '../../slices/todos'
import _ from 'lodash';
import { Button } from '@material-ui/core'

const Dashboard = () => {
  const { todos } = useSelector((state: any) => state)
  const { showModal, ...modalProps } = useModal()
  // @ts-ignore
  const [ todoValues, setTodoValues ] = useState<Todo>()
  const dispatch = useDispatch()
  const { showAlert: showEditAlert, ...editAlertProps } = useAlert()
  const { showAlert: showDeleteAlert, ...deleteAlertProps } = useAlert()

  const showEditModal = (todo: Todo) => {
    setTodoValues(todo)
    showModal()
  }

  const handleSubmitValues = (newValues: Todo) => {
    dispatch(updateTodo({newValues, currentValues: todoValues}))
    showEditAlert(true)
  }

  return (
    <>
      <Header />
      <CenteredContainer>
        <Accordion>
          {todos.map((todo: Todo, index: number) => {
            const itemNumber = index + 1

            return (
              <>
                <EntryItem todo={todo} number={itemNumber} onEditClick={showEditModal} onDeleteClick={showDeleteAlert} />
                <Button>Click something</Button>
              </>
            )
          })}
        </Accordion>
      </CenteredContainer>
      <EntryModal modalProps={modalProps} values={todoValues} onSubmitValues={handleSubmitValues} />
      <Alert {...editAlertProps} message='The task was updated right nowwwwwwwawfaf by a person' intent='success' />
      <Alert {...deleteAlertProps} message='The task was deleted' intent='info' />
    </>
  )
}

export default Dashboard
