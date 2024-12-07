import { Factory } from './Factory'
import { Product } from './Product'
import type { FactoryIdentity } from './types'

interface CreateFactory {
  identity: FactoryIdentity
  shipsTo?: FactoryIdentity[]
  portsFrom?: FactoryIdentity[]
  filterNeighbors?: boolean
  factory: Omit<Factory, 'slug' | 'shipsTo' | 'portsFrom' | 'products'>
  product: Omit<Product, 'slug' | 'shipsTo' | 'portsFrom' | 'factory' | 'filterNeighbors'>
}

const mapFactoryIdentity = (identity: FactoryIdentity) => {
  const factory = identity.factory
  const products = identity.products || `${factory}Products`
  return { factory, products }
}

export const CreateFactory = ({
  identity,
  factory,
  product,
  shipsTo = [],
  portsFrom = [],
  filterNeighbors = false,
}: CreateFactory) => {
  const { factory: factoryName, products: productName } = mapFactoryIdentity(identity)
  const shipsToIds = shipsTo.map(mapFactoryIdentity)
  const portsFromIds = portsFrom.map(mapFactoryIdentity)

  return [
    Factory({
      ...factory,
      slug: factoryName,
      products: productName,
      shipsTo: shipsToIds,
      portsFrom: portsFromIds,
    }),
    Product({
      ...product,
      slug: productName,
      factory: factoryName,
      shipsTo: shipsToIds,
      portsFrom: portsFromIds,
      filterNeighbors,
    }),
  ]
}
