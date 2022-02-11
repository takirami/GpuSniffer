import puppeteer from "puppeteer";
import cheerio from "cheerio";

const proshop = async () => {
  const url =
    "https://www.proshop.fi/Naeytoenohjaimet?inv=1&o=1028&pre=0&f~grafikkort_videoudganggrafikprocessorleverandor=nvidia-geforce-rtx-3060~nvidia-geforce-rtx-3060-ti";
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle0" });

  const html = await page.content(); // serialized HTML of page DOM.
  await browser.close();
  const $ = cheerio.load(html);
  let results = [];
  $("#products li.toggle").each((i, foo) => {
    const price = $("span.site-currency-lg", foo)
      .text()
      .replace("€", "")
      .replace(/\s/g, "")
      .replace(",", ".")
      .trim();
    const item = {
      store: "proshop",
      name: $("a.site-product-link h2", foo).text(),
      price,
    };
    results.push(item);
  });

  return results;
};

export default proshop;
