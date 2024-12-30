import type { CollectionConfig, CollectionSlug, Field, Tab } from 'payload'
import type { FactoryIdentity, OptionalCollection } from './types'

export interface Product extends OptionalCollection {
  identity: FactoryIdentity
  tabs?: Tab[]
  shipsTo?: FactoryIdentity[]
  portsFrom?: FactoryIdentity[]
  filterNeighbors?: boolean
}

export const Product = ({
  identity,
  tabs = [],
  shipsTo = [],
  portsFrom = [],
  filterNeighbors = false,
  ...incomingConfig
}: Product): CollectionConfig => ({
  ...incomingConfig,
  slug: identity.products.plural,
  fields: [
    {
      name: 'factoryData',
      type: 'json',
      // access: {
      //   read: ({ req: { user } }) => Boolean(user),
      // },
      admin: {
        components: {
          Field: {
            path: 'src/plugins/factory/components/FactoryOverseer#FactoryOverseer',
            clientProps: {
              factory: identity.factory.plural,
            },
          },
        },
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label:
            identity.products.singular.charAt(0).toUpperCase() +
            identity.products.singular.slice(1),
          fields: [
            {
              name: 'factory',
              type: 'relationship',
              required: true,
              relationTo: identity.factory.plural as CollectionSlug,
              filterOptions: () => {
                return {
                  producing: { equals: true },
                }
              },
            },
            {
              name: 'updated',
              type: 'checkbox',
              defaultValue: true,
              admin: {
                readOnly: true,
                hidden: true,
              },
            },
            {
              name: 'title',
              type: 'text',
              required: true,
              unique: true,
            },
            ...(incomingConfig.fields || []),
          ],
        },
        ...tabs,
        {
          name: 'meta',
          fields: [
            {
              name: 'neighbors',
              type: 'relationship',
              relationTo: identity.products.plural as CollectionSlug,
              hasMany: true,
              filterOptions: ({ id, data }) => {
                if (filterNeighbors) {
                  const factoryNeighbors = data?.factoryData?.meta?.neighbors || []
                  if (factoryNeighbors.length > 0) {
                    return {
                      factory: {
                        in: factoryNeighbors,
                      },
                    }
                  }
                  return false
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
              name: port.products.plural,
              type: 'relationship',
              relationTo: port.products.plural as CollectionSlug,
              hasMany: true,
              filterOptions: ({ data }) => {
                const factoryLinks = data?.factoryData?.meta?.[port.factory.plural] || []
                if (factoryLinks.length > 0) {
                  return {
                    factory: {
                      in: factoryLinks,
                    },
                  }
                }
                return false
              },
            })) as Field[]),
          ],
        },
        {
          name: 'related',
          fields: [
            {
              name: 'neighbors',
              type: 'join',
              collection: identity.factory.plural as CollectionSlug,
              on: 'meta.neighbors',
            },
            ...(shipsTo.map((port) => ({
              name: port.products.plural,
              type: 'join',
              collection: port.products.plural as CollectionSlug,
              on: `meta.${identity.products.plural}`,
            })) as Field[]),
          ],
        },
      ],
    },
  ],
  admin: {
    ...incomingConfig.admin,
    useAsTitle: 'title',
    defaultColumns: [
      ...['title', 'factory', 'updated'],
      ...(incomingConfig.admin?.defaultColumns || []),
    ],
  },
  hooks: {
    ...incomingConfig.hooks,
    beforeValidate: [
      ...(incomingConfig.hooks?.beforeValidate || []),
      async ({ data, req }) => {
        if (data && req.url?.includes('/api/')) {
          data.updated = true
          return data
        }
      },
    ],
    // beforeChange: [
    //   async ({ data, req }) => {
    //     if (data) {
    //       data.factoryData = null
    //       return data
    //     }
    //   },
    // ],
    // afterRead: [
    //   async ({ doc, req: { payload } }) => {
    //     console.log(doc)
    //     const res = await payload.find({
    //       collection: factory as CollectionSlug,
    //       where: {
    //         id: { equals: doc.factory },
    //       },
    //     })
    //     // console.log(res.docs[0])
    //     doc.data = res.docs[0]
    //     return doc
    //   },
    // ],
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
