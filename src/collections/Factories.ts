import { CreateFactory } from './factory/CreateFactory'

export const Factories = [
  ...CreateFactory({
    name: 'pages',
    portsFrom: ['items'],
    factory: { fields: [] },
    product: { fields: [] },
  }),
  ...CreateFactory({
    name: 'items',
    shipsTo: ['pages'],
    factory: { fields: [] },
    product: { fields: [] },
  }),
]
