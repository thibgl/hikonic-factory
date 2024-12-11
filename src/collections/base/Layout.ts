import type { Block, Field } from 'payload'
import { ConditionalField, IdSerializer } from '@/fields'

const WallBlock = (children = false): Block => ({
  slug: 'Wall',
  fields: [
    ...IdSerializer({
      name: 'factory',
      type: 'relationship',
      relationTo: ['indexes', 'tokens'],
      hidden: !children,
      filterOptions: ({ data, relationTo }) => {
        const neighbors = data.neighbors || []
        const tokens = data.tokens || []
        if (relationTo === 'tokens' && tokens.length > 0) {
          return {
            id: {
              in: tokens,
            },
          }
        }
        if (relationTo === 'indexes' && neighbors.length > 0) {
          return {
            id: {
              in: neighbors,
            },
          }
        }
        return false
      },
    }),
    {
      name: 'items',
      type: 'relationship',
      relationTo: 'items',
      hasMany: true,
      hidden: children,
    },
  ],
})

const Section = (children = false): Field[] => [
  {
    name: 'preset',
    type: 'relationship',
    relationTo: 'blocks',
    defaultValue: null,
    admin: {
      hidden: children,
    },
  },
  ...(ConditionalField({
    path: 'preset',
    value: null,
    field: [
      { name: 'header', type: 'text' },
      { name: 'body', type: 'richText' },
      {
        name: 'component',
        type: 'blocks',
        maxRows: 1,
        blocks: [WallBlock(children)],
      },
    ],
  }) as Field[]),
]

export const Layout = (name: string = 'layout', children = false): Field => ({
  name,
  label: false,
  type: 'group',
  fields: [
    {
      name: 'hero',
      type: 'group',
      fields: Section(children),
    },
    {
      name: 'main',
      type: 'array',
      fields: Section(children),
    },
    {
      name: 'footer',
      type: 'group',
      fields: Section(children),
    },
  ],
  admin: {
    hideGutter: true,
  },
})
