import { Section } from '../base'
import { RichTextFields } from '@/fields'
import { IconField } from '@/plugins/iconify/fields/Icon'

const Collapsible = Section({
  slug: 'Collapsible',
  data: [
    {
      name: 'items',
      type: 'array',
      fields: [{ name: 'title', type: 'text', localized: true }, ...RichTextFields(), IconField()],
    },
  ],
})

export default Collapsible
