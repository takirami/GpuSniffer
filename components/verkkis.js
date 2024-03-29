import cheerio from 'cheerio'
import { model } from '../utils/categories.js'
import fetchHTML from '../utils/fetchHTML.js'

const verkkis = async (url) => {
  const html = await fetchHTML(url) // serialized HTML of page DOM.
  const $ = cheerio.load(html)
  let results = []
  $('.sc-1p6yk7n-1').each((i, foo) => {
    const name = $('a.Box-sc-eb7m1u-0', foo).text()
    const item = {
      store: 'verkkis',
      name: name,
      model: model(name),
      link: 'https://www.verkkokauppa.com' + $('a.Box-sc-eb7m1u-0', foo).attr('href'),
      price: $('data.CurrentData-sc-1eckydb-0', foo)
        .text()
        .replace('€', '')
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

export default verkkis
