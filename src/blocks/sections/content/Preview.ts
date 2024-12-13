import { Section } from './base/Section'

const Showcase = Section({
  slug: 'showcase',
  data: [
    {
      name: 'header',
      type: 'text',
      required: true,
    },
    {
      name: 'body',
      type: 'text',
      required: true,
    },
    {
      name: 'background',
      type: 'text',
    },
  ],
})

const Preview = Section({
  slug: 'Preview',
  data: [
    {
      name: 'header',
      type: 'text',
      required: true,
    },
    {
      name: 'body',
      type: 'text',
      required: true,
    },
    {
      name: 'orientation',
      type: 'select',
      options: ['Left to Right', 'Right to Left'],
      defaultValue: 'Left to Right',
      required: true,
    },
    {
      name: 'background',
      type: 'text',
    },
    {
      name: 'showcase',
      type: 'blocks',
      maxRows: 3,
      blocks: [Showcase],
    },
  ],
})

export default Preview
