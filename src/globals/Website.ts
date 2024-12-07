import type { GlobalConfig } from 'payload'

export const Website: GlobalConfig = {
  slug: 'v2website',
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    // {
    //   name: 'hero',
    //   type: 'relationship',
    //   relationTo: 'v2blocks',
    // },
  ],
}
