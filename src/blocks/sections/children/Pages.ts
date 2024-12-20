import type { Block } from 'payload'

export const PagesChildrenBlock = (slug: string): Block => ({
  slug,
  fields: [
    {
      name: 'pages',
      type: 'relationship',
      relationTo: ['indexes', 'pages'],
      filterOptions: ({ data }) => {
        const neighbors = data.meta?.neighbors || []
        if (neighbors.length > 0) {
          return {
            id: {
              in: neighbors,
            },
          }
        }
        return false
      },
    },
  ],
})
