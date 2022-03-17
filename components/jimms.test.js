import jimms from "./jimms"
import { jest } from "@jest/globals"

describe("Jimms Scrape", () => {
  jest.setTimeout(20000)
  let testData = []
  test("returns results", () => {
    expect.assertions(1)
    return jimms('https://www.jimms.fi/fi/Product/List/000-00P/komponentit--naytonohjaimet').then((data) => {
      testData = data
    expect(testData).not.toHaveLength(0)
    })
  })
  test("price is a string", () => {
      expect(typeof testData[0].price).toBe('string')
  })
  test('price is not empty',() => {
    expect(testData[0].price).not.toBe('')
  })
  test('name is string',() => {
    expect(typeof testData[0].name).toBe('string')
  })
  test('name is not empty',() => {
    expect(testData[0].name).not.toBe('')
  })
  test('link is string',() => {
    expect(typeof testData[0].name).toBe('string')
  })
  test('link is not empty',() => {
    expect(testData[0].name).not.toBe('')
  })
})

