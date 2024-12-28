import type { Field, GlobalConfig } from 'payload'

import { WebsiteLayout } from '@/layouts/Website'
import { IconField } from '@/plugins/iconify/fields/Icon'
// import { SetsCache } from '@/plugins/iconify/fields/SetsCache'
import { toKebabCase } from '@/utils/toKebabCase'
import { handleIconsChange, handleLocalesChange } from './hooks'
import { ConditionalField } from '@/fields'

export const Website: GlobalConfig = {
  slug: 'website',
  access: {
    read: () => true,
  },
  fields: [
    // ...SetsCache,
    {
      type: 'tabs',
      tabs: [
        {
          name: 'general',
          fields: [
            {
              name: 'title', // required
              type: 'text', // required
              required: true,
            },
            { name: 'description', type: 'text', localized: true },
            {
              name: 'logo',
              type: 'upload',
              relationTo: 'media',
              filterOptions: {
                mimeType: { contains: 'image' },
              },
            },
            // { name: 'defaultFooter', type: 'relationship', relationTo: 'sections' },
          ],
        },
        { label: 'Layout', fields: [WebsiteLayout] },
        {
          name: 'nav',
          fields: [
            {
              name: 'center',
              type: 'array',
              fields: [
                {
                  name: 'type',
                  type: 'radio',
                  options: [
                    { value: 'link', label: 'Link' },
                    { value: 'subMenu', label: 'Sub Menu' },
                  ],
                },
                ...(ConditionalField({
                  path: 'type',
                  value: 'subMenu',
                  field: [
                    { name: 'title', type: 'text', localized: true },
                    {
                      name: 'expanded',
                      type: 'relationship',
                      relationTo: 'indexes',
                      hasMany: true,
                      filterOptions: ({ siblingData }) => ({
                        and: [
                          {
                            producing: {
                              equals: true,
                            },
                          },
                          {
                            id: {
                              not_in: siblingData?.links || [],
                            },
                          },
                        ],
                      }),
                    },
                    {
                      name: 'links',
                      type: 'relationship',
                      relationTo: 'indexes',
                      hasMany: true,
                      filterOptions: ({ siblingData }) => ({
                        id: {
                          not_in: siblingData?.expanded || [],
                        },
                      }),
                    },
                  ],
                }) as Field[]),
                ConditionalField({
                  path: 'type',
                  value: 'link',
                  field: {
                    name: 'link',
                    type: 'relationship',
                    relationTo: 'indexes',
                  },
                }) as Field,
              ],
            },
            {
              name: 'trail',
              type: 'array',
              fields: [],
            },
          ],
        },
        {
          name: 'ui',
          fields: [
            IconField('caretDown'),
            IconField('contact'),
            IconField('hamburger'),
            IconField('newTab'),
            IconField('settings'),
            IconField('search'),
            IconField('previous'),
            IconField('next'),
            IconField('play'),
            IconField('pause'),
          ],
        },
        {
          name: 'social',
          fields: [
            {
              name: 'networks',
              type: 'array',
              fields: [
                { name: 'title', type: 'text' },
                {
                  name: 'url',
                  type: 'text',
                },
                IconField(),
              ],
            },
            // {
            //   name: 'test',
            //   type: 'text',
            //   admin: {
            //     condition: (siblingData, data) => {
            //       console.log('siblingData', siblingData)
            //       console.log('data', data)
            //       return true
            //     },
            //   },
            // },
          ],
        },
        {
          name: 'localization',
          fields: [
            {
              name: 'locales',
              type: 'array',
              fields: [
                { name: 'name', type: 'text', required: true },
                {
                  name: 'code',
                  type: 'text',
                  required: true,
                  hooks: {
                    beforeValidate: [
                      async ({ value }) => {
                        return toKebabCase(value)
                      },
                    ],
                  },
                },
                IconField(),
              ],
              admin: {
                description: 'The locales that the website supports, first locale is the default.',
              },
            },
          ],
        },
        {
          name: 'google',
          fields: [
            {
              name: 'recaptchaId',
              type: 'text',
            },
            {
              name: 'gtagId',
              type: 'text',
            },
          ],
        },
        {
          name: 'cookies',
          fields: [],
        },
        {
          name: 'seo',
          fields: [
            { name: 'canonical', type: 'text' },
            { name: 'xHandle', type: 'text' },
            // { name: 'qa', label: 'QA Section', type: 'relationship', relationTo: 'sections' },
            {
              name: 'keywords',
              type: 'array',
              fields: [{ name: 'keyword', type: 'text', localized: true }],
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [handleIconsChange, handleLocalesChange],
  },
}
