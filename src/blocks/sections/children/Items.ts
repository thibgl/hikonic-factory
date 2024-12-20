import type { Block } from 'payload'

export const ItemsChildrenBlock = (slug: string): Block => ({
  slug,
  fields: [
    {
      name: 'items',
      type: 'relationship',
      relationTo: ['tokens'],
      filterOptions: ({ data }) => {
        const tokens = data.meta?.tokens || []
        if (tokens.length > 0) {
          return {
            id: {
              in: tokens,
            },
          }
        }
        return false
      },
    },
  ],
})
