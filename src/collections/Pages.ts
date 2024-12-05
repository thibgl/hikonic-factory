import type { CollectionConfig } from 'payload'
import { Product } from './factory/Product'
import { Layout } from './base/Layout'
import { ConditionalField } from '@/fields/Conditional'

export const Pages: CollectionConfig = Product({
  slug: 'v2pages',
  factory: 'v2indexes',
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
      fields: [Layout()],
    },
  ],
})
