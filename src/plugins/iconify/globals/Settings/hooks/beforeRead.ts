import logger from '../../../utils/logger'
import '../../../utils/arrayEquals'
import type { GlobalBeforeReadHook } from 'payload'
import type { APIv2CollectionsResponse } from '../../../types/iconifyCollections'
import { readIconifyDir } from './readIconifyDir'

const updateInterval = 24 * 60 * 60 * 1000

export const beforeReadHook: GlobalBeforeReadHook = async ({ doc, req: { payload } }) => {
  logger.info('beforeReadHook')
  var shouldUpdate = false

  try {
    const pluginInit = Object.keys(doc).length === 0
    const date = new Date()

    if (pluginInit) {
      shouldUpdate = true
      const { iconifyPath, nodes } = readIconifyDir('./')
      if (iconifyPath) {
        doc = {
          settings: {
            sets: {
              installed: nodes,
            },
            nodes: {
              clientPath: './',
            },
          },
        }
      }
      doc = await updateIconifyData(doc)
    } else {
      const shouldUpdateIconifyData =
        date.getTime() - new Date(doc.updatedAt).getTime() > updateInterval
      if (shouldUpdateIconifyData) {
        shouldUpdate = true
        doc = await updateIconifyData(doc)
      }

      const { iconifyPath, nodes } = readIconifyDir(doc.settings.nodes.clientPath)
      const shouldUpdateSets = iconifyPath && !nodes.equals(doc.sets.installed)
      if (shouldUpdateSets) {
        shouldUpdate = true
        doc = {
          ...doc,
          sets: {
            ...doc.sets,
            installed: nodes,
          },
        }
      }
    }

    if (shouldUpdate) {
      doc = {
        ...doc,
        updatedAt: date.toISOString(),
      }
      await payload.updateGlobal({ slug: 'iconify', data: doc, depth: 0 })
    }

    return doc
  } catch (err) {
    logger.error('beforeReadHook Error:', err)
  }
}

const updateIconifyData = async (doc: Global) => {
  logger.info('Updating iconify api data & sets options')

  const url = 'https://api.iconify.design/collections'
  const req = await fetch(url)
  const data = await req.json()

  return {
    ...doc,
    sets: {
      ...(doc.sets && doc.sets),
      options: Object.keys(data as APIv2CollectionsResponse)
        .map((key: string) => ({
          value: key,
          label: data[key].name,
        }))
        .sort((a, b) => a.label.localeCompare(b.label)),
    },
  }
}
