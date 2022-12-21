import { useState } from 'react'

export const useTodo = () => {
  const [todos, setTodos] = useState([])

  const handleAddTodo = (value) => {
    setTodos([
      ...todos,
      {
        id: Math.random().toString(36).substr(2, 9),
        title: value,
      },
    ])
  }

  const handleRemoveTodo = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id)
    setTodos(newTodos)
  }

  const handleUpdateTodo = (data) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === data.id) {
        return {
          ...todo,
          title: data.title,
        }
      }
      return todo
    })

    setTodos(newTodos)
  }

  return {
    handleAddTodo,
    todos,
    handleRemoveTodo,
    handleUpdateTodo,
  }
}
