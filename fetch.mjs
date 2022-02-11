#!/usr/bin/env node

import yargs from "yargs";
const { argv } = yargs(process.argv);

import jimms from "./components/jimms.mjs";
import proshop from "./components/proshop.mjs";
import verkkis from "./components/verkkis.mjs";

const jimmsResults = await jimms();
const verkkisResults = await verkkis();
const proshopResults = await proshop();
const max = argv.max ? argv.max : 1000;
const results = jimmsResults.concat(verkkisResults, proshopResults);
const filtered = results.filter((i) => {
  const price = parseFloat(i.price.replace(/,/g, "."));
  return price < max;
});
if (filtered.length > 0) {
  filtered.map((i) => {
    console.log(i.store);
    console.log(i.name);
    console.log(i.price);
  });
} else {
  console.log("-------------------------");
  console.log("--- NO LUCK THIS TIME ---");
}

console.log("-------------------------");
console.log(`--- Parsed ${results.length} products in total`);
console.log(`--- Verkkis: ${verkkisResults.length}`);
console.log(`--- Jimms: ${jimmsResults.length}`);
console.log(`--- Proshop: ${proshopResults.length}`);
console.log("-------------------------");
