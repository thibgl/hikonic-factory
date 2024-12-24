import type { Field } from 'payload'

import { RootBlocks } from '@/blocks/sections'
import { ConditionalField } from '@/fields'
import { BaseSection, BaseOptions } from './Base'

export const Section = (main = true): Field[] => [
  {
    name: 'preset',
    type: 'relationship',
    relationTo: 'sections',
    defaultValue: null,
  },
  ...BaseOptions,
  ...(ConditionalField({
    path: 'preset',
    value: null,
    field: [
      ...BaseSection(main),
      {
        name: 'component',
        type: 'blocks',
        maxRows: 1,
        blocks: RootBlocks,
      },
    ],
  }) as Field[]),
]
