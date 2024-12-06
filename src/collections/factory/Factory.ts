import type { CollectionConfig, CollectionSlug, Field, Tab } from 'payload'

export interface Factory extends CollectionConfig {
  products: string
  meta?: Field[]
  related?: Field[]
  tabs?: Tab[]
  shipsTo?: string[]
  portsFrom?: string[]
}

export const Factory = ({
  products,
  meta = [],
  related = [],
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
              name: 'products',
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
              name: port,
              type: 'relationship',
              relationTo: port as CollectionSlug,
              hasMany: true,
            })),
          ],
        },
        {
          label: 'Related',
          fields: [
            {
              name: 'produced',
              type: 'join',
              collection: products as CollectionSlug,
              on: 'factory',
            },
            {
              name: 'related',
              label: 'Neighbors',
              type: 'join',
              collection: incomingConfig.slug as CollectionSlug,
              on: 'neighbors',
            },
            ...shipsTo.map((port) => ({
              name: port,
              type: 'join',
              collection: port as CollectionSlug,
              on: incomingConfig.slug,
            })),
          ],
        },
        ...tabs,
      ],
    },
  ],
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'products'],
  },
})
