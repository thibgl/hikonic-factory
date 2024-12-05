import { Product } from './factory/Product'
import { ConditionalField } from '@/fields/Conditional'

export const Items = Product({
  slug: 'v2items',
  factory: 'v2tokens',
  fields: [
    {
      name: 'description',
      type: 'richText',
    },
    ConditionalField({
      path: 'factoryData.icon',
      value: true,
      fallback: false,
      field: {
        name: 'icon',
        type: 'text',
      },
    }),
  ],
})
