import cheerio from 'cheerio'
import { model } from '../utils/categories.js'
import fetchHTML from '../utils/fetchHTML.js'

const datatronic = async (url) => {
  const html = await fetchHTML(url)
  const $ = cheerio.load(html)
  let results = []
  $('#products .product-miniature').each((i, foo) => {
    const name = $('.product-title a', foo).text()
    const item = {
      store: 'datatronic',
      name: name,
      model: model(name),
      link: $('.product-title a', foo).attr('href'),
      price: $('.price', foo)
        .text()
        .replace('€', '')
        .replace('&nbsp;', '')
        .replace(/\s/g, '')
        .replace(',', '.')
        .trim()
    }
    results.push(item)
  })
  return results.sort((a, b) => {
    return a.price - b.price
  })
}
export default datatronic
