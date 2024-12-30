import { ItemsBlock, PagesBlock } from './root'
import { ItemsChildrenBlock, PagesChildrenBlock, WallBlock } from './children'
import { CollapsibleBlock, FormBlock, HeroBlock, MockupBlock, WalkthroughBlock } from './content'

export const RootBlocks = [
  ...['ItemCards', 'Wall'].map((slug) => ItemsBlock(slug)),
  ...['Carousel', 'Page', 'PageCards', 'Slider'].map((slug) => PagesBlock(slug)),
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
  WallBlock,
  ...['ItemCards'].map((slug) => ItemsChildrenBlock(slug)),
  ...['Carousel', 'Page', 'PageCards', 'Slider'].map((slug) => PagesChildrenBlock(slug)),
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
