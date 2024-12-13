import type { GlobalConfig } from 'payload'
import { beforeReadHook, afterChangeHook } from './hooks'

export const SkeletonSettings = (clientPath: string): GlobalConfig => ({
  slug: 'skeleton',
  label: 'Theme',
  // access: {
  //   read: () => true,
  // },
  fields: [
    {
      name: 'theme',
      type: 'relationship',
      relationTo: 'skeletonThemes',
      admin: {
        allowCreate: false,
      },
    },
    {
      name: 'newTheme',
      label: 'New Theme Name',
      type: 'text',
      virtual: true,
      admin: {
        condition: (data) => !data.theme,
      },
    },
    {
      name: 'webview',
      type: 'ui',
      admin: {
        components: {
          Field: 'src/plugins/skeleton/components/Webview#Webview',
        },
      },
    },
  ],
  hooks: {
    beforeRead: [beforeReadHook],
    afterChange: [afterChangeHook],
  },
  endpoints: [],
})
