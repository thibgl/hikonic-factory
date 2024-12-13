import { Field } from 'payload'
import { Section } from './sections'

export const RootLayout: Field = {
  name: 'layout',
  label: false,
  type: 'group',
  fields: [
    {
      name: 'hero',
      type: 'array',
      maxRows: 1,
      fields: Section,
    },
    {
      name: 'main',
      type: 'array',
      fields: Section,
    },
    {
      name: 'footer',
      type: 'array',
      maxRows: 1,
      fields: Section,
    },
  ],
  admin: {
    hideGutter: true,
  },
}
