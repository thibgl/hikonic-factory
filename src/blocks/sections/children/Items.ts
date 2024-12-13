import type { Block } from 'payload'
import { IdSerializer } from '@/fields'

export const ItemsChildrenBlock = (slug: string): Block => ({
  slug,
  fields: [
    ...IdSerializer({
      name: 'factory',
      type: 'relationship',
      relationTo: ['tokens'],
      filterOptions: ({ data, relationTo }) => {
        const neighbors = data.meta?.neighbors || []
        const tokens = data.meta?.tokens || []
        if (relationTo === 'tokens' && tokens.length > 0) {
          return {
            id: {
              in: tokens,
            },
          }
        }
        if (relationTo === 'indexes' && neighbors.length > 0) {
          return {
            id: {
              in: neighbors,
            },
          }
        }
        return false
      },
    }),
  ],
})
