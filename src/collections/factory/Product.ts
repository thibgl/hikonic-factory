import type { CollectionConfig, Field, Tab } from 'payload'
import { Layout } from './Layout'

interface Product {
  slug: string
  factory: string
  fields?: Field[]
  meta?: Field[]
  related?: Field[]
  tabs?: Tab[]
  relations?: string[]
}

export const Product = ({
  slug,
  factory,
  fields = [],
  meta = [],
  related = [],
  tabs = [],
  relations = [],
}: Product): CollectionConfig => ({
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
                  Field: 'src/components/FactoryOverseer#FactoryOverseer',
                  clientProps: {
                    factory,
                  },
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
              name: 'neighbors',
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
            ...relations.map((relation) => ({
              name: relation,
              type: 'relationship',
              relationTo: relation,
              hasMany: true,
              filterOptions: ({ data }) => ({
                factory: { in: data.factoryData.v2tokens.map((token) => token.id) },
              }),
            })),
            ...meta,
          ],
        },
        {
          label: 'Related',
          fields: [
            { name: 'related', type: 'join', collection: slug, on: 'neighbors' },
            ...related,
          ],
          ...related,
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
        // console.log('res', res)
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
        // console.log('res', res)
        doc.factoryData = res.docs[0]
        return doc
      },
    ],
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'factory', ...fields.map((field) => field.name)],
  },
})
