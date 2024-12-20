import type { Block } from 'payload'

const Walkthrough: Block = {
  slug: 'Walkthrough',
  fields: [
    { name: 'alternateDirection', type: 'checkbox' },
    {
      name: 'elements',
      type: 'array',
      fields: [
        {
          name: 'header',
          type: 'text',
          localized: true,
        },
        {
          name: 'body',
          type: 'richText',
          localized: true,
        },
        {
          name: 'display',
          type: 'radio',
          options: [
            { value: 'carded', label: 'Carded' },
            { value: 'free', label: 'Free' },
            { value: 'mockup', label: 'Mockup' },
          ],
          defaultValue: 'carded',
        },
        {
          name: 'illustration',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
  ],
}

export default Walkthrough
