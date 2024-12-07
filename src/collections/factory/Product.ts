import type { CollectionConfig, CollectionSlug, Tab } from 'payload'
import type { FactoryIdentity } from './types'

export interface Product extends CollectionConfig {
  factory: string
  tabs?: Tab[]
  shipsTo?: FactoryIdentity[]
  portsFrom?: FactoryIdentity[]
  filterNeighbors?: boolean
}

export const Product = ({
  factory,
  tabs = [],
  shipsTo = [],
  portsFrom = [],
  filterNeighbors = false,
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
              required: true,
              relationTo: factory as CollectionSlug,
              filterOptions: () => {
                return {
                  producing: { equals: true },
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
              filterOptions: ({ id }) => {
                if (filterNeighbors) {
                  const factoryNeighbors = data?.factoryData?.neighbors || []
                  return factoryNeighbors.length > 0
                    ? {
                        neighbors: {
                          in: factoryNeighbors.map((product) => product.id),
                        },
                      }
                    : {
                        neighbors: {
                          exists: false, // This ensures no results when array is empty/undefined
                        },
                      }
                }
                return {
                  id: { not_equals: id },
                }
              },
              // admin: {
              //   components: {
              //     Field:
              //   }
              // }
            },
            ...portsFrom.map((port, i) => ({
              name: port.products,
              type: 'relationship',
              relationTo: port.products as CollectionSlug,
              hasMany: true,
              filterOptions: ({ data }) => {
                const factoryProducts = data?.factoryData?.[port.products] || []
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
              name: port.products,
              type: 'join',
              collection: port.products as CollectionSlug,
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
    defaultColumns: ['name', 'factory'],
  },
})
