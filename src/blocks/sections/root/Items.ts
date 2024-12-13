import type { Block } from 'payload'

export const ItemsBlock = (slug: string): Block => ({
  slug,
  fields: [
    {
      name: 'items',
      type: 'relationship',
      relationTo: 'items',
      hasMany: true,
    },
  ],
})
