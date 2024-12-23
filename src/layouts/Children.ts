import { Field } from 'payload'
import { ChildrenSection, Section } from './sections'

export const ChildrenLayout: Field = {
  name: 'childrenLayout',
  label: false,
  type: 'group',
  fields: [
    {
      name: 'hero',
      type: 'array',
      maxRows: 1,
      fields: ChildrenSection(false),
    },
    {
      name: 'main',
      type: 'array',
      fields: ChildrenSection(),
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
