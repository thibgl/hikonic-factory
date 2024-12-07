import { CreateFactory } from '@/factory/CreateFactory'
import type { FactoryIdentity } from '@/factory/types'

const pagesFactoryIdentity: FactoryIdentity = { factory: 'indexes', products: 'pages' }
const itemsFactoryIdentity: FactoryIdentity = { factory: 'tokens', products: 'items' }

export const Factories = [
  ...CreateFactory({
    identity: pagesFactoryIdentity,
    portsFrom: [itemsFactoryIdentity],
    factory: { fields: [] },
    product: { fields: [] },
  }),
  ...CreateFactory({
    identity: itemsFactoryIdentity,
    shipsTo: [pagesFactoryIdentity],
    filterNeighbors: true,
    factory: { fields: [] },
    product: { fields: [] },
  }),
]
