import type { Block, DefaultValue, Field } from 'payload'
import { ConditionalField } from '@/fields/Conditional'

export const WallBlock: Block = {
  slug: 'Wall',
  labels: { singular: 'Wall', plural: 'Wall' },
  fields: [
    ConditionalField({
      path: 'relatedToken',
      value: null,
      field: {
        name: 'token',
        type: 'relationship',
        relationTo: 'tokens',
        defaultValue: null as unknown as DefaultValue,
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
    }) as Field,
    ConditionalField({
      path: 'token',
      value: null,
      negate: true,
      field: {
        name: 'by',
        type: 'relationship',
        relationTo: ['indexes', 'tokens'],
        filterOptions: ({ siblingData, relationTo }) => {
          if (relationTo === 'indexes') {
            return {
              producing: {
                equals: true,
              },
            }
          }
          if (relationTo === 'tokens') {
            return {
              id: {
                not_equals: siblingData?.token,
              },
            }
          }
        },
      },
    }) as Field,
    ConditionalField({
      path: 'token',
      value: null,
      field: {
        name: 'relatedToken',
        type: 'relationship',
        relationTo: 'tokens',
        defaultValue: null as unknown as DefaultValue,
        filterOptions: ({ id }) => ({
          'meta.indexes': {
            contains: id,
          },
        }),
      },
    }) as Field,
  ],
}
