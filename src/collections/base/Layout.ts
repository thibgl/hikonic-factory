import type { Field } from 'payload'
import { ConditionalField } from '@/fields/Conditional'

const Section: Field[] = [
  {
    name: 'preset',
    type: 'relationship',
    relationTo: 'v2blocks',
  },
  ConditionalField({
    path: 'preset',
    value: true,
    fallback: true,
    field: {
      name: 'section',
      type: 'select',
      options: ['hero', 'text'],
    },
  }),
]

export const Layout = (name: string = 'layout'): Field => ({
  name,
  label: false,
  type: 'group',
  fields: [
    {
      name: 'hero',
      type: 'group',
      fields: Section,
    },
    {
      name: 'main',
      type: 'array',
      fields: Section,
    },
    {
      name: 'footer',
      type: 'group',
      fields: Section,
    },
  ],
  admin: {
    hideGutter: true,
  },
})
