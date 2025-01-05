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
        { name: 'excerpt', type: 'richText', localized: true },
        ...ItemFields,
      ],
      admin: {
        defaultColumns: ['slug'],
      },
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
      options: [
        {
          type: 'row',
          fields: [
            {
              name: 'screens',
              type: 'checkbox',
            },
            {
              name: 'article',
              type: 'checkbox',
            },
            {
              name: 'href',
              type: 'checkbox',
            },
            {
              name: 'links',
              type: 'checkbox',
            },
            {
              name: 'date',
              type: 'checkbox',
            },
          ],
        },
        { name: 'colors', type: 'select', options: ['1', '2', '3'] },
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
      fields: [
        ...(ConditionalField({
          path: 'factoryData.options.screens',
          value: true,
          sibling: false,
          field: [
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
        }) as Field[]),
        ...(ConditionalField({
          path: 'factoryData.options.links',
          value: true,
          sibling: false,
          field: [
            {
              name: 'links',
              type: 'array',
              fields: [{ type: 'text', name: 'link' }, { type: 'text', name: 'href' }, IconField()],
            },
          ],
        }) as Field[]),
        ConditionalField({
          path: 'factoryData.options.date',
          value: true,
          sibling: false,
          field: {
            name: 'date',
            type: 'date',
          },
        }) as Field,
      ],
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
      fields: [
        ConditionalField({
          path: 'producing',
          sibling: false,
          value: true,
          field: IconField(),
        }) as Field,
      ],
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
