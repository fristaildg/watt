import React, { useEffect, useReducer, useState } from 'react'
import { Modal, Heading, Text, TextInput, TextareaInput, Select } from '@spark-digital/ignition'
import { Todo } from '../../slices/todos'

type EntryModalProps = {
  modalProps: {
    visible: boolean;
    [key: string]: any;
  };
  values?: Todo;
  onSubmitValues: (state: Todo) => void;
}

type Importance = {
  value: number;
  label: string;
}

const importanceOptions = [
  {value: 1, label: 'Not important'},
  {value: 2, label: 'Kinda important'},
  {value: 3, label: 'Very important!!'}
]

const initialState = {
  importance: importanceOptions[0],
  title: '',
  description: '',
}

const reducer = (state: Todo, action: any) => {
  switch (action.type) {
    case 'addImportance': 
      const importance = action.payload
      return { ...state, importance }
    case 'addTitle':
      const title = action.payload
      return { ...state, title }
    case 'addDescription':
      const description = action.payload
      return { ...state, description }
    case 'clearState':
      return initialState
    case 'updateState':
      return action.payload
    default:
      return state
  }
}

const EntryModal = ({modalProps, values, onSubmitValues}: EntryModalProps) => {
  const [state, dispatch] = useReducer(reducer, values || initialState)
  const [invalidInput, setInvalidInput] = useState<string[]>([])

  useEffect(() => {
    dispatch({type: 'updateState', payload: values})
  }, [values])

  const handlePrimaryClick = () => {
    const isValidForm = state?.importance && state?.title

    if (isValidForm) {
      onSubmitValues(state)
      dispatch({type: 'clearState'})
      modalProps.hideModal()
    } else {
      if (!state?.importance) setInvalidInput((prevState) => [...prevState, 'importance'])
      if (!state?.title) setInvalidInput((prevState) => [...prevState, 'title'])
    }
  }

  const setImportance = (event: Importance) => {
    dispatch({
      type: 'addImportance',
      payload: event,
    })
  }

  const setTitle = (event: React.FormEvent<HTMLInputElement>) => {
    dispatch({
      type: 'addTitle',
      payload: event?.currentTarget?.value,
    })
  }

  const setDescription = (event: React.FormEvent<HTMLInputElement>) => {
    dispatch({
      type: 'addDescription',
      payload: event?.currentTarget?.value,
    })
  }

  const validationProps = (inputLabel: string) => {
    if (invalidInput.indexOf(inputLabel) !== -1) {
      return {
        hasError: true,
        helperText: 'This field is required'
      }
    }
    return {}
  }

  return (
    <Modal
      preventCloseOnAction
      closeOnClickOutside
      primaryAction='Add'
      onPrimaryClick={handlePrimaryClick}
      {...modalProps}
    >
      <Heading level={2}>New Entry</Heading>
      <Text>Add a title and a description</Text>
      <Select
        label='Importance'
        options={importanceOptions}
        onChange={setImportance}
        {...validationProps('importance')}
      />
      <TextInput
        label='Title'
        value={state?.title}
        onChange={setTitle}
        {...validationProps('title')}
      />
      <TextareaInput
        label='Description'
        value={state?.description}
        onChange={setDescription}
      />
    </Modal>
  )
}

export default EntryModal
