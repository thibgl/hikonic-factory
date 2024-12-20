import type { Field } from 'payload'

import { RootBlocks } from '@/blocks/sections'
import { BaseSection, BaseOptions } from './Base'

export const Section: Field[] = [
  BaseOptions,
  BaseSection,
  {
    name: 'component',
    type: 'blocks',
    maxRows: 1,
    blocks: RootBlocks,
  },
]
