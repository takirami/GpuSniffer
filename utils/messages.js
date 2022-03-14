export const printItem = (i) => {
    console.log(i.store)
    console.log(i.name)
    console.log(i.link)
    console.log(`${i.price}€`)
    console.log('-------------------------')
}

export const noLuckMessage = () => {
  console.log('-------------------------')
  console.log('--- NO LUCK THIS TIME ---')
}

export const storeResult = (name, storeResults) => {

console.log(
  `--- ${name}: ${storeResults.length} (>= ${
    storeResults[0] ? storeResults[0].price : 'Na'
  }€)`
)
}
