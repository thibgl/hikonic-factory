import type { Field } from 'payload'

export const ItemFields: Field[] = [
  { name: 'description', type: 'richText' },
  {
    name: 'illustration',
    type: 'upload',
    relationTo: 'media',
  },
]
