import type { CollectionConfig } from 'payload'
import { Factory } from './factory/Factory'
import { Layout } from './base/Layout'
import { ConditionalField } from '@/fields/Conditional'

export const Indexes: CollectionConfig = Factory({
  slug: 'v2indexes',
  versions: true,
  products: 'v2pages',
  links: ['v2tokens'],
  fields: [
    {
      name: 'home',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'paginated',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
  tabs: [
    {
      label: 'Layout',
      fields: [Layout()],
    },
    {
      label: 'Children Layout',
      fields: [
        ConditionalField({
          path: 'products',
          value: true,
          fallback: false,
          sibling: false,
          field: Layout('childrenLayout'),
        }),
      ],
    },
  ],
})
