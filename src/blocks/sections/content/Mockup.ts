import type { Block } from 'payload'
import { Section } from '../base'

const Mockup: Block = Section({
  slug: 'Mockup',
  data: [
    {
      name: 'mobileScreens',
      type: 'array',
      fields: [{ type: 'upload', name: 'illustration', label: false, relationTo: 'media' }],
    },
    {
      name: 'desktopScreens',
      type: 'array',
      fields: [{ type: 'upload', name: 'illustration', label: false, relationTo: 'media' }],
    },
  ],
})

export default Mockup
