// import fs from 'fs'
// import path from 'path'
import logger from '../../../utils/logger'

import type { GlobalAfterChangeHook, OptionObject } from 'payload'

// import { readSkeletonDir } from './readSkeletonDir'
/**
 * Manages Iconify sets after a change in the global configuration.
 * This hook handles the addition of new icon sets and removal of unused ones.
 */

export const afterChangeHook: GlobalAfterChangeHook =
  // (clientPath: string): GlobalAfterChangeHook =>
  async ({ previousDoc, doc, req: { payload }, context }) => {
    logger.info('afterChangeHook')
    // const twPluginPath = readSkeletonDir(clientPath)

    // if (twPluginPath) {
    //   const skeletonThemesCollection = await payload.find({
    //     collection: 'skeletonThemes',
    //     depth: 0,
    //     limit: 999,
    //     pagination: false,
    //     sort: 'prefix',
    //     overrideAccess: false,
    //   })

    //   await Promise.all(
    //     defaultThemes.map(async (defaultTheme: string) => {
    //       const isInCollection = skeletonThemesCollection.docs.some(
    //         (theme) => theme.name === defaultTheme,
    //       )
    //       if (!isInCollection) {
    //         const parsedTheme = await parseThemeFromNode(twPluginPath, defaultTheme)
    //         // await payload.create({
    //         //   collection: 'skeletonThemes',
    //         //   data: parsedTheme,
    //         // })
    //       }
    //     }),
    //   )
    return doc
  }

// const parseThemeFromNode = async (twPluginPath: string, theme: string) => {
//   const twPluginModule = require(twPluginPath)
//   const { getThemeProperties } = twPluginModule
//   console.log(getThemeProperties(theme))
//   return {}
// }

// const objectToOptions = (obj: Record<string, any>): OptionObject[] =>
//   Object.entries(obj).map(([key, value]) => ({
//     value: key === '' ? 'regular' : key,
//     label: value,
//   }))

// const readJsonFile = (rootPath: string, fileName: string) => {
//   const filePath = path.resolve(rootPath, fileName)
//   const fileContent = fs.readFileSync(filePath, 'utf-8')
//   const jsonData = JSON.parse(fileContent)

//   return jsonData
// }

// function diffArrays(arrayA: string[], arrayB: string[]) {
//   return arrayA.filter((set: string) => !arrayB.includes(set))
// }

// async function execCommand(command: string, cwd: string): Promise<string> {
//   console.log(`execCommand called with command: "${command}" and cwd: "${cwd}"`)
//   return new Promise((resolve, reject) => {
//     exec(command, { cwd }, (error, stdout, stderr) => {
//       if (error) {
//         console.error(`execCommand Error: ${error.message}`)
//         reject(error)
//         return
//       }
//       if (stderr) {
//         console.warn(`execCommand Stderr: ${stderr}`)
//       }
//       resolve(stdout)
//     })
//   })
// }
