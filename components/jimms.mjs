import puppeteer from "puppeteer";
import cheerio from "cheerio";

const jimms = async () => {
  const url =
    "https://www.jimms.fi/fi/Product/List/000-1TL/komponentit--naytonohjaimet--geforce-rtx-pelaamiseen--rtx-3060";
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle0" });

  const html = await page.content(); // serialized HTML of page DOM.
  await browser.close();
  const $ = cheerio.load(html);
  let results = [];
  $(".p_listTmpl1").each((i, foo) => {
    const notAvailable = $(".label-danger", foo).text();
    if (notAvailable !== "Tuote ei ole tilattavissa") {
      const maker = $(".p_name b", foo).text();
      const item = {
        store: "jimms",
        name: maker + " " + $(".p_name span", foo).text(),
        price: $(".p_price span", foo).text(),
      };
      results.push(item);
    }
  });
  return results;
};

export default jimms;
