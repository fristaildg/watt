import React from 'react'
import { useModal, Button, useAlert, Alert } from '@spark-digital/ignition'
import EntryModal from '../EntryModal'
import { addTodo, Todo } from '../../slices/todos'
import { useDispatch } from 'react-redux'

const NewEntry = () => {  
  const { showModal, ...modalProps } = useModal()
  const { showAlert, ...alertProps } = useAlert()
  const dispatch = useDispatch()

  const handleSubmitValues = (values: Todo) => {
    dispatch(addTodo(values))
    showAlert()
  }

  return (
    <>
      <Button label='Add Entry' onClick={showModal} />
      <EntryModal modalProps={modalProps} onSubmitValues={handleSubmitValues} />
      <Alert {...alertProps} message='The task was added succesfully!' isClearable intent='success' isPermanent />
    </>
  )
}

export default NewEntry
