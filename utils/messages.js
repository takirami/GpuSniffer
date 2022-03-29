import chalk from "chalk"

const tiStrings = ['TI', 'Ti', ' ti ']

export const printItem = (i, color) => {
    const name = tiStrings.some((ti) => i.name.includes(ti)) ? `${chalk.green(i.name)}` : i.name

    console.log(`${chalk[color].bold(i.price + '€')} | ${name} | ${chalk.blue(i.store)}`)
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
