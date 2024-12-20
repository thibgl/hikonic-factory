import type { Field } from 'payload'
import { slugify } from '@/utils/slugify'

export const BaseSection: Field = {
  name: 'section',
  type: 'group',
  label: false,
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'title',
          type: 'text',
          localized: true,
        },
        {
          name: 'slug',
          type: 'text',
          localized: true,
          hooks: {
            beforeValidate: [
              async ({ siblingData, value }) => {
                const initialSlug = value || siblingData?.title
                return initialSlug ? slugify(initialSlug) : null
              },
            ],
          },
        },
      ],
    },
    { name: 'header', type: 'text', localized: true },
    { name: 'body', type: 'richText', localized: true },
  ],
  admin: {
    hideGutter: true,
  },
}

export const BaseOptions: Field = {
  type: 'group',
  name: 'options',
  label: false,
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'blackedOut',
          type: 'checkbox',
        },
        {
          name: 'carded',
          type: 'checkbox',
        },
      ],
    },
  ],
  admin: {
    hideGutter: true,
  },
}
