import React from 'react'

function Modal({
  isOpen,
  setEdit,
  todoSelected,
  setTodoSelected,
  handleUpdateTodo,
}) {
  const handleSubmit = (e) => {
    e.preventDefault()
    handleUpdateTodo(todoSelected)
    setEdit(false)
  }

  if (!isOpen) return null

  return (
    <div
      id='defaultModal'
      data-testid='modal'
      tabIndex={-1}
      aria-hidden='true'
      className='fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full bg-gray-900 bg-opacity-50'
    >
      <div className='relative w-full h-full max-w-2xl md:h-auto mx-auto'>
        <div className='relative bg-white rounded-lg shadow dark:bg-gray-700'>
          <div className='flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600'>
            <h3 className='text-xl font-semibold text-gray-900 dark:text-white'>
              Terms of Service
            </h3>
            <button
              type='button'
              data-testid='close-button'
              className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white'
              data-modal-toggle='defaultModal'
              onClick={() => setEdit(false)}
            >
              <svg
                aria-hidden='true'
                className='w-5 h-5'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                  clipRule='evenodd'
                />
              </svg>
              <span className='sr-only'>Close modal</span>
            </button>
          </div>
          <form onSubmit={handleSubmit} data-testid='form-edit'>
            <div className='p-6'>
              <label htmlFor='todo-edit'>Update todo:</label>
              <input
                type='text'
                id='todo-edit'
                value={todoSelected.title}
                onChange={(e) =>
                  setTodoSelected({ ...todoSelected, title: e.target.value })
                }
                className='w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent'
              />
            </div>
            <div className='flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600'>
              <button
                data-modal-toggle='defaultModal'
                data-testid='save-button'
                type='submit'
                className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
              >
                Save
              </button>
              <button
                data-modal-toggle='defaultModal'
                data-testid='cancel-button'
                type='button'
                className='text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600'
                onClick={() => setEdit(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Modal
