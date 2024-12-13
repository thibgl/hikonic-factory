import type { Field } from 'payload'
import type { FactoryIdentity } from '@/plugins/factory/types'

import { CreateFactory } from '@/plugins/factory/CreateFactory'
import { ConditionalField } from '@/fields/Conditional'
import { RootLayout, ChildrenLayout, PageLayout } from '@/layouts'
import { ItemFields } from './base'
import { SeoTab } from './page'
import { authenticated, authenticatedOrPublished } from '@/access'
import { IconField } from '@/plugins/iconify/fields/Icon'
import { ColorsField } from '@/plugins/skeleton/fields/Colors'

import { slugify } from '@/utils/slugify'

const pagesFactoryIdentity: FactoryIdentity = {
  factory: { singular: 'index', plural: 'indexes' },
  products: { singular: 'page', plural: 'pages' },
}
const itemsFactoryIdentity: FactoryIdentity = {
  factory: { singular: 'token', plural: 'tokens' },
  products: { singular: 'item', plural: 'items' },
}

export const Factories = [
  ...CreateFactory({
    identity: pagesFactoryIdentity,
    portsFrom: [itemsFactoryIdentity],
    shipsTo: [itemsFactoryIdentity],
    filterNeighbors: true,
    commons: {
      versions: {
        drafts: true,
      },
      access: {
        create: authenticated,
        delete: authenticated,
        read: authenticatedOrPublished,
        update: authenticated,
      },
      fields: [
        {
          name: 'slug',
          type: 'text',
          unique: true,
          required: true,
          hooks: {
            beforeValidate: [
              async ({ data, value }) => {
                const initialSlug = value || data?.title
                return initialSlug ? slugify(initialSlug) : null
              },
            ],
          },
        },
        ...ItemFields,
      ],
    },
    factory: {
      fields: [
        ConditionalField({
          path: 'producing',
          sibling: false,
          value: true,
          field: IconField(),
        }) as Field,
      ],
      tabs: [
        {
          label: 'Layout',
          fields: [RootLayout],
        },
        {
          label: 'Children Layout',
          fields: [
            ConditionalField({
              path: 'producing',
              value: true,
              sibling: false,
              field: ChildrenLayout,
            }) as Field,
          ],
        },
        SeoTab,
      ],
    },
    product: {
      tabs: [
        {
          label: 'Layout',
          fields: [PageLayout],
        },
        SeoTab,
      ],
    },
  }),
  ...CreateFactory({
    identity: itemsFactoryIdentity,
    shipsTo: [pagesFactoryIdentity],
    portsFrom: [pagesFactoryIdentity],
    filterNeighbors: true,
    commons: {
      versions: {
        drafts: true,
      },
      access: {
        create: authenticated,
        delete: authenticated,
        read: authenticatedOrPublished,
        update: authenticated,
      },
      fields: [...ItemFields],
    },
    factory: {
      options: [
        ...(ConditionalField({
          path: 'producing',
          value: true,
          sibling: false,
          field: [
            {
              name: 'icon',
              type: 'checkbox',
            },
            { name: 'colors', type: 'select', options: ['1', '2', '3'] },
          ],
        }) as Field[]),
      ],
    },
    product: {
      fields: [
        ConditionalField({
          path: 'factoryData.options.icon',
          sibling: false,
          value: true,
          field: IconField(),
        }) as Field,
        ColorsField(),
      ],
    },
  }),
]
