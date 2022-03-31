import BLACKLIST from '../blacklist.js'

export const filterData = async (results, max, twelveGigs) => {
  // Filter
  const filtered = results.filter((i) => {
    const price = parseFloat(i.price.replace(/,/g, '.'))

    // Filter out blacklist
    const blacklisted = BLACKLIST.some((word) => {
      return i.name.includes(word)
    })
    if (blacklisted) {
      return false
    }

    // If twelveGigs defined, filter out 8GB
    if (twelveGigs) {
      return i.name.includes('12G') && price < max
    }
    return price < max
  })
  return filtered
}
