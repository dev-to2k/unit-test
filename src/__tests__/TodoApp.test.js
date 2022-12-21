/* eslint-disable testing-library/no-unnecessary-act */
import { fireEvent, render, screen } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import Form from '../components/Form'
import Modal from '../components/Modal'
import TodoApp from '../components/TodoApp'
import TodoList from '../components/TodoList'

const mockInitialTodos = []
const mockFunction = {
  setEdit: jest.fn(),
  setTodoSelected: jest.fn(),
  handleRemoveTodo: jest.fn(),
  handleUpdateTodo: jest.fn(),
  setValue: jest.fn(),
  handleAddTodo: jest.fn(),
}

describe('TodoApp', () => {
  it('renders a form and a TodoList', () => {
    render(
      <TodoApp>
        <Form />
        <TodoList todos={mockInitialTodos} />
      </TodoApp>
    )
    const list = screen.queryAllByTestId('todo-item')

    expect(screen.getByLabelText('Enter todo:')).toBeInTheDocument()

    expect(list).toHaveLength(0)

    const message = screen.getByText(/No todos/)
    expect(message).toBeInTheDocument()
  })

  it('adds a todo when the form is submitted', () => {
    const { rerender } = render(
      <TodoApp>
        <Form value='' {...mockFunction} />
        <TodoList todos={mockInitialTodos} />
      </TodoApp>
    )

    const input = screen.getByLabelText(/Enter todo/)
    fireEvent.change(input, { target: { value: 'Test todo' } })
    input.value = 'Test todo'

    const form = screen.queryByTestId('form')
    fireEvent.submit(form)

    const newTodo = { id: '1', title: input.value }

    const newListTodos = [...mockInitialTodos, newTodo]

    rerender(
      <TodoApp>
        <Form value='' {...mockFunction} />
        <TodoList todos={newListTodos} />
      </TodoApp>
    )

    expect(screen.getByText('Test todo')).toBeInTheDocument()
  })

  it('does not add a todo when the form is submitted with an empty value', () => {
    render(
      <TodoApp>
        <Form handleAddTodo={mockFunction.handleAddTodo} />
        <TodoList todos={mockInitialTodos} />
      </TodoApp>
    )

    const input = screen.getByLabelText(/Enter todo/)
    fireEvent.change(input, { target: { value: '' } })

    const form = screen.queryByTestId('form')
    fireEvent.submit(form)

    expect(mockFunction.handleAddTodo).not.toHaveBeenCalled()
  })

  it('updates a todo when the update button is clicked', () => {
    let isOpen = false

    const { rerender } = render(
      <TodoApp>
        <Form value='' {...mockFunction} />
        <TodoList todos={mockInitialTodos} {...mockFunction} />
        <Modal isOpen={isOpen} {...mockFunction} />
      </TodoApp>
    )

    const input = screen.getByLabelText(/Enter todo/)
    fireEvent.change(input, { target: { value: 'Test todo' } })
    expect(mockFunction.setValue).toHaveBeenCalled()

    input.value = 'Test todo'

    rerender(
      <TodoApp>
        <Form value={input.value} {...mockFunction} />
        <TodoList todos={mockInitialTodos} {...mockFunction} />
        <Modal isOpen={isOpen} {...mockFunction} />
      </TodoApp>
    )

    const form = screen.queryByTestId('form')
    fireEvent.submit(form)

    expect(mockFunction.handleAddTodo).toHaveBeenCalled()

    const mockTodos = [
      {
        id: '1',
        title: input.value,
      },
    ]

    rerender(
      <TodoApp>
        <Form value={input.value} {...mockFunction} />
        <TodoList todos={mockTodos} {...mockFunction} />
        <Modal isOpen={isOpen} {...mockFunction} />
      </TodoApp>
    )

    const buttonEdit = screen.getByTestId('edit-button')
    fireEvent.click(buttonEdit)

    expect(mockFunction.setEdit).toHaveBeenCalledWith(true)

    const todoId = buttonEdit.getAttribute('data-todo-id')
    const todoSelected = mockTodos[todoId]

    isOpen = true

    rerender(
      <TodoApp>
        <Form value='' {...mockFunction} />
        <TodoList todos={mockTodos} {...mockFunction} />
        <Modal isOpen={isOpen} todoSelected={todoSelected} {...mockFunction} />
      </TodoApp>
    )

    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      const input = screen.getByLabelText(/Update todo/)
      fireEvent.change(input, { target: { value: 'Test todo updated' } })
      input.value = 'Test todo updated'

      const newTodos = mockTodos.map((todo) => {
        if (todo.id === todoSelected.id) {
          return {
            ...todo,
            title: input.value,
          }
        }
        return todo
      })

      const buttonSave = screen.getByTestId('save-button')
      fireEvent.click(buttonSave)

      expect(mockFunction.setEdit).toHaveBeenCalledWith(false)
      expect(mockFunction.handleUpdateTodo).toHaveBeenCalled()

      isOpen = false

      rerender(
        <TodoApp>
          <Form value='' {...mockFunction} />
          <TodoList todos={newTodos} {...mockFunction} />
          <Modal isOpen={isOpen} />
        </TodoApp>
      )
    })

    expect(screen.getByText('Test todo updated')).toBeInTheDocument()
  })

  it('click close button modal, modal is closed', () => {
    let isOpen = true

    const mockTodoSelected = {
      id: '1',
      title: 'Test todo',
    }

    const { rerender } = render(
      <TodoApp>
        <Form value='' {...mockFunction} />
        <TodoList todos={mockInitialTodos} {...mockFunction} />
        <Modal
          isOpen={isOpen}
          todoSelected={mockTodoSelected}
          {...mockFunction}
        />
      </TodoApp>
    )

    const buttonClose = screen.getByTestId('close-button')
    fireEvent.click(buttonClose)

    expect(mockFunction.setEdit).toHaveBeenCalledWith(false)

    isOpen = false

    rerender(
      <TodoApp>
        <Form value='' {...mockFunction} />
        <TodoList todos={mockInitialTodos} {...mockFunction} />
        <Modal
          isOpen={isOpen}
          {...mockFunction}
          todoSelected={mockTodoSelected}
        />
      </TodoApp>
    )

    expect(screen.queryByTestId('modal')).not.toBeInTheDocument()
  })

  it('click cancel button modal, modal is closed', () => {
    let isOpen = true

    const mockTodoSelected = {
      id: '1',
      title: 'Test todo',
    }

    const { rerender } = render(
      <TodoApp>
        <Form value='' {...mockFunction} />
        <TodoList todos={mockInitialTodos} {...mockFunction} />
        <Modal
          isOpen={isOpen}
          {...mockFunction}
          todoSelected={mockTodoSelected}
        />
      </TodoApp>
    )

    const buttonCancel = screen.getByTestId('cancel-button')
    fireEvent.click(buttonCancel)

    expect(mockFunction.setEdit).toHaveBeenCalledWith(false)

    isOpen = false

    rerender(
      <TodoApp>
        <Form value='' {...mockFunction} />
        <TodoList todos={mockInitialTodos} {...mockFunction} />
        <Modal
          isOpen={isOpen}
          {...mockFunction}
          todoSelected={mockTodoSelected}
        />
      </TodoApp>
    )

    expect(screen.queryByTestId('modal')).not.toBeInTheDocument()
  })

  it('remove a todo when the remove button is clicked', () => {
    const { rerender } = render(
      <TodoApp>
        <Form value='' {...mockFunction} />
        <TodoList todos={mockInitialTodos} />
      </TodoApp>
    )

    const input = screen.getByLabelText(/Enter todo/)
    fireEvent.change(input, { target: { value: 'Test todo' } })
    input.value = 'Test todo'

    rerender(
      <TodoApp>
        <Form value={input.value} {...mockFunction} />
        <TodoList todos={mockInitialTodos} />
      </TodoApp>
    )

    const form = screen.queryByTestId('form')
    fireEvent.submit(form)

    expect(mockFunction.handleAddTodo).toHaveBeenCalled()

    const newTodos = [...mockInitialTodos, { id: '1', title: input.value }]

    rerender(
      <TodoApp>
        <Form value='' {...mockFunction} />
        <TodoList todos={newTodos} {...mockFunction} />
      </TodoApp>
    )

    const removeButtons = screen.getAllByTestId('remove-button')
    const todoIds = newTodos.map((todo) => todo.id)

    removeButtons.forEach((button, index) => {
      fireEvent.click(button)
      expect(mockFunction.handleRemoveTodo).toHaveBeenCalledWith(todoIds[index])
    })
  })
})
