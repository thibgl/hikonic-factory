import type { Block } from 'payload'

export const ItemsChildrenBlock = (slug: string): Block => ({
  slug,
  labels: { singular: slug, plural: slug },
  fields: [
    {
      name: 'token',
      type: 'relationship',
      relationTo: 'tokens',
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
