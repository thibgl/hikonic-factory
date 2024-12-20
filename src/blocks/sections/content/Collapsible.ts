import type { Block } from 'payload'
import { IconField } from '@/plugins/iconify/fields/Icon'

const Collapsible: Block = {
  slug: 'Collapsible',
  fields: [
    {
      name: 'elements',
      type: 'array',
      fields: [
        { name: 'header', type: 'text', localized: true },
        { name: 'body', type: 'richText', localized: true },
        IconField(),
      ],
    },
  ],
}

export default Collapsible
