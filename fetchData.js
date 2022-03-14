#!/usr/bin/env node
import chalk from 'chalk'
import { Spinner } from 'cli-spinner'
import datatronic from './components/datatronic.mjs'
import jimms from './components/jimms.mjs'
import jimmsTi from './components/jimmsTi.mjs'
import proshop from './components/proshop.mjs'
import verkkis from './components/verkkis.mjs'

export const fetchData = async () => {
  const loader = 18
  let spinner = new Spinner(`%s Fetching ${chalk.green('Jimms')}..`)

  // Init spinner
  const stopStart = (string) => {
    spinner.stop()
    process.stdout.write('\n')
    spinner = new Spinner(`%s Fetching ${chalk.green(string)}..`)
    spinner.setSpinnerString(loader)
    spinner.start()
  }

  spinner.setSpinnerString(loader)
  spinner.start()

  // Fetch Data
  const storeData = []
  const jimmsResults = await jimms()
  const jimmsTiResults = await jimmsTi()
  storeData.push({name: 'Jimms', data: jimmsResults.concat(jimmsTiResults)})

  stopStart('Verkkis')
  const verkkisResults = await verkkis()
  storeData.push({name: 'Verkkis', data: verkkisResults})

  stopStart('Proshop')
  const proshopResults = await proshop()
  storeData.push({name: 'Proshop', data: proshopResults})

  stopStart('Datatronic')
  const datatronicResults = await datatronic()
  storeData.push({name: 'Datatronic', data: datatronicResults})
  spinner.stop()
  process.stdout.write('\n')
  console.log('-------------------------')
  
  return storeData
}

