// import { patch } from './utils/log'
// patch('Iconify Plugin | ')

import type { Config } from 'payload'
import { IconifySettings } from './globals/Settings'
import { IconSetsCollection } from './collections/IconSets'

import fs from 'fs'

/**
 * Options for the Iconify plugin.
 */
interface IconifyPluginOptions {
  /**
   * Whether the Iconify plugin is enabled.
   * @default true
   */
  enabled?: boolean
}

/**
 * Creates an Iconify plugin for Payload CMS.
 *
 * @param options - Configuration options for the plugin.
 * @returns A function that modifies the Payload configuration.
 */
export const iconifyPlugin = (
  incomingOptions: Partial<IconifyPluginOptions> = {},
): ((incomingConfig: Config) => Config) => {
  // Merge incoming options with defaults
  const options: IconifyPluginOptions = {
    enabled: true,
    ...incomingOptions,
  }

  return (incomingConfig: Config): Config => {
    if (options.enabled) {
      // Read version from package.json
      const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'))

      return {
        ...incomingConfig,
        globals: [...(incomingConfig?.globals || []), IconifySettings],
        collections: [...(incomingConfig?.collections || []), IconSetsCollection],
        admin: {
          ...incomingConfig.admin,
          custom: {
            ...incomingConfig.admin?.custom,
            hikonic: {
              ...incomingConfig.admin?.custom?.hikonic,
              iconify: packageJson.version,
            },
          },
        },
      }
    }
    // Return the original config if the plugin is not enabled
    return incomingConfig
  }
}
