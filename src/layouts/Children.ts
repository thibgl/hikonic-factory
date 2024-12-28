import { Field } from 'payload'
import { ChildrenSection, Section } from './sections'

export const ChildrenLayout: Field = {
  name: 'childrenLayout',
  label: false,
  type: 'group',
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'websiteBeforeMain', type: 'checkbox', defaultValue: true },
        { name: 'websiteAfterMain', type: 'checkbox', defaultValue: true },
        { name: 'websiteHero', type: 'checkbox' },
        { name: 'websiteFooter', type: 'checkbox' },
      ],
    },
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
