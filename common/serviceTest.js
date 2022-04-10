import { jest } from '@jest/globals'
export const commonFetcherTest = (name, scrapeFunction, url) => {
  describe(`Scrape ${name}`, () => {
    jest.setTimeout(20000)
    let testData = []
    test('returns results', () => {
      expect.assertions(1)
      return scrapeFunction(url).then((data) => {
        testData = data
        expect(testData).not.toHaveLength(0)
      })
    })
    test('Test that array has been provided', () => {
      expect(testData).not.toHaveLength(0)
    })
    test('price is a string', () => {
      expect(typeof testData[0].price).toBe('string')
    })
    test('price is not empty', () => {
      expect(testData[0].price).not.toBe('')
    })
    test('name is string', () => {
      expect(typeof testData[0].name).toBe('string')
    })
    test('name is not empty', () => {
      expect(testData[0].name).not.toBe('')
    })
    test('link is string', () => {
      expect(typeof testData[0].name).toBe('string')
    })
    test('link is not empty', () => {
      expect(testData[0].name).not.toBe('')
    })
  })
}
