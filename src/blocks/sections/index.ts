const itemsBlocks = ['ItemCards', 'Wall']
const pageBlocks = ['Carousel', 'Page', 'PageCards', 'Slider']

import { ItemsBlock, PagesBlock } from './root'
import { ItemsChildrenBlock, PagesChildrenBlock } from './children'
import { CollapsibleBlock, FormBlock, HeroBlock, MockupBlock, WalkthroughBlock } from './content'

export const RootBlocks = [
  ...itemsBlocks.map((slug) => ItemsBlock(slug)),
  ...pageBlocks.map((slug) => PagesBlock(slug)),
  ...[CollapsibleBlock, FormBlock, HeroBlock, MockupBlock, WalkthroughBlock],
  {
    slug: 'Products',
    labels: { singular: 'Products', plural: 'Products' },
    fields: [
      { name: 'decription', type: 'ui', description: 'Hello' },
      {
        name: 'block',
        type: 'select',
        options: [
          { value: 'PageCards', label: 'PageCards' },
          { value: 'Bento', label: 'Bento' },
        ],
      },
    ],
  },
].sort((a, b) => a.slug.localeCompare(b.slug))

export const ChildrenBlocks = [
  ...itemsBlocks.map((slug) => ItemsChildrenBlock(slug)),
  ...pageBlocks.map((slug) => PagesChildrenBlock(slug)),
  ...[CollapsibleBlock, FormBlock, HeroBlock, WalkthroughBlock],
  {
    slug: 'Mockup',
    fields: [{ name: 'decription', type: 'ui', description: 'Hello' }],
  },
  {
    slug: 'Illustration',
    fields: [{ name: 'decription', type: 'ui', description: 'Hello' }],
  },
  {
    slug: 'Description',
    fields: [{ name: 'decription', type: 'ui', description: 'Hello' }],
  },
].sort((a, b) => a.slug.localeCompare(b.slug))
