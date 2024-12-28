import type { Block, Field, DefaultValue } from 'payload'
import { ConditionalField } from '@/fields/Conditional'

export const PagesChildrenBlock = (slug: string): Block => ({
  slug,
  labels: { singular: slug, plural: slug },
  fields: [
    ConditionalField({
      path: 'related',
      value: null,
      field: {
        name: 'index',
        type: 'relationship',
        relationTo: 'indexes',
        defaultValue: null as unknown as DefaultValue,
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
    }) as Field,
    ConditionalField({
      path: 'index',
      value: null,
      field: {
        name: 'related',
        type: 'relationship',
        relationTo: 'indexes',
        defaultValue: null as unknown as DefaultValue,
        filterOptions: ({ id }) => ({
          'meta.neighbors': {
            contains: id,
          },
        }),
      },
    }) as Field,
  ],
})
