import { groupEnd } from 'console'
import type { CollectionConfig, Config, GlobalConfig } from 'payload'
/**
 * Options for the Iconify plugin.
 */
interface AdminGrouperOptions {
  /**
   * Whether the Iconify plugin is enabled.
   * @default true
   */
  enabled?: boolean
  groups: {
    [key: string]: string[]
  }
}

/**
 * Creates an Iconify plugin for Payload CMS.
 *
 * @param options - Configuration options for the plugin.
 * @returns A function that modifies the Payload configuration.
 */
export const AdminGrouper = (
  incomingOptions: Partial<AdminGrouperOptions> = {},
): ((incomingConfig: Config) => Config) => {
  // Merge incoming options with defaults
  const options: AdminGrouperOptions = {
    enabled: true,
    groups: {},
    ...incomingOptions,
  }

  return (incomingConfig: Config): Config => {
    if (options.enabled) {
      return {
        ...incomingConfig,
        globals: [...(incomingConfig.globals ? group(incomingConfig.globals) : [])],
        collections: [...(incomingConfig.collections ? group(incomingConfig.collections) : [])],
      }
    }
    // Return the original config if the plugin is not enabled
    return incomingConfig
  }
}

const group = (
  group: string,
  items: CollectionConfig[] | GlobalConfig[],
): CollectionConfig[] | GlobalConfig[] =>
  items.map((item) => ({
    ...item,
    admin: {
      ...item.admin,
      group,
    },
  }))
