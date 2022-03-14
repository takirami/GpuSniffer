import chalk from "chalk"
export const printItem = (i) => {
    console.log(i.store)
    console.log(i.name)
    console.log(chalk.gray.underline(i.link))
    console.log(chalk.red(`${i.price}€`))
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
