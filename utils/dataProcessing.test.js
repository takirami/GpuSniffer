import { filterData } from './dataProcessing'

describe('FilterData', () => {
  const input = [
    {
      store: 'datatronic',
      name: 'MSI RTX 3nohjain NVIDIA GeForce RTX 3070 12GB GDDR6',
      link: 'https://datatronic.fi/komponentit/naytonohjaimet/msi-rtx-3070-ventus-3x-8g-oc-lhr-naytonohjain-nvidia-geforce-rtx-3070-8-gb-gddr6-msi-v390-273r',
      price: '500.00'
    },
    {
      store: 'datatronic',
      name: 'MSI RTX 3070 TI VENTUS 3X 8G NVIDIA GeForce RTX 3070 Ti 8 GB GDDR6X',
      link: 'https://datatronic.fi/komponentit/naytonohjaimet/msi-rtx-3070-ti-ventus-3x-8g-oc-naytonohjain-nvidia-geforce-rtx-3070-ti-8-gb-gddr6x-msi-rtx-3070-ti-ventus-3x-8g-oc',
      price: '630.00'
    },
    {
      store: 'datatronic',
      name: 'ASUS TUF Gaming TUF-RTX3070TI-O8G-GAMING NVIDIA GeForce RTX 3070 Ti 8 GB GDDR6X *DEMO*',
      link: 'https://datatronic.fi/komponentit/naytonohjaimet/asus-tuf-gaming-tuf-rtx3070ti-o8g-gaming-nvidia-geforce-rtx-3070-ti-8-gb-gddr6x-asus-90yv0gy0-m0na00',
      price: '939.00'
    }
  ]

  test('should return array', () => {
    filterData(input, '1000', false).then((data) => {
      expect(data.length).not.toBe(0)
    })
  })

  test('should not crash if given empty value', () => {
    filterData([], '1000', false).then((data) => {
      expect(data.length).toBe(0)
    })
  })

  test('should remove blacklisted content', () => {
    filterData(input, '1000', false).then((data) => {
      expect(data.length).toBe(2)
    })
  })

  test('should remove 8 gigs if twelvegigs is specified', () => {
    filterData(input, '1000', true).then((data) => {
      expect(data.length).toBe(1)
    })
  })

  test('should filter out content according to max param', () => {
    filterData(input, '600', true).then((data) => {
      expect(data.length).toBe(1)
    })
  })
})
