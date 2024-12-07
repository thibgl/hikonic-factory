import type { CollectionConfig, CollectionSlug, Tab } from 'payload'
import type { FactoryIdentity } from './types'
import { ConditionalField } from '@/fields/Conditional'

export interface Factory extends CollectionConfig {
  products: string
  tabs?: Tab[]
  shipsTo?: FactoryIdentity[]
  portsFrom?: FactoryIdentity[]
}

export const Factory = ({
  products,
  tabs = [],
  shipsTo = [],
  portsFrom = [],
  ...incomingConfig
}: Factory): CollectionConfig => ({
  ...incomingConfig,
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Factory',
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
              unique: true,
            },
            {
              name: 'producing',
              type: 'checkbox',
              defaultValue: false,
            },
            ...incomingConfig.fields,
          ],
        },
        {
          label: 'Meta',
          fields: [
            {
              name: 'neighbors',
              type: 'relationship',
              relationTo: incomingConfig.slug as CollectionSlug,
              hasMany: true,
              filterOptions: ({ id }) => ({
                id: { not_equals: id },
              }),
            },
            ...portsFrom.map((port) => ({
              name: port.factory,
              type: 'relationship',
              relationTo: port.factory as CollectionSlug,
              hasMany: true,
            })),
          ],
        },
        {
          label: 'Related',
          fields: [
            ConditionalField({
              path: 'producing',
              value: true,
              fallback: false,
              field: {
                name: 'products',
                type: 'join',
                collection: products as CollectionSlug,
                on: 'factory',
              },
            }),
            {
              name: 'related',
              label: 'Neighbors',
              type: 'join',
              collection: incomingConfig.slug as CollectionSlug,
              on: 'neighbors',
            },
            ...shipsTo.map((port) => ({
              name: port.factory,
              type: 'join',
              collection: port.factory as CollectionSlug,
              on: incomingConfig.slug,
            })),
          ],
        },
        ...tabs,
      ],
    },
  ],
  admin: {
    ...incomingConfig.admin,
    useAsTitle: 'name',
    defaultColumns: ['name', 'products'],
  },
})
