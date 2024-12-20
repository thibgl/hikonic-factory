import type { Block } from 'payload'

const Mockup: Block = {
  slug: 'Mockup',
  fields: [
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
}

export default Mockup
