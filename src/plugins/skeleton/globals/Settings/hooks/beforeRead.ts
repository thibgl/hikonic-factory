import logger from '../../../utils/logger'
import '../../../utils/arrayEquals'
import type { GlobalBeforeReadHook } from 'payload'
import { defaultThemes } from '../../../defaults'

export const beforeReadHook: GlobalBeforeReadHook = async ({ doc, req: { payload } }) => {
  try {
    const skeletonThemesCollection = await payload.find({
      collection: 'skeletonThemes',
      depth: 0,
      limit: 999,
      pagination: false,
      overrideAccess: false,
    })

    await Promise.all(
      Object.entries(defaultThemes).map(async ([theme, properties]) => {
        const isInCollection = skeletonThemesCollection.docs.some(
          (collectionTheme) => collectionTheme.name === theme,
        )
        if (!isInCollection) {
          await payload.create({
            collection: 'skeletonThemes',
            data: {
              name: theme,
              label: theme.charAt(0).toUpperCase() + theme.slice(1),
              source: properties,
              colors: mapColors(properties.properties),
              enhancements: properties.enhancements && true,
              default: true,
            },
          })
        }
      }),
    )

    return doc
  } catch (err) {
    logger.error('beforeReadHook Error:', err)
  }
}

const mapColors = (properties: Record<string, string>) => {
  let colors: { value: string; label: string; rgb: string }[] = []

  Object.entries(properties).forEach(([key, value]) => {
    if (key.startsWith('--color')) {
      const colorName = key.replace('--color-', '')
      if (!colorName.startsWith('surface'))
        colors.push({
          value: colorName,
          label: colorName.charAt(0).toUpperCase() + colorName.slice(1),
          rgb: value,
        })
    }
  })

  return colors
}
