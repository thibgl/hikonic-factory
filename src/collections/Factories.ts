import type { FactoryIdentity } from '@/factory/types'

import { CreateFactory } from '@/factory/CreateFactory'
import { ConditionalField } from '@/fields/Conditional'
import { Item, Layout } from './base'
import { Field } from 'payload'

const pagesFactoryIdentity: FactoryIdentity = { factory: 'indexes', products: 'pages' }
const itemsFactoryIdentity: FactoryIdentity = { factory: 'tokens', products: 'items' }

export const Factories = [
  ...CreateFactory({
    identity: pagesFactoryIdentity,
    portsFrom: [itemsFactoryIdentity],
    filterNeighbors: true,
    commons: {
      versions: true,
      access: {
        read: () => true,
      },
    },
    factory: {
      tabs: [
        {
          label: 'Layout',
          fields: [Layout()],
        },
        {
          label: 'Children Layout',
          fields: [
            ConditionalField({
              path: 'producing',
              value: true,
              sibling: false,
              field: Layout('childrenLayout', true),
            }) as Field,
          ],
        },
      ],
    },
    product: {},
  }),
  ...CreateFactory({
    identity: itemsFactoryIdentity,
    shipsTo: [pagesFactoryIdentity],
    filterNeighbors: true,
    commons: {
      versions: true,
      access: {
        read: () => true,
      },
    },
    factory: {},
    product: {},
  }),
]
