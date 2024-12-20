import type { Block, Field } from 'payload'
import { ConditionalField } from '@/fields/Conditional'

export const ItemsBlock = (slug: string): Block => ({
  slug,
  fields: [
    {
      name: 'token',
      type: 'relationship',
      relationTo: 'tokens',
      filterOptions: ({ data }) => {
        const tokens = data.meta?.tokens || data.factoryData?.meta?.tokens || []
        if (tokens.length > 0) {
          return {
            id: { in: tokens },
          }
        }
        return false
      },
    },
    {
      name: 'items',
      type: 'relationship',
      relationTo: 'items',
      hasMany: true,
      filterOptions: ({ siblingData }) => {
        return {
          factory: { equals: siblingData.token },
        }
      },
      admin: {
        condition: (data, siblingData) => {
          return siblingData.token !== undefined
        },
      },
    },
  ],
})
