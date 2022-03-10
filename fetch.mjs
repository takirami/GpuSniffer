#!/usr/bin/env node
import { Spinner } from 'cli-spinner'
import yargs from 'yargs'
import datatronic from './components/datatronic.mjs'
import jimms from './components/jimms.mjs'
import jimmsTi from './components/jimmsTi.mjs'
import proshop from './components/proshop.mjs'
import verkkis from './components/verkkis.mjs'

const { argv } = yargs(process.argv)
const max = argv.max ? argv.max : 1000
const twelveGigs = argv.twelve ? argv.twelve : false
const twelveMessage = twelveGigs ? ' only 12GB' : ''

console.log(`:::::RUNNING GPU SNIFFER (<= ${max}€${twelveMessage}):::::`)
const loader = 18
let spinner = new Spinner('%s Fetching Jimms..')

const stopStart = (string) => {
  spinner.stop()
  process.stdout.write('\n')
  spinner = new Spinner(`%s Fetching ${string}..`)
  spinner.setSpinnerString(loader)
  spinner.start()
}

spinner.setSpinnerString(loader)
spinner.start()

const jimmsResults = await jimms()
const jimmsTiResults = await jimmsTi()
stopStart('Verkkis')
const verkkisResults = await verkkis()
stopStart('Proshop')
const proshopResults = await proshop()
stopStart('Datatronic')
const datatronicResults = await datatronic()
spinner.stop()
process.stdout.write('\n')
console.log('-------------------------')

const combinedJimms = jimmsResults.concat(jimmsTiResults)
const results = combinedJimms.concat(verkkisResults, proshopResults, datatronicResults)
const filtered = results.filter((i) => {
  const price = parseFloat(i.price.replace(/,/g, '.'))
  if (twelveGigs) {
    return i.name.includes('12G') && price < max
  }
  return price < max
})

if (filtered.length > 0) {
  filtered.sort((a, b) => {
    return b.price - a.price
  })
  filtered.map((i) => {
    console.log(i.store)
    console.log(i.name)
    console.log(i.link)
    console.log(`${i.price}€`)
    console.log('-------------------------')
  })
} else {
  console.log('-------------------------')
  console.log('--- NO LUCK THIS TIME ---')
}
console.log('-------------------------')
console.log(`--- Parsed ${results.length} products in total`)
console.log(
  `--- Verkkis: ${verkkisResults.length} (>= ${
    verkkisResults[0] ? verkkisResults[0].price : 'Na'
  }€)`
)
console.log(`--- Jimms: ${combinedJimms.length} (>= ${combinedJimms[0].price}€)`)
console.log(`--- Proshop: ${proshopResults.length} (>= ${proshopResults[0].price}€)`)
console.log(`--- Datatronic: ${datatronicResults.length} (>= ${datatronicResults[0].price}€)`)

console.log('-------------------------')
