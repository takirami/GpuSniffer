import chalk from "chalk"
export const printItem = (i, color) => {
    console.log(`${chalk[color].bold(i.price + '€')} | ${i.name} | ${chalk.blue(i.store)}`)
    console.log(chalk.gray.underline(i.link))
    console.log('-------------------------')
}

export const noLuckMessage = () => {
  console.log('-------------------------')
  console.log('--- NO LUCK THIS TIME ---')
}

export const storeResult = (name, storeResults) => {

console.log(
  `--- ${chalk.green(name)}: ${storeResults.length} (>= ${
    storeResults[0] ? storeResults[0].price : 'Na'
  }€)`
)
}
