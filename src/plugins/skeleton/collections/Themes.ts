import type { CollectionConfig } from 'payload'

export const SkeletonThemes: CollectionConfig = {
  access: {
    create: () => true,
    read: () => true,
    update: () => true,
    delete: () => true,
  },
  slug: 'skeletonThemes',
  labels: {
    singular: 'Theme',
    plural: 'Themes',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Theme',
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
            },
            {
              name: 'label',
              type: 'text',
              required: true,
            },
            { name: 'default', type: 'checkbox', required: true },
            { name: 'enhancements', type: 'checkbox', required: true },
          ],
        },
        {
          label: 'Colors',
          fields: [
            {
              name: 'colors',
              type: 'json',
              label: 'Json',
            },
          ],
        },
        {
          label: 'Source',
          fields: [
            {
              name: 'source',
              type: 'json',
              label: 'Json',
              required: true,
            },
          ],
        },
      ],
    },
  ],
  admin: {
    useAsTitle: 'label',
    defaultColumns: ['label', 'default', 'enhancements'],
    hidden: true,
  },
}
