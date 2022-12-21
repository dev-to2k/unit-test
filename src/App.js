import { useState } from 'react'
import './App.css'
import Form from './components/Form'
import Modal from './components/Modal'
import TodoApp from './components/TodoApp'
import TodoList from './components/TodoList'
import { useTodo } from './hooks/useTodo'

function App() {
  const [edit, setEdit] = useState(false)
  const [todoSelected, setTodoSelected] = useState({
    id: '',
    title: '',
  })

  const [value, setValue] = useState('')

  const { todos, handleAddTodo, handleRemoveTodo, handleUpdateTodo } = useTodo()

  return (
    <TodoApp>
      <Form handleAddTodo={handleAddTodo} value={value} setValue={setValue} />
      <TodoList
        todos={todos}
        handleRemoveTodo={handleRemoveTodo}
        setEdit={setEdit}
        setTodoSelected={setTodoSelected}
      />
      <Modal
        isOpen={edit}
        setEdit={setEdit}
        todoSelected={todoSelected}
        setTodoSelected={setTodoSelected}
        handleUpdateTodo={handleUpdateTodo}
      />
    </TodoApp>
  )
}

export default App
