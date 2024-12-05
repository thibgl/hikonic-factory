import type { CollectionConfig, Field, Tab } from 'payload'

interface Factory {
  slug: string
  products: string
  fields?: Field[]
  meta?: Field[]
  related?: Field[]
  tabs?: Tab[]
  relations?: string[]
}

export const Factory = ({
  slug,
  products,
  fields = [],
  meta = [],
  related = [],
  tabs = [],
  relations = [],
}: Factory): CollectionConfig => ({
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
              name: 'neighbors',
              type: 'relationship',
              relationTo: slug,
              hasMany: true,
              filterOptions: ({ id }) => ({
                id: { not_equals: id },
              }),
            },
            ...relations.map((relation) => ({
              name: relation,
              type: 'relationship',
              relationTo: relation,
              hasMany: true,
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
        },
        ...tabs,
      ],
    },
  ],
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'products', ...fields.map((field) => field.name)],
  },
})
