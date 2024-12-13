const itemsBlocks = ['Wall']
const pageBlocks = ['Page']

import { ItemsBlock } from './Items'

export const RootBlocks = itemsBlocks.map((slug) => ItemsBlock(slug))
export const ChildrenBlocks = itemsBlocks.map((slug) => ItemsBlock(slug, true))
