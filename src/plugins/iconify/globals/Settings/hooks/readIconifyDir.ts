import fs from 'fs'
import path from 'path'
import logger from '../../../utils/logger'

export const readIconifyDir = (
  rootPath: string,
): { iconifyPath: string | null; nodes: string[] } => {
  const nodesPath = path.resolve(rootPath, 'node_modules')

  if (!fs.existsSync(nodesPath)) {
    logger.error('Node modules not found - Is the Client Root Directory correct ?')
    return { iconifyPath: null, nodes: [] }
  }

  const iconifyPath = path.resolve(nodesPath, '@iconify-json')
  if (!fs.existsSync(iconifyPath)) {
    logger.warn('No iconify node module installed')
    return { iconifyPath, nodes: [] }
  }

  return { iconifyPath, nodes: fs.readdirSync(iconifyPath).sort() }
}
