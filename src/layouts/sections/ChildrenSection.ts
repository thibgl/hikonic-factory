import { Field } from 'payload'
import { ChildrenBlocks } from '@/blocks/sections'
import { BaseSection, BaseOptions } from './Base'

export const ChildrenSection: Field[] = [
  BaseOptions,
  BaseSection,
  {
    name: 'component',
    type: 'blocks',
    maxRows: 1,
    blocks: ChildrenBlocks,
  },
]
