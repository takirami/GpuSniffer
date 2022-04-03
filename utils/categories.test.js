import { model } from './categories'

describe('Finds model from string', () => {
  test('should find 3060 model from foo3060bar', () => {
    const title = 'foo3060bar'
    const modelName = model(title)
    expect(modelName).toBe('3060')
  })
  test('should return empty string if model not found', () => {
    const title = 'fooBarBaz'
    const modelName = model(title)
    expect(modelName).toBe('')
  })
})
