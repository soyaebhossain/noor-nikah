import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import NoorNikah from '../NoorNikah'

test('renders the home route heading', () => {
  window.scrollTo = vi.fn()
  render(<MemoryRouter initialEntries={['/']}><NoorNikah /></MemoryRouter>)
  expect(screen.getByRole('heading', { level: 1, name: /যেখানে শুরু হয় পবিত্র বন্ধন/i })).toBeTruthy()
})
