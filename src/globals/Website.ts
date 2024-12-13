import type { GlobalConfig } from 'payload'

export const Website: GlobalConfig = {
  slug: 'website',
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
