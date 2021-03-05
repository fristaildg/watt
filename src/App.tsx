import './App.css'
import NoEntriesContainer from './components/NoEntriesContainer'
import Dashboard from './components/Dashboard'
import { useSelector } from 'react-redux'

function App() {
  const { todos } = useSelector((state: any) => state)

  return (
    <div className="App">
      {todos.length > 0 ? <Dashboard /> : <NoEntriesContainer />}
    </div>
  )
}

export default App
