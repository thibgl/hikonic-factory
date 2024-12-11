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
  // hooks: {
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
  // },
})
