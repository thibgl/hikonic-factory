import type { FactoryIdentity, OptionalCollection } from './types'
import { mergeArrayValues } from '@/utils/mergeArrayValues'

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
