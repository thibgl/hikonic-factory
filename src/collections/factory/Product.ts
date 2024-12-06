import type { CollectionConfig, CollectionSlug, Field, Tab } from 'payload'

export interface Product extends CollectionConfig {
  factory: string
  meta?: Field[]
  related?: Field[]
  tabs?: Tab[]
  shipsTo?: string[]
  portsFrom?: string[]
  portsFromFactories?: string[]
}

export const Product = ({
  factory,
  meta = [],
  related = [],
  tabs = [],
  shipsTo = [],
  portsFrom = [],
  portsFromFactories = [],
  ...incomingConfig
}: Product): CollectionConfig => ({
  ...incomingConfig,
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Product',
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
              unique: true,
            },
            {
              name: 'factory',
              type: 'relationship',
              relationTo: factory as CollectionSlug,
              filterOptions: () => {
                return {
                  products: { equals: true },
                }
              },
            },
            {
              name: 'factoryData',
              type: 'json',
              access: {
                read: ({ req: { user } }) => Boolean(user),
              },
              admin: {
                components: {
                  Field: 'src/components/FactoryOverseer#FactoryOverseer',
                  clientProps: {
                    factory,
                  },
                },
              },
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
              // admin: {
              //   components: {
              //     Field:
              //   }
              // }
            },
            ...portsFrom.map((port, i) => ({
              name: port,
              type: 'relationship',
              relationTo: port as CollectionSlug,
              hasMany: true,
              filterOptions: ({ data }) => {
                const factoryProducts = data?.factoryData?.[portsFromFactories?.[i]] || []
                return factoryProducts.length > 0
                  ? {
                      factory: {
                        in: factoryProducts.map((product) => product.id),
                      },
                    }
                  : {
                      factory: {
                        exists: false, // This ensures no results when array is empty/undefined
                      },
                    }
              },
            })),
            ...meta,
          ],
        },
        {
          label: 'Related',
          fields: [
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
            ...related,
          ],
          ...related,
        },
        ...tabs,
      ],
    },
  ],
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'factory'],
  },
})
