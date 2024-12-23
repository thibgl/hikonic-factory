import { Field } from 'payload'
import { Section } from './sections'

export const RootLayout: Field = {
  name: 'layout',
  label: false,
  type: 'group',
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'websiteBeforeMain', type: 'checkbox', defaultValue: true },
        { name: 'websiteAfterMain', type: 'checkbox', defaultValue: true },
      ],
    },
    {
      name: 'hero',
      type: 'array',
      maxRows: 1,
      fields: Section(false),
    },
    {
      name: 'main',
      type: 'array',
      fields: Section(),
    },
    {
      name: 'footer',
      type: 'array',
      maxRows: 1,
      fields: Section(false),
    },
  ],
  admin: {
    hideGutter: true,
  },
}
