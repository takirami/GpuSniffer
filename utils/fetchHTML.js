import puppeteer from 'puppeteer'

const fetchHTML = async (url) => {
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()
  await page.goto(url, { waitUntil: 'networkidle0' })
  const html = await page.content()  
  await browser.close()
  return html
}

export default fetchHTML
