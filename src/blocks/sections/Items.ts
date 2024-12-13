import type { Block } from 'payload'
import { IdSerializer } from '@/fields'

export const ItemsBlock = (slug: string, children: boolean = false): Block => ({
  slug,
  fields: [
    {
      name: 'items',
      type: 'relationship',
      relationTo: 'items',
      hasMany: true,
      hidden: children,
    },
    ...IdSerializer({
      name: 'factory',
      type: 'relationship',
      relationTo: ['tokens'],
      hidden: !children,
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
