import type { Block } from 'payload'

export const PagesBlock = (slug: string): Block => ({
  slug,
  fields: [
    {
      name: 'pages',
      type: 'relationship',
      relationTo: ['indexes', 'pages'],
      hasMany: true,
    },
  ],
})
