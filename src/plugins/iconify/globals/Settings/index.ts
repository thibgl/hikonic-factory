import type { GlobalConfig } from 'payload'
import { beforeReadHook, afterChangeHook } from './hooks'
import { env } from 'node:process'

export const IconifySettings: GlobalConfig = {
  slug: 'iconify',
  label: 'Icons',
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Sets',
          fields: [
            {
              name: 'sets',
              label: false,
              type: 'group',
              fields: [
                {
                  name: 'installed',
                  type: 'text',
                  hasMany: true,
                  defaultValue: [],
                  admin: {
                    components: {
                      Field: 'src/plugins/iconify/components/InstallIconSets#InstallIconSets',
                    },
                  },
                },
                {
                  name: 'options',
                  type: 'json',
                  admin: {
                    hidden: true,
                  },
                },
                {
                  name: 'nodes',
                  type: 'json',
                  admin: {
                    hidden: true,
                  },
                },
                {
                  name: 'updatedAt',
                  type: 'date',
                  admin: {
                    hidden: true,
                  },
                },
              ],
            },
            {
              type: 'collapsible',
              label: 'Read Me',
              fields: [
                {
                  name: 'readMe',
                  type: 'ui',
                  admin: {
                    components: {
                      Field: 'src/plugins/iconify/components/ReadMe#ReadMe',
                    },
                  },
                },
              ],
              admin: {
                initCollapsed: true,
              },
            },
          ],
        },
        {
          label: 'Settings',
          fields: [
            {
              name: 'settings',
              type: 'group',
              label: false,
              fields: [
                {
                  type: 'group',
                  name: 'base',
                  label: false,
                  fields: [
                    {
                      type: 'row',
                      fields: [
                        {
                          name: 'outputXml',
                          type: 'checkbox',
                          defaultValue: false,
                          hooks: {
                            afterChange: [
                              (value) => {
                                env.ICONIFY_OUTPUT_XML = value.value.toString()
                              },
                            ],
                          },
                        },
                      ],
                    },
                  ],
                  admin: {
                    hideGutter: true,
                  },
                },
                {
                  type: 'group',
                  name: 'nodes',
                  fields: [
                    {
                      name: 'clientPath',
                      label: 'Client Root Directory',
                      type: 'text',
                    },
                    {
                      name: 'packageManager',
                      type: 'select',
                      defaultValue: 'npm',
                      options: [
                        { value: 'npm', label: 'Npm' },
                        { value: 'yarn', label: 'Yarn' },
                        { value: 'pnpm', label: 'Pnpm' },
                      ],
                    },
                  ],
                  admin: {
                    hideGutter: true,
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    beforeRead: [beforeReadHook],
    afterChange: [afterChangeHook],
  },
}

// init: Before Read RUNS ONCE on page refresh (get hidden fields, locals), After Read (removes hiddem fields, local flattened)
// save: Before Validate (before update op), Before Change (fields are validated), After Read, After Change (finished, run cleanups)
