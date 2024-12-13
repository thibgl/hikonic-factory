import type { FactoryIdentity } from '@/factory/types'

import { CreateFactory } from '@/factory/CreateFactory'
import { ConditionalField } from '@/fields/Conditional'
import { Item, Layout } from './base'
import { Field } from 'payload'

const pagesFactoryIdentity: FactoryIdentity = {
  factory: { singular: 'index', plural: 'indexes' },
  products: { singular: 'page', plural: 'pages' },
}
const itemsFactoryIdentity: FactoryIdentity = {
  factory: { singular: 'token', plural: 'tokens' },
  products: { singular: 'item', plural: 'items' },
}

export const Factories = [
  ...CreateFactory({
    identity: pagesFactoryIdentity,
    portsFrom: [itemsFactoryIdentity],
    shipsTo: [itemsFactoryIdentity],
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
    product: {
      tabs: [],
    },
  }),
  ...CreateFactory({
    identity: itemsFactoryIdentity,
    shipsTo: [pagesFactoryIdentity],
    portsFrom: [pagesFactoryIdentity],
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
