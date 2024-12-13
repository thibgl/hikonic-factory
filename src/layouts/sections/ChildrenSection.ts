import { Field } from 'payload'
import { ChildrenBlocks } from '@/blocks/sections'

export const ChildrenSection: Field[] = [
  { name: 'header', type: 'text' },
  { name: 'body', type: 'richText' },
  {
    name: 'component',
    type: 'blocks',
    maxRows: 1,
    blocks: ChildrenBlocks,
  },
]
