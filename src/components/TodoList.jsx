function TodoList({ todos, handleRemoveTodo, setEdit, setTodoSelected }) {
  const openModal = (todo) => {
    setEdit(true)
    setTodoSelected(todo)
  }

  if (todos.length === 0) {
    return (
      <p
        data-testid='empty-message'
        className='text-center font-semibold bg-slate-50 rounded p-2 mt-4'
      >
        No todos
      </p>
    )
  }

  return (
    <ul className='space-y-4 mt-4'>
      {todos.map((todo, index) => (
        <li
          key={todo.id}
          className='bg-slate-50 rounded p-2 flex items-center justify-between'
          data-testid='todo-item'
        >
          <span>{todo.title}</span>
          <div className='options'>
            <button
              data-todo-id={index}
              className='rounded bg-green-500 text-white text-sm font-semibold px-2 py-1 transition-colors hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50'
              data-testid='edit-button'
              onClick={() => openModal(todo)}
            >
              edit
            </button>
            <button
              data-todo-id={index}
              className='rounded bg-red-500 text-white text-sm font-semibold px-2 py-1 transition-colors hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50 ml-4'
              data-testid='remove-button'
              onClick={() => handleRemoveTodo(todo.id)}
            >
              remove
            </button>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default TodoList
