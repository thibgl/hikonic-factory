import type { CollectionConfig, CollectionSlug, Field, Tab } from 'payload'
import type { FactoryIdentity, OptionalCollection } from './types'

import { ConditionalField } from '@/fields/Conditional'

export interface Factory extends OptionalCollection {
  identity: FactoryIdentity
  products: string
  tabs?: Tab[]
  options?: Field[]
  shipsTo?: FactoryIdentity[]
  portsFrom?: FactoryIdentity[]
  productsMaxDepth?: number
}

export const Factory = ({
  identity,
  tabs = [],
  options = [],
  shipsTo = [],
  portsFrom = [],
  productsMaxDepth = 2,
  ...incomingConfig
}: Factory): CollectionConfig => ({
  ...incomingConfig,
  slug: identity.factory.plural,
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label:
            identity.factory.singular.charAt(0).toUpperCase() + identity.factory.singular.slice(1),
          fields: [
            {
              name: 'producing',
              type: 'checkbox',
              defaultValue: false,
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
        ...(options.length > 0 ? [{ name: 'options', fields: options }] : []),
        {
          name: 'meta',
          fields: [
            {
              name: 'neighbors',
              type: 'relationship',
              relationTo: identity.factory.plural as CollectionSlug,
              hasMany: true,
              filterOptions: ({ id }) =>
                id
                  ? {
                      id: { not_equals: id },
                    }
                  : true,
            },
            ...(portsFrom.map((port) => ({
              name: port.factory.plural,
              type: 'relationship',
              relationTo: port.factory.plural as CollectionSlug,
              hasMany: true,
            })) as Field[]),
          ],
        },
        {
          name: 'related',
          fields: [
            ConditionalField({
              path: 'producing',
              value: true,
              sibling: false,
              field: {
                name: 'products',
                type: 'join',
                collection: identity.products.plural as CollectionSlug,
                on: 'factory',
                maxDepth: productsMaxDepth,
              },
            }) as Field,
            {
              name: 'neighbors',
              type: 'join',
              collection: identity.factory.plural as CollectionSlug,
              on: 'meta.neighbors',
            },
            ...(shipsTo.map((port) => ({
              name: port.factory.plural,
              type: 'join',
              collection: port.factory.plural as CollectionSlug,
              on: `meta.${identity.factory.plural}`,
            })) as Field[]),
          ],
        },
      ],
    },
  ],
  admin: {
    ...incomingConfig.admin,
    useAsTitle: 'title',
    defaultColumns: [...['title', 'producing'], ...(incomingConfig.admin?.defaultColumns || [])],
  },
  hooks: {
    ...incomingConfig.hooks,
    afterChange: [
      ...(incomingConfig.hooks?.afterChange || []),
      async ({ doc, req: { payload } }) => {
        await payload.update({
          collection: identity.products.plural as CollectionSlug,
          where: {
            factory: { equals: doc.id },
          },
          data: {
            updated: false,
          },
        })
      },
    ],
    // beforeValidate: [
    //   async ({ req: { payload }, operation, doc }) => {
    //     if (operation === 'update') {
    //       // Helper function to recursively find and process relationship fields
    //       const processFields = (fields: Field[]) => {
    //         fields.forEach(field => {
    //           if (field.type === 'tabs' && field.tabs) {
    //             field.tabs.forEach(tab => {
    //               if (tab.fields) processFields(tab.fields)
    //             })
    //           }
    //           if (field.type === 'relationship') {
    //             // Filter product relationships
    //             if (field.relationTo === products) {
    //               if (field.hasMany && doc[field.name]) {
    //                 doc[field.name] = doc[field.name].filter(item =>
    //                   item.producing === true
    //                 )
    //               } else if (!field.hasMany && doc[field.name]) {
    //                 const product = await payload.findByID({
    //                   collection: products as CollectionSlug,
    //                   id: doc[field.name]
    //                 })
    //                 if (!product?.producing) {
    //                   doc[field.name] = null
    //                 }
    //               }
    //             }
    //             // Filter portsFrom relationships
    //             const portConfig = portsFrom.find(port =>
    //               port.factory === field.relationTo
    //             )
    //             if (portConfig) {
    //               if (field.hasMany && doc[field.name]) {
    //                 doc[field.name] = doc[field.name].filter(item => {
    //                   // Add your filtering logic here based on the port configuration
    //                   return true // Replace with actual condition
    //                 })
    //               } else if (!field.hasMany && doc[field.name]) {
    //                 // Add your single relationship filtering logic here
    //                 // Similar to the Product sync endpoint
    //               }
    //             }
    //           }
    //         })
    //       }
    //       // Start processing from the top-level fields
    //       if (incomingConfig.fields) {
    //         processFields(incomingConfig.fields)
    //       }
    //       // Keep existing neighbors reset
    //       doc.neighbors = []
    //     }
    //   },
    // // ],
    // afterChange: [
    //   async ({ req: { payload }, operation, doc }) => {
    //     if (operation === 'update') {
    //       const factory = await payload.findByID({
    //         collection: incomingConfig.slug as CollectionSlug,
    //         id: doc.id,
    //       })
    //       const origin = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
    //       await fetch(`${origin}/api/${products}/sync`, {
    //         method: 'post',
    //         headers: {
    //           'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(factory),
    //       })
    //     }
    //   },
    // ],
  },
})
