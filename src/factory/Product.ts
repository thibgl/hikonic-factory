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
              // access: {
              //   read: ({ req: { user } }) => Boolean(user),
              // },
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
  // hooks: {
  //   afterRead: [
  //     async ({ doc, req: { payload } }) => {
  //       const res = await payload.find({
  //         collection: factory as CollectionSlug,
  //         where: {
  //           id: { equals: doc.factory },
  //         },
  //       })

  //       doc.factoryData = res.docs[0]
  //       return doc
  //     },
  //   ],
  // },
  admin: {
    ...(incomingConfig.admin || {}),
    useAsTitle: 'name',
    defaultColumns: ['name', 'factory'],
  },
  // endpoints: [
  //   {
  //     path: '/sync',
  //     method: 'post',
  //     handler: async (req) => {
  //       try {
  //         const factory = await req.json()
  //         console.log('factory', factory)
  //         // Get all products for this factory
  //         const products = await req.payload.find({
  //           collection: incomingConfig.slug as CollectionSlug,
  //           where: {
  //             factory: { equals: factory.id },
  //           },
  //           depth: 1,
  //         })

  //         const updatePromises = products.docs.map(async (product) => {
  //           const updates: Record<string, any> = {
  //             factoryData: factory,
  //           }

  //           if (filterNeighbors && product.neighbors) {
  //             updates.neighbors = product.neighbors.filter((neighbor) =>
  //               factory.neighbors?.some(
  //                 (factoryNeighbor) => factoryNeighbor.id === neighbor.factory,
  //               ),
  //             )
  //           }

  //           portsFrom.forEach((port) => {
  //             if (product[port.products]) {
  //               const factoryLinks = factory[port.factory] || []
  //               updates[port.products] = product[port.products].filter((product) =>
  //                 factoryLinks.some((link) => link.id === product.factory),
  //               )
  //             }
  //           })

  //           return req.payload.update({
  //             collection: incomingConfig.slug as CollectionSlug,
  //             id: product.id,
  //             data: updates,
  //           })
  //         })

  //         const results = await Promise.all(updatePromises)
  //         return Response.json(results)
  //       } catch (error) {
  //         console.error('Error syncing factory data:', error)
  //         return Response.json({ error: 'Internal Server Error' }, { status: 500 })
  //       }
  //     },
  //   },
  // ],
})
