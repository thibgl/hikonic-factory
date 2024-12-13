import fs from 'fs'
import path from 'path'
import logger from '../../../utils/logger'
import '../../../utils/arrayEquals'
import { exec } from 'child_process'

import type { GlobalAfterChangeHook } from 'payload'
import type { OptionObject } from 'payload'
import type {
  IconifyInfo,
  IconifyMetaData,
  // IconifyChars,
  IconifyJSON,
} from '@iconify/types'

import { readIconifyDir } from './readIconifyDir'
/**
 * Manages Iconify sets after a change in the global configuration.
 * This hook handles the addition of new icon sets and removal of unused ones.
 */
export const afterChangeHook: GlobalAfterChangeHook = async ({
  previousDoc,
  doc,
  req: { payload },
}) => {
  logger.info('afterChangeHook')

  if (doc.settings.nodes.clientPath) {
    const { iconifyPath, nodes } = readIconifyDir(doc.settings.nodes.clientPath)

    if (iconifyPath) {
      const iconSetsCollection = await payload.find({
        collection: 'iconifySets',
        depth: 0,
        limit: doc.sets.options.length,
        pagination: false,
        sort: 'prefix',
        overrideAccess: false,
      })

      if (!previousDoc.sets.installed.equals(doc.sets.installed)) {
        const uninstalledSets = diffArrays(nodes, doc.sets.installed)
        const installedSets = diffArrays(doc.sets.installed, nodes)

        if (uninstalledSets.length > 0) {
          await Promise.all(
            uninstalledSets.map(async (node) => {
              const iconSet = iconSetsCollection.docs.find((set) => set.prefix === node)
              if (iconSet) {
                await payload.delete({
                  id: iconSet.id,
                  collection: 'iconifySets',
                })
              }
            }),
          )

          const setsToProcess = uninstalledSets.map((set) => `@iconify-json/${set}`).join(' ')
          const commandString = `${doc.settings.nodes.packageManager} uninstall ${setsToProcess}`
          await execCommand(commandString, doc.settings.nodes.clientPath)
        }

        if (installedSets.length > 0) {
          const setsToProcess = installedSets.map((set) => `@iconify-json/${set}@latest`).join(' ')
          const commandString = `${doc.settings.nodes.packageManager} install ${setsToProcess}`
          await execCommand(commandString, doc.settings.nodes.clientPath)
        }
      }

      const { nodes: finalNodes } = readIconifyDir(doc.settings.nodes.clientPath)
      await Promise.all(
        finalNodes.map(async (node: string) => {
          const isInCollection = iconSetsCollection.docs.some((set) => set.prefix === node)
          if (!isInCollection) {
            const parsedIconSet = parseIconSetFromNode(iconifyPath, node)
            await payload.create({
              collection: 'iconifySets',
              data: parsedIconSet,
            })
          }
        }),
      )
      return {
        ...doc,
        sets: {
          ...doc.sets,
          installed: finalNodes,
        },
      }
    }
  }
}

const parseIconSetFromNode = (iconifyPath: string, prefix: string) => {
  const nodePath = path.resolve(iconifyPath, prefix)
  const packageData = readJsonFile(nodePath, 'package.json')
  const infoData: IconifyInfo = readJsonFile(nodePath, 'info.json')
  const metaData: IconifyMetaData = readJsonFile(nodePath, 'metadata.json')
  const iconsData: IconifyJSON = readJsonFile(nodePath, 'icons.json')
  // const charsData: IconifyChars = readJsonFile(nodePath, 'chars.json')

  return {
    prefix,
    packageVersion: packageData.version,
    license: packageData.license,
    homepage: packageData.homepage || null,
    version: packageData.iconSetVersion || null,
    name: infoData.name,
    author: infoData.author.name,
    category: infoData.category || null,
    total: infoData.total || null,
    icons: {
      options: Object.entries(iconsData.icons).map(([key, icon]) => ({
        value: key,
        body: icon.body,
        ...(icon.hidden && { hidden: icon.hidden }),
        ...(icon.width && { width: icon.width }),
        ...(icon.height && { height: icon.height }),
      })),
      width: iconsData.width,
      height: iconsData.height,
    },
    filters: {
      ...(metaData.prefixes && { prefixes: objectToOptions(metaData.prefixes) }),
      ...(metaData.suffixes && { suffixes: objectToOptions(metaData.suffixes) }),
      ...(metaData.categories && {
        categories: Object.keys(metaData.categories).map((key) => ({
          value: key,
          label: key,
        })),
      }),
    },
    ...(metaData.categories && {
      categories: metaData.categories,
    }),
  }
}

const objectToOptions = (obj: Record<string, any>): OptionObject[] =>
  Object.entries(obj).map(([key, value]) => ({
    value: key === '' ? 'regular' : key,
    label: value,
  }))

const readJsonFile = (rootPath: string, fileName: string) => {
  const filePath = path.resolve(rootPath, fileName)
  const fileContent = fs.readFileSync(filePath, 'utf-8')
  const jsonData = JSON.parse(fileContent)

  return jsonData
}

function diffArrays(arrayA: string[], arrayB: string[]) {
  return arrayA.filter((set: string) => !arrayB.includes(set))
}

async function execCommand(command: string, cwd: string): Promise<string> {
  console.log(`execCommand called with command: "${command}" and cwd: "${cwd}"`)
  return new Promise((resolve, reject) => {
    exec(command, { cwd }, (error, stdout, stderr) => {
      if (error) {
        console.error(`execCommand Error: ${error.message}`)
        reject(error)
        return
      }
      if (stderr) {
        console.warn(`execCommand Stderr: ${stderr}`)
      }
      resolve(stdout)
    })
  })
}
