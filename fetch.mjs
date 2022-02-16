#!/usr/bin/env node
import yargs from "yargs";
import datatronic from "./components/datatronic.mjs";
import jimms from "./components/jimms.mjs";
import proshop from "./components/proshop.mjs";
import verkkis from "./components/verkkis.mjs";

const { argv } = yargs(process.argv);

const jimmsResults = await jimms();
const verkkisResults = await verkkis();
const proshopResults = await proshop();
const datatronicResults = await datatronic();
const max = argv.max ? argv.max : 1000;
const results = jimmsResults.concat(
  verkkisResults,
  proshopResults,
  datatronicResults
);
const filtered = results.filter((i) => {
  const price = parseFloat(i.price.replace(/,/g, "."));
  return price < max;
});
if (filtered.length > 0) {
  filtered.map((i) => {
    console.log(i.store);
    console.log(i.name);
    console.log(i.link);
    console.log(`${i.price}€`);
    console.log("-------------------------");
  });
} else {
  console.log("-------------------------");
  console.log("--- NO LUCK THIS TIME ---");
}
console.log("-------------------------");
console.log(`--- Parsed ${results.length} products in total`);
console.log(
  `--- Verkkis: ${verkkisResults.length} (>= ${
    verkkisResults[0] ? verkkisResults[0].price : "Na"
  }€)`
);
console.log(`--- Jimms: ${jimmsResults.length} (>= ${jimmsResults[0].price}€)`);
console.log(
  `--- Proshop: ${proshopResults.length} (>= ${proshopResults[0].price}€)`
);
console.log(
  `--- Datatronic: ${datatronicResults.length} (>= ${datatronicResults[0].price}€)`
);

console.log("-------------------------");
