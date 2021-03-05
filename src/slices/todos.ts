import { createSlice } from '@reduxjs/toolkit'

export type Todo = {
  title: string;
  description?: string;
  importance: {
    value: number;
    label: string;
  };
}

const initialState: Todo[] = []

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo(state, action) {
      const { title } = action.payload
      const todoAlreadyExists = state.map((todo: Todo) => todo.title).indexOf(title) !== -1

      if (!todoAlreadyExists) {
        state.push(action.payload)
      }
    },
    updateTodo(state, action) {
      const todoIndex = state.findIndex((todo: Todo) => todo.title === action.payload.currentValues.title)

      state[todoIndex] = action.payload.newValues
    },
    deleteTodo(state, action) {
      const todoIndex = state.findIndex((todo: Todo) => todo.title === action.payload.title)

      state.splice(todoIndex, 1)
    }
  }
})

export const { addTodo, updateTodo, deleteTodo } = todosSlice.actions
export default todosSlice.reducer
