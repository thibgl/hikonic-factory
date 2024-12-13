import type { FactoryIdentity, OptionalCollection } from './types'

import { Factory } from './Factory'
import { Product } from './Product'

interface CreateFactory {
  identity: FactoryIdentity
  factory?: Omit<Factory, 'identity' | 'shipsTo' | 'portsFrom' | 'products'>
  product?: Omit<Product, 'identity' | 'shipsTo' | 'portsFrom' | 'factory' | 'filterNeighbors'>
  commons?: Omit<OptionalCollection, 'slug'>
  shipsTo?: FactoryIdentity[]
  portsFrom?: FactoryIdentity[]
  filterNeighbors?: boolean
  productsMaxDepth?: number
}

export const CreateFactory = ({
  identity,
  factory = {},
  product = {},
  commons = {},
  shipsTo = [],
  portsFrom = [],
  filterNeighbors = false,
  productsMaxDepth = 2,
}: CreateFactory) => [
  Factory({
    ...mergeArrayValues(commons, factory),
    identity,
    shipsTo: shipsTo,
    portsFrom: portsFrom,
    productsMaxDepth,
  }),
  Product({
    ...mergeArrayValues(commons, product),
    identity,
    shipsTo: shipsTo,
    portsFrom: portsFrom,
    filterNeighbors,
  }),
]

const mergeArrayValues = (obj1: any, obj2: any): any => {
  const result = { ...obj1 }

  for (const key in obj2) {
    if (obj2[key] === null || obj2[key] === undefined) {
      result[key] = obj1[key]
    }
    // If both are arrays, merge them
    else if (Array.isArray(obj1[key]) && Array.isArray(obj2[key])) {
      result[key] = [...new Set([...obj1[key], ...obj2[key]])]
    }
    // If both are objects (but not arrays), recursively merge
    else if (
      typeof obj1[key] === 'object' &&
      typeof obj2[key] === 'object' &&
      !Array.isArray(obj1[key]) &&
      !Array.isArray(obj2[key])
    ) {
      result[key] = mergeArrayValues(obj1[key], obj2[key])
    }
    // Otherwise use obj2's value
    else {
      result[key] = obj2[key]
    }
  }

  return result
}
