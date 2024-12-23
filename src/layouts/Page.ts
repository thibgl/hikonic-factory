import { Field } from 'payload'
import { Section } from './sections'

export const PageLayout: Field = {
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
      name: 'beforeMain',
      type: 'array',
      fields: Section(),
    },
    {
      name: 'afterMain',
      type: 'array',
      fields: Section(),
    },
  ],
  admin: {
    hideGutter: true,
  },
}
