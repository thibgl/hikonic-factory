import type { Block } from 'payload'

const CallToAction: Block = {
  slug: 'CallToAction',
  fields: [
    {
      name: 'content',
      type: 'text',
      required: true,
    },
    {
      name: 'icon',
      type: 'text',
    },
  ],
}

export default CallToAction
