import type { Config } from 'payload'
import { SkeletonSettings } from './globals/Settings'
import { SkeletonThemes } from './collections/Themes'

import fs from 'fs'

import type { SkeletonPluginOptions } from './types/PluginOptions'

/**
 * Creates an Iconify plugin for Payload CMS.
 *
 * @param options - Configuration options for the plugin.
 * @returns A function that modifies the Payload configuration.
 */
export const skeletonPlugin = (
  incomingOptions: Partial<SkeletonPluginOptions> = {},
): ((incomingConfig: Config) => Config) => {
  // Merge incoming options with defaults
  const options: SkeletonPluginOptions = {
    enabled: true,
    clientPath: './',
    ...incomingOptions,
  }

  return (incomingConfig: Config): Config => {
    if (options.enabled) {
      // Read version from package.json
      const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'))

      return {
        ...incomingConfig,
        globals: [
          ...(incomingConfig?.globals || []),
          SkeletonSettings(options.clientPath as string),
        ],
        collections: [...(incomingConfig?.collections || []), SkeletonThemes],
        admin: {
          ...incomingConfig.admin,
          custom: {
            ...incomingConfig.admin?.custom,
            hikonic: {
              ...incomingConfig.admin?.custom?.hikonic,
              skeleton: packageJson.version,
            },
          },
        },
      }
    }
    // Return the original config if the plugin is not enabled
    return incomingConfig
  }
}
