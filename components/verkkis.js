import cheerio from 'cheerio'
import fetchHTML from '../utils/fetchHTML.js'

const verkkis = async (url) => {
  const html = await fetchHTML(url) // serialized HTML of page DOM.
  const $ = cheerio.load(html)
  let results = []
  $('.sc-uea85g-1').each((i, foo) => {
    const item = {
      store: 'verkkis',
      name: $('a.Box-sc-eb7m1u-0', foo).text(),
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
