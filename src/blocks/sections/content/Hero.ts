import type { Block } from 'payload'

const Hero: Block = {
  slug: 'Hero',
  fields: [
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
  ],
}

export default Hero
