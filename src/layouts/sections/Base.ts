import type { Field } from 'payload'
import { slugify } from '@/utils/slugify'
import { ConditionalField } from '@/fields'
import { ColorsField } from '@/plugins/skeleton/fields/Colors'

export const BaseSection = (main = true): Field[] => [
  ...((main
    ? [
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
      ]
    : []) as Field[]),
  { name: 'header', type: 'text', localized: true },
  { name: 'body', type: 'richText', localized: true },
]

export const BaseOptions: Field[] = [
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
  ConditionalField({
    path: 'carded',
    value: true,
    field: ColorsField({ n: 3 }),
  }) as Field,
]
