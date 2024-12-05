import type { CollectionConfig, Field, Tab } from 'payload'
import { Layout } from './Layout'

interface Product {
  slug: string
  factory: string
  fields?: Field[]
  tabs?: Tab[]
}

export const Product = ({ slug, factory, fields = [], tabs = [] }: Product): CollectionConfig => ({
  slug,
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
            },
            {
              name: 'factory',
              type: 'relationship',
              relationTo: factory,
              filterOptions: () => {
                return {
                  products: { equals: true },
                }
              },
            },
            {
              name: 'factoryData',
              type: 'json',
              virtual: true,
              admin: {
                components: {
                  Field: 'src/components/FactoryWatcher#FactoryWatcher',
                },
              },
            },
            ...fields,
          ],
        },
        {
          label: 'Meta',
          fields: [
            {
              name: 'meta',
              type: 'relationship',
              relationTo: slug,
              hasMany: true,
              filterOptions: ({ id }) => ({
                id: { not_equals: id },
              }),
              // admin: {
              //   components: {
              //     Field:
              //   }
              // }
            },
            { name: 'related', type: 'join', collection: slug, on: 'meta' },
          ],
        },
        ...tabs,
      ],
    },
  ],
  hooks: {
    beforeRead: [
      async ({ doc, req }) => {
        const res = await req.payload.find({
          collection: factory,
          where: {
            id: { equals: doc.factory },
          },
        })
        console.log('res', res)
        doc.factoryData = res.docs[0]
        return doc
      },
    ],
    afterChange: [
      async ({ doc, req }) => {
        const res = await req.payload.find({
          collection: factory,
          where: {
            id: { equals: doc.factory },
          },
        })
        console.log('res', res)
        doc.factoryData = res.docs[0]
        return doc
      },
    ],
  },
  admin: {
    useAsTitle: 'name',
  },
})
