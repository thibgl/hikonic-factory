import type { CollectionConfig, Field } from 'payload'

export interface Item {
  slug: string
  fields?: any[]
}

export const Item = ({ slug, fields }: Item): CollectionConfig => ({
  slug,
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    ...(fields || []),
  ],
  admin: {
    useAsTitle: 'title',
  },
})
