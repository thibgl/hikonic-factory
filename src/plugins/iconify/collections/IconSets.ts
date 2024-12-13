import type { CollectionConfig } from 'payload'

export const IconSetsCollection: CollectionConfig = {
  access: {
    create: () => true,
    read: () => true,
    update: () => true,
    delete: () => true,
  },
  slug: 'iconifySets',
  labels: {
    singular: 'Icon Set',
    plural: 'Icon Sets',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Set',
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
              admin: {
                readOnly: false,
              },
            },
            {
              name: 'prefix',
              type: 'text',
              required: true,
              unique: true,
              admin: {
                readOnly: false,
              },
            },
            {
              name: 'packageVersion',
              type: 'text',
              required: true,
              admin: {
                readOnly: false,
              },
            },
            {
              name: 'homepage',
              type: 'text',
              admin: {
                readOnly: false,
              },
            },
            {
              name: 'category',
              label: 'Category',
              type: 'text',
            },
            {
              name: 'total',
              label: 'Total Icons',
              type: 'number',
              admin: {
                readOnly: false,
              },
            },
            {
              name: 'version',
              type: 'text',
              admin: {
                readOnly: false,
              },
            },
            {
              name: 'author',
              required: true,
              type: 'text',
            },
            {
              name: 'license',
              required: true,
              type: 'text',
            },
          ],
        },
        {
          label: 'Filters',
          fields: [
            {
              name: 'filters',
              label: false,
              type: 'group',
              fields: [
                {
                  label: 'Prefixes',
                  type: 'collapsible',
                  fields: [
                    {
                      name: 'prefixes',
                      label: 'Json',
                      type: 'json',
                    },
                  ],
                  admin: {
                    initCollapsed: true,
                  },
                },
                {
                  label: 'Suffixes',
                  type: 'collapsible',
                  fields: [
                    {
                      name: 'suffixes',
                      label: 'Json',
                      type: 'json',
                    },
                  ],
                  admin: {
                    initCollapsed: true,
                  },
                },
                {
                  label: 'Categories',
                  type: 'collapsible',
                  fields: [
                    {
                      name: 'categories',
                      label: 'Json',
                      type: 'json',
                    },
                  ],
                  admin: {
                    initCollapsed: true,
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Icons',
          fields: [
            {
              type: 'group',
              name: 'icons',
              fields: [
                {
                  name: 'width',
                  type: 'number',
                },
                {
                  name: 'height',
                  type: 'number',
                },
                {
                  name: 'options',
                  type: 'json',
                },
              ],
            },
          ],
        },
        {
          label: 'Categories',
          fields: [
            {
              name: 'categories',
              label: 'Json',
              type: 'json',
            },
          ],
        },
      ],
    },
  ],
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'total', 'category', 'packageVersion', 'license'],
    hidden: true,
  },
}
