import React from 'react'
import { render, screen } from '@testing-library/react'
import HomePage from '../pages/HomePage'

test('renders HomePage heading', () => {
  render(<HomePage go={() => {}} fire={() => {}} />)
  expect(screen.getByText(/যেখানে শুরু হয়/i)).toBeTruthy()
})
