/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export interface Config {
  auth: {
    users: UserAuthOperations;
  };
  collections: {
    users: User;
    media: Media;
    v2indexes: V2Index;
    v2pages: V2Page;
    v2tokens: V2Token;
    v2items: V2Item;
    v2blocks: V2Block;
    'payload-locked-documents': PayloadLockedDocument;
    'payload-preferences': PayloadPreference;
    'payload-migrations': PayloadMigration;
  };
  collectionsJoins: {
    v2indexes: {
      related: 'v2indexes';
    };
    v2pages: {
      related: 'v2pages';
    };
    v2tokens: {
      related: 'v2tokens';
    };
    v2items: {
      related: 'v2items';
    };
  };
  collectionsSelect: {
    users: UsersSelect<false> | UsersSelect<true>;
    media: MediaSelect<false> | MediaSelect<true>;
    v2indexes: V2IndexesSelect<false> | V2IndexesSelect<true>;
    v2pages: V2PagesSelect<false> | V2PagesSelect<true>;
    v2tokens: V2TokensSelect<false> | V2TokensSelect<true>;
    v2items: V2ItemsSelect<false> | V2ItemsSelect<true>;
    v2blocks: V2BlocksSelect<false> | V2BlocksSelect<true>;
    'payload-locked-documents': PayloadLockedDocumentsSelect<false> | PayloadLockedDocumentsSelect<true>;
    'payload-preferences': PayloadPreferencesSelect<false> | PayloadPreferencesSelect<true>;
    'payload-migrations': PayloadMigrationsSelect<false> | PayloadMigrationsSelect<true>;
  };
  db: {
    defaultIDType: string;
  };
  globals: {
    v2website: V2Website;
  };
  globalsSelect: {
    v2website: V2WebsiteSelect<false> | V2WebsiteSelect<true>;
  };
  locale: null;
  user: User & {
    collection: 'users';
  };
  jobs: {
    tasks: unknown;
    workflows: unknown;
  };
}
export interface UserAuthOperations {
  forgotPassword: {
    email: string;
    password: string;
  };
  login: {
    email: string;
    password: string;
  };
  registerFirstUser: {
    email: string;
    password: string;
  };
  unlock: {
    email: string;
    password: string;
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users".
 */
export interface User {
  id: string;
  updatedAt: string;
  createdAt: string;
  email: string;
  resetPasswordToken?: string | null;
  resetPasswordExpiration?: string | null;
  salt?: string | null;
  hash?: string | null;
  loginAttempts?: number | null;
  lockUntil?: string | null;
  password?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media".
 */
export interface Media {
  id: string;
  alt: string;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  thumbnailURL?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  focalX?: number | null;
  focalY?: number | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "v2indexes".
 */
export interface V2Index {
  id: string;
  name?: string | null;
  products?: boolean | null;
  home?: boolean | null;
  paginated?: boolean | null;
  meta?: (string | V2Index)[] | null;
  related?: {
    docs?: (string | V2Index)[] | null;
    hasNextPage?: boolean | null;
  } | null;
  v2tokens?: (string | V2Token)[] | null;
  layout?: {
    hero?: {
      preset?: (string | null) | V2Block;
      section?: ('hero' | 'text') | null;
    };
    main?:
      | {
          preset?: (string | null) | V2Block;
          section?: ('hero' | 'text') | null;
          id?: string | null;
        }[]
      | null;
    footer?: {
      preset?: (string | null) | V2Block;
      section?: ('hero' | 'text') | null;
    };
  };
  childrenLayout?: {
    hero?: {
      preset?: (string | null) | V2Block;
      section?: ('hero' | 'text') | null;
    };
    main?:
      | {
          preset?: (string | null) | V2Block;
          section?: ('hero' | 'text') | null;
          id?: string | null;
        }[]
      | null;
    footer?: {
      preset?: (string | null) | V2Block;
      section?: ('hero' | 'text') | null;
    };
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "v2tokens".
 */
export interface V2Token {
  id: string;
  name?: string | null;
  products?: boolean | null;
  meta?: (string | V2Token)[] | null;
  related?: {
    docs?: (string | V2Token)[] | null;
    hasNextPage?: boolean | null;
  } | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "v2blocks".
 */
export interface V2Block {
  id: string;
  title?: string | null;
  block?:
    | {
        text?: string | null;
        id?: string | null;
        blockName?: string | null;
        blockType: 'text';
      }[]
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "v2pages".
 */
export interface V2Page {
  id: string;
  name?: string | null;
  factory?: (string | null) | V2Index;
  factoryData?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  test2?: boolean | null;
  meta?: (string | V2Page)[] | null;
  related?: {
    docs?: (string | V2Page)[] | null;
    hasNextPage?: boolean | null;
  } | null;
  v2items?: (string | V2Item)[] | null;
  layout?: {
    hero?: {
      preset?: (string | null) | V2Block;
      section?: ('hero' | 'text') | null;
    };
    main?:
      | {
          preset?: (string | null) | V2Block;
          section?: ('hero' | 'text') | null;
          id?: string | null;
        }[]
      | null;
    footer?: {
      preset?: (string | null) | V2Block;
      section?: ('hero' | 'text') | null;
    };
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "v2items".
 */
export interface V2Item {
  id: string;
  name?: string | null;
  factory?: (string | null) | V2Token;
  factoryData?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  meta?: (string | V2Item)[] | null;
  related?: {
    docs?: (string | V2Item)[] | null;
    hasNextPage?: boolean | null;
  } | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents".
 */
export interface PayloadLockedDocument {
  id: string;
  document?:
    | ({
        relationTo: 'users';
        value: string | User;
      } | null)
    | ({
        relationTo: 'media';
        value: string | Media;
      } | null)
    | ({
        relationTo: 'v2indexes';
        value: string | V2Index;
      } | null)
    | ({
        relationTo: 'v2pages';
        value: string | V2Page;
      } | null)
    | ({
        relationTo: 'v2tokens';
        value: string | V2Token;
      } | null)
    | ({
        relationTo: 'v2items';
        value: string | V2Item;
      } | null)
    | ({
        relationTo: 'v2blocks';
        value: string | V2Block;
      } | null);
  globalSlug?: string | null;
  user: {
    relationTo: 'users';
    value: string | User;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences".
 */
export interface PayloadPreference {
  id: string;
  user: {
    relationTo: 'users';
    value: string | User;
  };
  key?: string | null;
  value?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations".
 */
export interface PayloadMigration {
  id: string;
  name?: string | null;
  batch?: number | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users_select".
 */
export interface UsersSelect<T extends boolean = true> {
  updatedAt?: T;
  createdAt?: T;
  email?: T;
  resetPasswordToken?: T;
  resetPasswordExpiration?: T;
  salt?: T;
  hash?: T;
  loginAttempts?: T;
  lockUntil?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media_select".
 */
export interface MediaSelect<T extends boolean = true> {
  alt?: T;
  updatedAt?: T;
  createdAt?: T;
  url?: T;
  thumbnailURL?: T;
  filename?: T;
  mimeType?: T;
  filesize?: T;
  width?: T;
  height?: T;
  focalX?: T;
  focalY?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "v2indexes_select".
 */
export interface V2IndexesSelect<T extends boolean = true> {
  name?: T;
  products?: T;
  home?: T;
  paginated?: T;
  meta?: T;
  related?: T;
  v2tokens?: T;
  layout?:
    | T
    | {
        hero?:
          | T
          | {
              preset?: T;
              section?: T;
            };
        main?:
          | T
          | {
              preset?: T;
              section?: T;
              id?: T;
            };
        footer?:
          | T
          | {
              preset?: T;
              section?: T;
            };
      };
  childrenLayout?:
    | T
    | {
        hero?:
          | T
          | {
              preset?: T;
              section?: T;
            };
        main?:
          | T
          | {
              preset?: T;
              section?: T;
              id?: T;
            };
        footer?:
          | T
          | {
              preset?: T;
              section?: T;
            };
      };
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "v2pages_select".
 */
export interface V2PagesSelect<T extends boolean = true> {
  name?: T;
  factory?: T;
  factoryData?: T;
  test2?: T;
  meta?: T;
  related?: T;
  v2items?: T;
  layout?:
    | T
    | {
        hero?:
          | T
          | {
              preset?: T;
              section?: T;
            };
        main?:
          | T
          | {
              preset?: T;
              section?: T;
              id?: T;
            };
        footer?:
          | T
          | {
              preset?: T;
              section?: T;
            };
      };
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "v2tokens_select".
 */
export interface V2TokensSelect<T extends boolean = true> {
  name?: T;
  products?: T;
  meta?: T;
  related?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "v2items_select".
 */
export interface V2ItemsSelect<T extends boolean = true> {
  name?: T;
  factory?: T;
  factoryData?: T;
  meta?: T;
  related?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "v2blocks_select".
 */
export interface V2BlocksSelect<T extends boolean = true> {
  title?: T;
  block?:
    | T
    | {
        text?:
          | T
          | {
              text?: T;
              id?: T;
              blockName?: T;
            };
      };
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents_select".
 */
export interface PayloadLockedDocumentsSelect<T extends boolean = true> {
  document?: T;
  globalSlug?: T;
  user?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences_select".
 */
export interface PayloadPreferencesSelect<T extends boolean = true> {
  user?: T;
  key?: T;
  value?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations_select".
 */
export interface PayloadMigrationsSelect<T extends boolean = true> {
  name?: T;
  batch?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "v2website".
 */
export interface V2Website {
  id: string;
  title?: string | null;
  hero?: (string | null) | V2Block;
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "v2website_select".
 */
export interface V2WebsiteSelect<T extends boolean = true> {
  title?: T;
  hero?: T;
  updatedAt?: T;
  createdAt?: T;
  globalType?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "auth".
 */
export interface Auth {
  [k: string]: unknown;
}


declare module 'payload' {
  export interface GeneratedTypes extends Config {}
}