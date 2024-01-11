import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import Page from '../app/page'

test('App Router: Works with Server Components', () => {
  render(<Page />)
  expect(
    screen.getByRole('heading', { level: 1, name: 'Hello' })
  ).toBeDefined()
});
