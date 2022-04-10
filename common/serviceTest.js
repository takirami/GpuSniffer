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
    test('array should gave length', () => {
      expect(testData).not.toHaveLength(0)
    })
    test('price should be a string', () => {
      expect(typeof testData[0].price).toBe('string')
    })
    test('price should not be empty', () => {
      expect(testData[0].price).not.toBe('')
    })
    test('name should be string', () => {
      expect(typeof testData[0].name).toBe('string')
    })
    test('model should be string', () => {
      expect(typeof testData[0].model).toBe('string')
    })
    test('name should not be empty', () => {
      expect(testData[0].name).not.toBe('')
    })
    test('link should be string', () => {
      expect(typeof testData[0].name).toBe('string')
    })
    test('link should not be empty', () => {
      expect(testData[0].name).not.toBe('')
    })
  })
}
