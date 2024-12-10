import type { CollectionConfig, CollectionSlug, Field, Tab } from 'payload'
import type { FactoryIdentity, OptionalCollection } from './types'

export interface Product extends OptionalCollection {
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
              access: {
                read: ({ req: { user } }) => Boolean(user),
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
                  Field: 'src/factory/components/FactoryOverseer#FactoryOverseer',
                  clientProps: {
                    factory,
                  },
                },
              },
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
              filterOptions: ({ id, data }) => {
                if (filterNeighbors) {
                  const factoryNeighbors = data?.factoryData?.neighbors || []
                  return factoryNeighbors.length > 0
                    ? {
                        factory: {
                          in: factoryNeighbors.map((product) => product.id),
                        },
                      }
                    : false
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
            ...(portsFrom.map((port) => ({
              name: port.products,
              type: 'relationship',
              relationTo: port.products as CollectionSlug,
              hasMany: true,
              filterOptions: ({ data }) => {
                const factoryLinks = data?.factoryData?.[port.factory] || []
                return factoryLinks.length > 0
                  ? {
                      factory: {
                        in: factoryLinks.map((link) => link.id),
                      },
                    }
                  : false
              },
            })) as Field[]),
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
            ...(shipsTo.map((port) => ({
              name: port.products,
              type: 'join',
              collection: port.products as CollectionSlug,
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
    defaultColumns: ['name', 'factory'],
  },
})
