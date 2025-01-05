import type { Field } from 'payload'

export const ItemFields: Field[] = [
  { name: 'description', type: 'richText', localized: true },
  {
    name: 'illustration',
    type: 'upload',
    relationTo: 'media',
  },
]
