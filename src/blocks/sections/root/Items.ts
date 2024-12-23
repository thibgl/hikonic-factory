import type { Block } from 'payload'

export const ItemsBlock = (slug: string): Block => ({
  slug,
  labels: { singular: slug, plural: slug },
  fields: [
    {
      name: 'items',
      type: 'relationship',
      relationTo: 'items',
      hasMany: true,
    },
  ],
})
