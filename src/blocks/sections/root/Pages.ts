import { ConditionalField } from '@/fields/Conditional'
import type { Block, Field } from 'payload'

export const PagesBlock = (slug: string): Block => ({
  slug,
  labels: { singular: slug, plural: slug },
  fields: [
    {
      name: 'pages',
      type: 'relationship',
      relationTo: ['indexes', 'pages'],
      hasMany: true,
    },
  ],
})
