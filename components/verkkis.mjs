import puppeteer from "puppeteer";
import cheerio from "cheerio";

const verkkis = async () => {
  const url =
    "https://www.verkkokauppa.com/fi/catalog/12149c/NVIDIA-GeForce-RTX-3060?sort=price%3Aasc&filter=ItemAdditionalInformationGraphicsProcessor%3AGeForce+RTX+3060&filter=AvailableImmediatelyAllChannels%3Aimmediately_shippable&filter=AvailableImmediatelyAllChannels%3Ajs&filter=ItemAdditionalInformationGraphicsProcessor%3AGeForce+RTX+3060+Ti";
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle0" });

  const html = await page.content(); // serialized HTML of page DOM.
  await browser.close();
  const $ = cheerio.load(html);
  let results = [];
  $(".sc-uea85g-1").each((i, foo) => {
    const item = {
      store: "verkkis",
      name: $("a.Box-sc-eb7m1u-0", foo).text(),
      link:
        "https://www.verkkokauppa.com/" +
        $("a.Box-sc-eb7m1u-0", foo).attr("href"),
      price: $("data.CurrentData-sc-1eckydb-0", foo)
        .text()
        .replace("€", "")
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

export default verkkis;
