#!/usr/bin/env node
import { Spinner } from 'cli-spinner'
import yargs from 'yargs'
import BLACKLIST from './blacklist.js'
import datatronic from './components/datatronic.mjs'
import jimms from './components/jimms.mjs'
import jimmsTi from './components/jimmsTi.mjs'
import proshop from './components/proshop.mjs'
import verkkis from './components/verkkis.mjs'
import {noLuckMessage, printItem, storeResult} from './utils/messages.js'

const { argv } = yargs(process.argv)
const max = argv.max ? argv.max : 1000
const twelveGigs = argv.twelve ? argv.twelve : false
const twelveMessage = twelveGigs ? ' only 12GB' : ''

console.log(`:::::RUNNING GPU SNIFFER (<= ${max}€${twelveMessage}):::::`)
const loader = 18
let spinner = new Spinner('%s Fetching Jimms..')

// Init spinner
const stopStart = (string) => {
  spinner.stop()
  process.stdout.write('\n')
  spinner = new Spinner(`%s Fetching ${string}..`)
  spinner.setSpinnerString(loader)
  spinner.start()
}

spinner.setSpinnerString(loader)
spinner.start()

// Fetch Data
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

// Process Data
const combinedJimms = jimmsResults.concat(jimmsTiResults)
const results = combinedJimms.concat(verkkisResults, proshopResults, datatronicResults)
const filtered = results.filter((i) => {
  const price = parseFloat(i.price.replace(/,/g, '.'))
  const blacklisted = BLACKLIST.some((word) => {
    return i.name.includes(word)
  })
  if(blacklisted){
    return false
  }
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
    // Output formated result
    printItem(i)
  })
} else {
  noLuckMessage()  
}
console.log('-------------------------')
console.log(`--- Parsed ${results.length} products in total`)

storeResult('Verkkis', verkkisResults)
storeResult('Jimms', combinedJimms)
storeResult('Proshop', proshopResults)
storeResult('Datatronic', datatronicResults)

console.log('-------------------------')
