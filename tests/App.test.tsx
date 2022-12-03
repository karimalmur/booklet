import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it } from 'vitest'

import App from '../src/App'

describe('App', () => {
  it('renders', () => {
    render(<App />)
    screen.debug()
  })
})
