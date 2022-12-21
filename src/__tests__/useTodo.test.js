import { act, renderHook } from '@testing-library/react'
import { useTodo } from '../hooks/useTodo'

describe('useTodo', () => {
  it('adds a todo when handleAddTodo is called', () => {
    // Render the hook
    const { result } = renderHook(() => useTodo())

    // Call the handleAddTodo function with a value for the new todo
    act(() => {
      result.current.handleAddTodo('Test todo')
    })

    // Assert that the todos state has been updated with the new todo
    expect(result.current.todos).toContainEqual({
      id: expect.any(String),
      title: 'Test todo',
    })
  })

  it('remove a todo when handleRemoveTodo is called', () => {
    const { result } = renderHook(() => useTodo())

    act(() => {
      result.current.handleAddTodo('Test todo')
    })

    expect(result.current.todos).toContainEqual({
      id: expect.any(String),
      title: 'Test todo',
    })

    act(() => {
      result.current.handleRemoveTodo(result.current.todos[0].id)
    })

    expect(result.current.todos).not.toContainEqual({
      id: expect.any(String),
      title: 'Test todo',
    })
  })

  it('updates a todo when handleUpdateTodo is called', () => {
    const { result } = renderHook(() => useTodo())

    act(() => {
      result.current.handleAddTodo('Test todo')
    })

    expect(result.current.todos).toContainEqual({
      id: expect.any(String),
      title: 'Test todo',
    })

    act(() => {
      const todoId = result.current.todos.map((todo) => todo.id)

      const todoSelect = result.current.todos.find((todo) =>
        todoId.includes(todo.id)
      )

      result.current.handleUpdateTodo({
        ...todoSelect,
        title: 'New title',
      })
    })

    expect(result.current.todos).toContainEqual({
      id: expect.any(String),
      title: 'New title',
    })
  })

  it('does not update a todo when handleUpdateTodo is called with an invalid id', () => {
    const { result } = renderHook(() => useTodo())

    act(() => {
      result.current.handleAddTodo('Test todo')
    })

    expect(result.current.todos).toContainEqual({
      id: expect.any(String),
      title: 'Test todo',
    })

    act(() => {
      result.current.handleUpdateTodo({
        id: 'invalid-id',
        title: 'New title',
      })
    })

    expect(result.current.todos).toContainEqual({
      id: expect.any(String),
      title: 'Test todo',
    })
  })
})
