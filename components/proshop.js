import cheerio from 'cheerio'
import fetchHTML from '../utils/fetchHTML.js'

const proshop = async (url) => {
  const html = await fetchHTML(url) 
  const $ = cheerio.load(html)
  let results = []
  $('#products li.toggle').each((i, foo) => {
    const price = $('span.site-currency-lg', foo)
      .text()
      .replace('€', '')
      .replace(/\s/g, '')
      .replace(',', '.')
      .trim()
    if(price === '') return

    const item = {
      store: 'proshop',
      name: $('a.site-product-link h2', foo).text(),
      link: 'https://www.proshop.fi/' + $('a.site-product-link', foo).attr('href'),
      price
    }
    results.push(item)
  })
  return results.sort((a, b) => {
    return a.price - b.price
  })
}

export default proshop
