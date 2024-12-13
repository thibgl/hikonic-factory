import type { CollectionConfig } from 'payload'
// import { Item } from './base/Item'

export const Blocks: CollectionConfig = {
  slug: 'blocks',
  fields: [
    {
      name: 'block',
      type: 'blocks',
      blocks: [
        {
          slug: 'text',
          fields: [{ name: 'text', type: 'textarea' }],
        },
      ],
    },
    // { name: 'related', type: 'join', collection: 'v2pages', on: 'layout' },
  ],
}
