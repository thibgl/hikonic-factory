import { Factory } from './factory/Factory'

export const Tokens = Factory({
  slug: 'v2tokens',
  products: 'v2items',
  fields: [
    { name: 'colors', type: 'select', options: ['1', '2', '3'] },
    { name: 'icon', type: 'checkbox' },
  ],
})
