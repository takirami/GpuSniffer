import { commonFetcherTest } from '../common/serviceTest'
import jimms from './jimms'

commonFetcherTest(
  'Jimms',
  jimms,
  'https://www.jimms.fi/fi/Product/List/000-00P/komponentit--naytonohjaimet'
)
