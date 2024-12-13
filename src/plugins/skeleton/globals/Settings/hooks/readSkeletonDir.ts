import fs from 'fs'
import path from 'path'
import logger from '../../../utils/logger'

export const readSkeletonDir = (rootPath: string): string | null => {
  const nodesPath = path.resolve(rootPath, 'node_modules')

  if (!fs.existsSync(nodesPath)) {
    logger.error('Node modules not found - Is the Client Root Directory correct ?')
    return null
  }

  const SkeletonDir = path.resolve(nodesPath, '@skeletonlabs')
  if (!fs.existsSync(SkeletonDir)) {
    logger.warn('No skeletonlabs node module installed')
    return null
  }

  const twPlugin = path.resolve(SkeletonDir, 'tw-plugin', 'dist', 'index.js')
  if (!fs.existsSync(twPlugin)) {
    logger.warn('No tw-plugin found in skeletonlabs node module')
    return null
  }

  return twPlugin
}
