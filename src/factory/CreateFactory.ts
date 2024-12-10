import type { FactoryIdentity, OptionalCollection } from './types'

import { Factory } from './Factory'
import { Product } from './Product'

interface CreateFactory {
  identity: FactoryIdentity
  factory?: Omit<Factory, 'slug' | 'shipsTo' | 'portsFrom' | 'products'>
  product?: Omit<Product, 'slug' | 'shipsTo' | 'portsFrom' | 'factory' | 'filterNeighbors'>
  commons?: Omit<OptionalCollection, 'slug'>
  shipsTo?: FactoryIdentity[]
  portsFrom?: FactoryIdentity[]
  filterNeighbors?: boolean
  productsMaxDepth?: number
}

const mapFactoryIdentity = (identity: FactoryIdentity) => {
  const factory = identity.factory
  const products = identity.products || `${factory}Products`
  return { factory, products }
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
}: CreateFactory) => {
  const { factory: factoryName, products: productName } = mapFactoryIdentity(identity)
  const shipsToIds = shipsTo.map(mapFactoryIdentity)
  const portsFromIds = portsFrom.map(mapFactoryIdentity)

  return [
    Factory({
      ...mergeArrayValues(commons, factory),
      slug: factoryName,
      products: productName,
      shipsTo: shipsToIds,
      portsFrom: portsFromIds,
      productsMaxDepth,
    }),
    Product({
      ...mergeArrayValues(commons, product),
      slug: productName,
      factory: factoryName,
      shipsTo: shipsToIds,
      portsFrom: portsFromIds,
      filterNeighbors,
    }),
  ]
}

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
