import cheerio from 'cheerio'
import fetchHTML from '../utils/fetchHTML.js'

const datatronic = async (url) => {
  const html = await fetchHTML(url)
  const $ = cheerio.load(html)
  let results = []
  $('#products .product-miniature').each((i, foo) => {
    const item = {
      store: 'datatronic',
      name: $('.product-title a', foo).text(),
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
