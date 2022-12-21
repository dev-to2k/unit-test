import React from 'react'

function Form({ handleAddTodo, value, setValue }) {
  const handleSubmit = (e) => {
    e.preventDefault()

    if (value) handleAddTodo(value)
  }

  return (
    <form className='form' data-testid='form' onSubmit={handleSubmit}>
      <label htmlFor='todo'>Enter todo: </label>
      <input
        type='text'
        id='todo'
        value={value}
        className='border rounded py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent'
        placeholder='Enter todo'
        onChange={(e) => setValue(e.target.value)}
      />
    </form>
  )
}

export default Form
