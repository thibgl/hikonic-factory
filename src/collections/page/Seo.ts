import type { Tab } from 'payload'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

export const SeoTab: Tab = {
  name: 'seo',
  fields: [
    { name: 'qa', label: 'Show QA Section', type: 'checkbox', defaultValue: true },
    OverviewField({
      titlePath: 'meta.title',
      descriptionPath: 'meta.description',
      imagePath: 'meta.image',
    }),
    MetaTitleField({
      hasGenerateFn: true,
    }),
    MetaImageField({
      relationTo: 'media',
    }),
    MetaDescriptionField({}),
    PreviewField({
      // if the `generateUrl` function is configured
      hasGenerateFn: true,

      // field paths to match the target field for data
      titlePath: 'meta.title',
      descriptionPath: 'meta.description',
    }),
    {
      name: 'keywords',
      type: 'array',
      fields: [{ name: 'keyword', type: 'text', localized: true }],
    },
  ],
}
