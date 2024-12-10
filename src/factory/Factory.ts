import type { CollectionConfig, CollectionSlug, Field, Tab } from 'payload'
import type { FactoryIdentity, OptionalCollection } from './types'

import { ConditionalField } from '@/fields/Conditional'

export interface Factory extends OptionalCollection {
  products: string
  tabs?: Tab[]
  shipsTo?: FactoryIdentity[]
  portsFrom?: FactoryIdentity[]
  productsMaxDepth?: number
}

export const Factory = ({
  products,
  tabs = [],
  shipsTo = [],
  portsFrom = [],
  productsMaxDepth = 2,
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
            ...(incomingConfig.fields || []),
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
              filterOptions: ({ id }) =>
                id
                  ? {
                      id: { not_equals: id },
                    }
                  : true,
            },
            ...(portsFrom.map((port) => ({
              name: port.factory,
              type: 'relationship',
              relationTo: port.factory as CollectionSlug,
              hasMany: true,
            })) as Field[]),
            {
              name: 'meta',
              type: 'json',
              hooks: {
                beforeValidate: [
                  async ({ siblingData }) => [
                    ...siblingData.neighbors,
                    ...portsFrom.flatMap((port) => siblingData[port.factory] || []),
                  ],
                ],
              },
            },
          ],
        },
        {
          label: 'Related',
          fields: [
            ConditionalField({
              path: 'producing',
              value: true,
              field: {
                name: 'products',
                type: 'join',
                collection: products as CollectionSlug,
                on: 'factory',
                maxDepth: productsMaxDepth,
              },
            }) as Field,
            {
              name: 'related',
              label: 'Neighbors',
              type: 'join',
              collection: incomingConfig.slug as CollectionSlug,
              on: 'neighbors',
            },
            ...(shipsTo.map((port) => ({
              name: port.factory,
              type: 'join',
              collection: port.factory as CollectionSlug,
              on: incomingConfig.slug,
            })) as Field[]),
          ],
        },
        ...tabs,
      ],
    },
  ],
  admin: {
    ...(incomingConfig.admin || {}),
    useAsTitle: 'name',
    defaultColumns: ['name', 'producing'],
  },
})
