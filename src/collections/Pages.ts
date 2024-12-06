import type { CollectionConfig } from 'payload'
import { Product } from './factory/Product'
import { Layout } from './base/Layout'
import { ConditionalField } from '@/fields/Conditional'

export const Pages: CollectionConfig = Product({
  slug: 'v2pages',
  versions: true,
  factory: 'v2indexes',
  links: ['v2items'],
  fields: [
    ConditionalField({
      path: 'factoryData.name',
      value: 'Skills',
      fallback: false,
      nullify: false,
      field: {
        name: 'test2',
        type: 'checkbox',
        defaultValue: false,
      },
    }),
  ],
  tabs: [
    {
      label: 'Layout',
      fields: [
        ConditionalField({
          path: 'factory',
          value: false,
          fallback: true,
          field: Layout(),
        }),
      ],
    },
  ],
})
