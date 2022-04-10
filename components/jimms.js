import cheerio from 'cheerio'
import { model } from '../utils/categories.js'
import fetchHTML from '../utils/fetchHTML.js'

const jimms = async (url) => {
  const html = await fetchHTML(url)
  const $ = cheerio.load(html)
  let results = []
  $('.p_listTmpl1').each((i, foo) => {
    const notAvailable = $('.label-danger', foo).text()
    if (notAvailable !== 'Tuote ei ole tilattavissa') {
      const maker = $('.p_name b', foo).text()
      const name = maker + ' ' + $('.p_name span', foo).text()
      const item = {
        store: 'jimms',
        name: name,
        model: model(name),
        link: 'https://www.jimms.fi/' + $('.p_name a', foo).attr('href'),
        price: $('.p_price span', foo)
          .text()
          .replace('€', '')
          .replace(/\s/g, '')
          .replace(',', '.')
          .trim()
      }
      results.push(item)
    }
  })
  return results.sort((a, b) => {
    return a.price - b.price
  })
}

export default jimms
