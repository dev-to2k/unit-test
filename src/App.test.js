import { render } from '@testing-library/react'
import App from './App'
import TodoApp from './components/TodoApp'

test('renders learn react link', () => {
  render(<App />)
  const view = render(<TodoApp />)
  expect(view).toBeTruthy()
})
