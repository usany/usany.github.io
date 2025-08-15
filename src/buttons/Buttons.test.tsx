import { render, screen } from '@testing-library/react'
import Buttons from './Buttons'
test('renders the component correctly', () => {
  render(<Buttons />)
  expect(screen.getByText('Send')).toBeInTheDocument()
})
