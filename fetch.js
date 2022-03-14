#!/usr/bin/env node
import chalk from 'chalk'
import yargs from 'yargs'
import BLACKLIST from './blacklist.js'
import { fetchData } from './fetchData.js'
import {noLuckMessage, printItem, storeResult} from './utils/messages.js'
const { argv } = yargs(process.argv)

const max = argv.max ? argv.max : 1000
const twelveGigs = argv.twelve ? argv.twelve : false
const twelveMessage = twelveGigs ? ` only ${chalk.red('12GB')}` : ''

console.log(`:::::RUNNING GPU SNIFFER (<= ${chalk.red(max)}€${twelveMessage}):::::`)

// Fetch Data
const storeData = await fetchData()

// Process results
const results = storeData.reduce((prev, current) => {
  return prev.concat(current.data)
}, [])

// Filter
const filtered = results.filter((i) => {
  const price = parseFloat(i.price.replace(/,/g, '.'))

  // Filter out blacklist
  const blacklisted = BLACKLIST.some((word) => {
    return i.name.includes(word)
  })
  if(blacklisted){
    return false
  }
  
  // If twelveGigs defined, filter out 8GB
  if (twelveGigs) {
    return i.name.includes('12G') && price < max
  }
  return price < max
})

if (filtered.length > 0) {

  // Sort by price
  filtered.sort((a, b) => {
    return b.price - a.price
  })

  // Sort out color range prices
  const lowest = filtered[filtered.length - 1].price
  const highest = filtered[0].price
  const diff = highest - lowest
  const third = diff * 0.33333
  const firstThird = parseFloat(lowest) + third
  const secondThird = firstThird + third

  // Output formated result
  filtered.map((item) => {
    const color = item.price < firstThird ? 'green' : (item.price < secondThird ? 'yellow' : 'red')
    printItem(item, color)
  })

} else {
  noLuckMessage()  
}
console.log('-------------------------')
console.log(`--- Parsed ${results.length} products in total`)

storeData.map((store) => {
  storeResult(store.name, store.data)
})
console.log('-------------------------')
