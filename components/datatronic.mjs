import puppeteer from "puppeteer";
import cheerio from "cheerio";

const datatronic = async () => {
  const url =
    "https://datatronic.fi/naytonohjaimet/s-2/grafiikkaprosessori-geforce_rtx_3060_ti+geforce_rtx_3060/l%C3%A4hetett%C3%A4viss%C3%A4_heti_myym%C3%A4l%C3%A4ss%C3%A4-kylla";
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle0" });
  const html = await page.content(); // serialized HTML of page DOM.
  await browser.close();
  const $ = cheerio.load(html);
  let results = [];
  $("#products .product-miniature").each((i, foo) => {
    const item = {
      store: "datatronic",
      name: $(".product-title a", foo).text(),
      link: $(".product-title a", foo).attr("href"),
      price: $(".price", foo)
        .text()
        .replace("€", "")
        .replace("&nbsp;", "")
        .replace(/\s/g, "")
        .replace(",", ".")
        .trim(),
    };
    results.push(item);
  });
  return results.sort((a, b) => {
    return a.price - b.price;
  });
};
datatronic();
export default datatronic;
