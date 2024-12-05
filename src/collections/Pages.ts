import type { CollectionConfig } from 'payload'
import { Product } from './factory/Product'
import { Layout } from './base/Layout'
import { ConditionalField } from '@/fields/Conditional'

export const Pages: CollectionConfig = Product({
  slug: 'v2pages',
  factory: 'v2indexes',
  relations: ['v2items'],
  fields: [
    ConditionalField({
      path: 'factoryData.title',
      value: 'Skills',
      fallback: false,
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
