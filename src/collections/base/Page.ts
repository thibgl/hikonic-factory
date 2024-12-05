import type { CollectionConfig } from 'payload'
import { Item } from './Item'
import { ConditionalField } from '@/fields/Conditional'
import { Layout } from './Layout'

interface Page {
  slug: string
  isIndex?: boolean
}

export const Page = ({ isIndex = false, slug }: Page): CollectionConfig => ({
  slug,
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Token',
          fields: [
            {
              name: 'title',
              type: 'text',
            },
            ...(isIndex
              ? [
                  {
                    name: 'home',
                    type: 'checkbox',
                    defaultValue: false,
                  },
                  {
                    name: 'parent',
                    type: 'checkbox',
                    defaultValue: false,
                  },
                  {
                    name: 'paginated',
                    type: 'checkbox',
                    defaultValue: false,
                  },
                ]
              : [
                  {
                    name: 'parent',
                    type: 'relationship',
                    relationTo: 'v2indexes',
                    filterOptions: () => {
                      return {
                        parent: { equals: true },
                      }
                    },
                  },
                  {
                    name: 'test',
                    type: 'json',
                    virtual: true,
                    admin: {
                      components: {
                        Field: 'src/components/ParentWatcher#ParentWatcher',
                      },
                    },
                  },
                  { name: 'testTitle', type: 'text' },
                  {
                    name: 'test2',
                    type: 'checkbox',
                    defaultValue: false,
                    admin: {
                      condition: (data) => data?.test?.title === 'Skills',
                    },
                  },
                  // {
                  //   name: 'context',
                  //   type: 'ui',
                  //   admin: {
                  //     components: {
                  //       Field: 'src/components/ParentWatcher#ParentWatcher',
                  //     },
                  //   },
                  // },
                ]),
          ],
        },
        {
          label: 'Meta',
          fields: [
            {
              name: 'meta',
              type: 'relationship',
              relationTo: 'v2indexes',
              hasMany: true,
              filterOptions: ({ id }) => ({
                id: { not_equals: id },
              }),
              // admin: {
              //   components: {
              //     Field:
              //   }
              // }
            },
            { name: 'related', type: 'join', collection: 'v2indexes', on: 'meta' },
          ],
        },
        {
          label: 'Layout',
          fields: [Layout()],
        },
        ...(isIndex
          ? [
              {
                label: 'Children Layout',
                fields: [
                  ConditionalField({
                    path: 'parent',
                    value: true,
                    fallback: false,
                    sibling: false,
                    field: Layout('childrenLayout'),
                  }),
                ],
              },
            ]
          : []),
        {
          label: 'test',
          fields: [
            {
              name: 'testGroup',
              type: 'group',
              fields: [],
              admin: {
                condition: () => false,
              },
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    beforeRead: [
      ...(!isIndex
        ? [
            async ({ doc, req }) => {
              const res = await req.payload.find({
                collection: 'v2indexes',
                where: {
                  id: { equals: doc.parent },
                },
              })
              console.log('res', res)
              doc.test = res.docs[0]
              return doc
            },
          ]
        : []),
    ],
  },
  admin: {
    useAsTitle: 'title',
  },
})
