import { Section } from './base/Section'

const CallToAction = Section({
  slug: 'CallToAction',
  data: [
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
})

export default CallToAction
