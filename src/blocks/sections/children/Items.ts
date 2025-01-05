import { ConditionalField } from '@/fields/Conditional'
import type { Block, DefaultValue, Field } from 'payload'

export const ItemsChildrenBlock = (slug: string): Block => ({
  slug,
  labels: { singular: slug, plural: slug },
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
})
