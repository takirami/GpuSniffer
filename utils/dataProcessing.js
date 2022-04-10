import BLACKLIST from '../blacklist.js'
import { MODELS } from './categories.js'

export const filterData = (results, max, twelveGigs) => {
  const categorized = MODELS.reduce((prev, model) => {
    // Categorize by model
    const set = [...results].filter((item) => item.model === model)
    if (set.length === 0) return prev

    // Filter
    const filtered = set.filter((i) => {
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
    if (filtered.length === 0) return prev
    filtered.sort((a, b) => {
      return b.price - a.price
    })
    prev.push(filtered)

    return prev
  }, [])
  return categorized
}
