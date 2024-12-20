const itemsBlocks = ['ItemCards', 'Wall']
const pageBlocks = ['Page', 'PageCards', 'Slider']

import { ItemsBlock, PagesBlock } from './root'
import { ItemsChildrenBlock, PagesChildrenBlock } from './children'
import { ContentBlocks } from './content'

export const RootBlocks = [
  ...itemsBlocks.map((slug) => ItemsBlock(slug)),
  ...pageBlocks.map((slug) => PagesBlock(slug)),
  ...ContentBlocks,
]
export const ChildrenBlocks = [
  ...itemsBlocks.map((slug) => ItemsChildrenBlock(slug)),
  ...pageBlocks.map((slug) => PagesChildrenBlock(slug)),
  ...ContentBlocks,
]
