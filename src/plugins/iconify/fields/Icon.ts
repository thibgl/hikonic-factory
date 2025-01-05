import type { Field } from 'payload'
import { ConditionalField } from '@/fields'
import { env } from 'node:process'

export const IconField = (name: string = 'icon'): Field => ({
  type: 'group',
  name,
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'custom',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'darkBackground',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            condition: (data, siblingData) => siblingData.custom,
          },
          hooks: {
            beforeValidate: [
              async ({ siblingData }) => {
                if (!siblingData.custom) {
                  return null
                }
              },
            ],
          },
        },
      ],
    },
    {
      name: 'set',
      type: 'text',
      defaultValue: null,
      admin: {
        condition: (data, siblingData) => !siblingData.custom,
        components: {
          Field: 'src/plugins/iconify/components/SelectIconSet#SelectIconSet',
        },
      },
      hooks: {
        beforeValidate: [
          async ({ siblingData }) => {
            if (siblingData.custom) {
              return null
            }
          },
        ],
      },
    },
    {
      name: 'icon',
      type: 'text',
      defaultValue: null,
      admin: {
        condition: (data, siblingData) => !siblingData.custom,
        components: {
          Field: 'src/plugins/iconify/components/SelectIcon#SelectIcon',
        },
      },
      hooks: {
        beforeValidate: [
          async ({ siblingData }) => {
            if (siblingData.custom) {
              return null
            }
          },
        ],
      },
    },
    {
      name: 'svg',
      type: 'code',
      defaultValue: null,
      access: {
        read: () => env.ICONIFY_OUTPUT_XML === 'true',
      },
      admin: {
        hidden: true,
      },
      hooks: {
        beforeValidate: [
          async ({ siblingData }) => {
            if (siblingData.custom) {
              return null
            }
          },
        ],
      },
    },
    {
      name: 'customSvg',
      label: 'Svg',
      type: 'code',
      defaultValue: null,
      custom: {
        language: 'xml',
      },
      admin: {
        condition: (data, siblingData) => siblingData.custom,
      },
      hooks: {
        beforeValidate: [
          async ({ siblingData }) => {
            if (!siblingData.custom) {
              return null
            }
          },
        ],
      },
    },
    {
      name: 'preview',
      type: 'ui',
      admin: {
        condition: (data, siblingData) => siblingData.custom,
        components: {
          Field: 'src/plugins/iconify/components/Preview#Preview',
        },
      },
    },
  ],
  admin: {
    hideGutter: true,
  },
})
