import type { CollectionConfig } from 'payload'
import { BaseSection } from '@/layouts/sections/Base'
import { RootBlocks } from '@/blocks/sections'
// import { Item } from './base/Item'

export const Sections: CollectionConfig = {
  slug: 'sections',
  fields: [
    ...BaseSection(),
    {
      name: 'component',
      type: 'blocks',
      maxRows: 1,
      blocks: RootBlocks,
    },
  ],
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug'],
  },
}
