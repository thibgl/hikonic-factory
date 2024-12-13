import { Section } from '../base'
import { RichTextFields } from '@/fields'

const Walkthrough = Section({
  slug: 'Walkthrough',
  data: [
    { name: 'alternateDirection', type: 'checkbox' },
    {
      name: 'items',
      type: 'array',
      fields: [
        {
          name: 'header',
          type: 'text',
          localized: true,
        },
        ...RichTextFields(),
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
})

export default Walkthrough
