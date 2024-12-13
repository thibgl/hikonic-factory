const itemsBlocks = ['Wall']
const pageBlocks = ['Page']

import { ItemsBlock } from './root'
import { ItemsChildrenBlock } from './children'

export const RootBlocks = itemsBlocks.map((slug) => ItemsBlock(slug))
export const ChildrenBlocks = itemsBlocks.map((slug) => ItemsChildrenBlock(slug))
