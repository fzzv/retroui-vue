import { beforeAll, vi } from 'vitest'

import '@testing-library/jest-dom/vitest'

beforeAll(() => {
  window.HTMLElement.prototype.scrollIntoView = vi.fn()
})
