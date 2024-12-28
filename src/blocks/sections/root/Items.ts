import type { Block } from 'payload'

export const ItemsBlock = (slug: string): Block => ({
  slug,
  labels: { singular: slug, plural: slug },
  fields: [
    {
      name: 'token',
      type: 'relationship',
      relationTo: 'tokens',
    },
    {
      name: 'items',
      type: 'relationship',
      relationTo: 'items',
      hasMany: true,
      filterOptions: ({ siblingData }) => {
        if (siblingData?.token) {
          return {
            factory: { equals: siblingData.token },
          }
        }
        return false
      },
    },
  ],
})
