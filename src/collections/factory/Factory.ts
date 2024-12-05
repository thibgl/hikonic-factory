import type { CollectionConfig, Field, Tab } from 'payload'

interface Factory {
  slug: string
  products: string
  fields?: Field[]
  tabs?: Tab[]
}

export const Factory = ({ slug, products, fields = [], tabs = [] }: Factory): CollectionConfig => ({
  slug,
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
            },
            {
              name: 'products',
              type: 'checkbox',
              defaultValue: false,
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
            },
            { name: 'related', type: 'join', collection: slug, on: 'meta' },
          ],
        },
        ...tabs,
      ],
    },
  ],
  admin: {
    useAsTitle: 'name',
  },
})
