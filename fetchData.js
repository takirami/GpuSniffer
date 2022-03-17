#!/usr/bin/env node
import chalk from 'chalk'
import { Spinner } from 'cli-spinner'
import datatronic from './components/datatronic.js'
import jimms from './components/jimms.js'
import jimmsTi from './components/jimmsTi.js'
import proshop from './components/proshop.js'
import verkkis from './components/verkkis.js'
import {DATATRONIC_3060, JIMMS_3060, JIMMS_3060_TI, PROSHOP_3060, VERKKIS_3060_AND_TI} from './links.js'

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
  const jimms1 = await jimms(JIMMS_3060)
  const jimms2 = await jimms(JIMMS_3060_TI)
  storeData.push({name: 'Jimms', data: jimms1.concat(jimms2)})

  stopStart('Verkkis')
  const verkkisResults = await verkkis(VERKKIS_3060_AND_TI)
  storeData.push({name: 'Verkkis', data: verkkisResults})

  stopStart('Proshop')
  const proshopResults = await proshop(PROSHOP_3060)
  storeData.push({name: 'Proshop', data: proshopResults})

  stopStart('Datatronic')
  const datatronicResults = await datatronic(DATATRONIC_3060)
  storeData.push({name: 'Datatronic', data: datatronicResults})
  spinner.stop()
  process.stdout.write('\n')
  console.log('-------------------------')
  
  return storeData
}

