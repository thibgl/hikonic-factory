import { RootBlocks } from '@/blocks/sections'
import { ConditionalField } from '@/fields'
import { Field } from 'payload'

export const Section: Field[] = [
  {
    name: 'preset',
    type: 'relationship',
    relationTo: 'blocks',
    defaultValue: null,
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
        blocks: RootBlocks,
      },
    ],
  }) as Field[]),
]
