#!/usr/bin/env node
import chalk from 'chalk'
import { Spinner } from 'cli-spinner'
import datatronic from './components/datatronic.js'
import jimms from './components/jimms.js'
import proshop from './components/proshop.js'
import verkkis from './components/verkkis.js'
import {DATATRONIC_3060, DATATRONIC_3060_TI, DATATRONIC_3070, DATATRONIC_3070_TI, JIMMS_3060, JIMMS_3060_TI, JIMMS_3070, JIMMS_3070_TI, PROSHOP_3060_3070_TI, VERKKIS_3060_AND_TI, VERKKIS_3070_AND_TI} from './links.js'

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
  const jimms3 = await jimms(JIMMS_3070)
  const jimms4 = await jimms(JIMMS_3070_TI)
  storeData.push({name: 'Jimms', data: jimms1.concat(jimms2, jimms3, jimms4)})

  stopStart('Verkkis')
  const verkkis1 = await verkkis(VERKKIS_3060_AND_TI)
  const verkkis2 = await verkkis(VERKKIS_3070_AND_TI)
  storeData.push({name: 'Verkkis', data: verkkis1.concat(verkkis2)})

  stopStart('Proshop')
  const proshopResults = await proshop(PROSHOP_3060_3070_TI)
  storeData.push({name: 'Proshop', data: proshopResults})

  stopStart('Datatronic')
  const datatronic1 = await datatronic(DATATRONIC_3060)
  const datatronic2 = await datatronic(DATATRONIC_3060_TI)
  const datatronic3 = await datatronic(DATATRONIC_3070)
  const datatronic4 = await datatronic(DATATRONIC_3070_TI)
  storeData.push({name: 'Datatronic', data: datatronic1.concat(datatronic2, datatronic3, datatronic4)})
  spinner.stop()
  process.stdout.write('\n')
  console.log('-------------------------')
  
  return storeData
}

