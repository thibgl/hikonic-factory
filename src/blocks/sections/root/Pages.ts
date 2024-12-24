import { ConditionalField } from '@/fields/Conditional'
import type { Block, Field } from 'payload'

export const PagesBlock = (slug: string): Block => ({
  slug,
  labels: { singular: slug, plural: slug },
  fields: [
    {
      name: 'index',
      type: 'relationship',
      relationTo: 'indexes',
    },
    {
      name: 'pages',
      type: 'relationship',
      relationTo: ['indexes', 'pages'],
      hasMany: true,
      filterOptions: ({ id, siblingData, relationTo }) => {
        if (siblingData?.index) {
          if (relationTo === 'pages') {
            return {
              factory: { equals: siblingData.index },
            }
          }
          if (relationTo === 'indexes') {
            return false
          }
        } else {
          return {
            id: { not_equals: id },
          }
        }
      },
    },
  ],
})
