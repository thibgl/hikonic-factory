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
    blocks: Block;
    indexes: Index;
    pages: Page;
    tokens: Token;
    items: Item;
    'payload-locked-documents': PayloadLockedDocument;
    'payload-preferences': PayloadPreference;
    'payload-migrations': PayloadMigration;
  };
  collectionsJoins: {
    indexes: {
      products: 'pages';
      related: 'indexes';
    };
    pages: {
      related: 'pages';
    };
    tokens: {
      products: 'items';
      related: 'tokens';
      indexes: 'indexes';
    };
    items: {
      related: 'items';
      pages: 'pages';
    };
  };
  collectionsSelect: {
    users: UsersSelect<false> | UsersSelect<true>;
    media: MediaSelect<false> | MediaSelect<true>;
    blocks: BlocksSelect<false> | BlocksSelect<true>;
    indexes: IndexesSelect<false> | IndexesSelect<true>;
    pages: PagesSelect<false> | PagesSelect<true>;
    tokens: TokensSelect<false> | TokensSelect<true>;
    items: ItemsSelect<false> | ItemsSelect<true>;
    'payload-locked-documents': PayloadLockedDocumentsSelect<false> | PayloadLockedDocumentsSelect<true>;
    'payload-preferences': PayloadPreferencesSelect<false> | PayloadPreferencesSelect<true>;
    'payload-migrations': PayloadMigrationsSelect<false> | PayloadMigrationsSelect<true>;
  };
  db: {
    defaultIDType: number;
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
  id: number;
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
  id: number;
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
 * via the `definition` "blocks".
 */
export interface Block {
  id: number;
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
 * via the `definition` "indexes".
 */
export interface Index {
  id: number;
  name: string;
  producing?: boolean | null;
  neighbors?: (number | Index)[] | null;
  tokens?: (number | Token)[] | null;
  products?: {
    docs?: (number | Page)[] | null;
    hasNextPage?: boolean | null;
  } | null;
  related?: {
    docs?: (number | Index)[] | null;
    hasNextPage?: boolean | null;
  } | null;
  layout?: {
    hero?: {
      preset?: (number | null) | Block;
      header?: string | null;
      body?: {
        root: {
          type: string;
          children: {
            type: string;
            version: number;
            [k: string]: unknown;
          }[];
          direction: ('ltr' | 'rtl') | null;
          format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
          indent: number;
          version: number;
        };
        [k: string]: unknown;
      } | null;
      component?:
        | {
            tokens?: (number | null) | Token;
            items?: (number | Item)[] | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'wall';
          }[]
        | null;
    };
    main?:
      | {
          preset?: (number | null) | Block;
          header?: string | null;
          body?: {
            root: {
              type: string;
              children: {
                type: string;
                version: number;
                [k: string]: unknown;
              }[];
              direction: ('ltr' | 'rtl') | null;
              format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
              indent: number;
              version: number;
            };
            [k: string]: unknown;
          } | null;
          component?:
            | {
                tokens?: (number | null) | Token;
                items?: (number | Item)[] | null;
                id?: string | null;
                blockName?: string | null;
                blockType: 'wall';
              }[]
            | null;
          id?: string | null;
        }[]
      | null;
    footer?: {
      preset?: (number | null) | Block;
      header?: string | null;
      body?: {
        root: {
          type: string;
          children: {
            type: string;
            version: number;
            [k: string]: unknown;
          }[];
          direction: ('ltr' | 'rtl') | null;
          format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
          indent: number;
          version: number;
        };
        [k: string]: unknown;
      } | null;
      component?:
        | {
            tokens?: (number | null) | Token;
            items?: (number | Item)[] | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'wall';
          }[]
        | null;
    };
  };
  childrenLayout?: {
    hero?: {
      preset?: (number | null) | Block;
      header?: string | null;
      body?: {
        root: {
          type: string;
          children: {
            type: string;
            version: number;
            [k: string]: unknown;
          }[];
          direction: ('ltr' | 'rtl') | null;
          format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
          indent: number;
          version: number;
        };
        [k: string]: unknown;
      } | null;
      component?:
        | {
            tokens?: (number | null) | Token;
            items?: (number | Item)[] | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'wall';
          }[]
        | null;
    };
    main?:
      | {
          preset?: (number | null) | Block;
          header?: string | null;
          body?: {
            root: {
              type: string;
              children: {
                type: string;
                version: number;
                [k: string]: unknown;
              }[];
              direction: ('ltr' | 'rtl') | null;
              format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
              indent: number;
              version: number;
            };
            [k: string]: unknown;
          } | null;
          component?:
            | {
                tokens?: (number | null) | Token;
                items?: (number | Item)[] | null;
                id?: string | null;
                blockName?: string | null;
                blockType: 'wall';
              }[]
            | null;
          id?: string | null;
        }[]
      | null;
    footer?: {
      preset?: (number | null) | Block;
      header?: string | null;
      body?: {
        root: {
          type: string;
          children: {
            type: string;
            version: number;
            [k: string]: unknown;
          }[];
          direction: ('ltr' | 'rtl') | null;
          format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
          indent: number;
          version: number;
        };
        [k: string]: unknown;
      } | null;
      component?:
        | {
            tokens?: (number | null) | Token;
            items?: (number | Item)[] | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'wall';
          }[]
        | null;
    };
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "tokens".
 */
export interface Token {
  id: number;
  name: string;
  producing?: boolean | null;
  neighbors?: (number | Token)[] | null;
  products?: {
    docs?: (number | Item)[] | null;
    hasNextPage?: boolean | null;
  } | null;
  related?: {
    docs?: (number | Token)[] | null;
    hasNextPage?: boolean | null;
  } | null;
  indexes?: {
    docs?: (number | Index)[] | null;
    hasNextPage?: boolean | null;
  } | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "items".
 */
export interface Item {
  id: number;
  name: string;
  factory: number | Token;
  factoryData?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  neighbors?: (number | Item)[] | null;
  related?: {
    docs?: (number | Item)[] | null;
    hasNextPage?: boolean | null;
  } | null;
  pages?: {
    docs?: (number | Page)[] | null;
    hasNextPage?: boolean | null;
  } | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "pages".
 */
export interface Page {
  id: number;
  name: string;
  factory: number | Index;
  factoryData?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  neighbors?: (number | Page)[] | null;
  items?: (number | Item)[] | null;
  related?: {
    docs?: (number | Page)[] | null;
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
  id: number;
  document?:
    | ({
        relationTo: 'users';
        value: number | User;
      } | null)
    | ({
        relationTo: 'media';
        value: number | Media;
      } | null)
    | ({
        relationTo: 'blocks';
        value: number | Block;
      } | null)
    | ({
        relationTo: 'indexes';
        value: number | Index;
      } | null)
    | ({
        relationTo: 'pages';
        value: number | Page;
      } | null)
    | ({
        relationTo: 'tokens';
        value: number | Token;
      } | null)
    | ({
        relationTo: 'items';
        value: number | Item;
      } | null);
  globalSlug?: string | null;
  user: {
    relationTo: 'users';
    value: number | User;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences".
 */
export interface PayloadPreference {
  id: number;
  user: {
    relationTo: 'users';
    value: number | User;
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
  id: number;
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
 * via the `definition` "blocks_select".
 */
export interface BlocksSelect<T extends boolean = true> {
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
 * via the `definition` "indexes_select".
 */
export interface IndexesSelect<T extends boolean = true> {
  name?: T;
  producing?: T;
  neighbors?: T;
  tokens?: T;
  products?: T;
  related?: T;
  layout?:
    | T
    | {
        hero?:
          | T
          | {
              preset?: T;
              header?: T;
              body?: T;
              component?:
                | T
                | {
                    wall?:
                      | T
                      | {
                          tokens?: T;
                          items?: T;
                          id?: T;
                          blockName?: T;
                        };
                  };
            };
        main?:
          | T
          | {
              preset?: T;
              header?: T;
              body?: T;
              component?:
                | T
                | {
                    wall?:
                      | T
                      | {
                          tokens?: T;
                          items?: T;
                          id?: T;
                          blockName?: T;
                        };
                  };
              id?: T;
            };
        footer?:
          | T
          | {
              preset?: T;
              header?: T;
              body?: T;
              component?:
                | T
                | {
                    wall?:
                      | T
                      | {
                          tokens?: T;
                          items?: T;
                          id?: T;
                          blockName?: T;
                        };
                  };
            };
      };
  childrenLayout?:
    | T
    | {
        hero?:
          | T
          | {
              preset?: T;
              header?: T;
              body?: T;
              component?:
                | T
                | {
                    wall?:
                      | T
                      | {
                          tokens?: T;
                          items?: T;
                          id?: T;
                          blockName?: T;
                        };
                  };
            };
        main?:
          | T
          | {
              preset?: T;
              header?: T;
              body?: T;
              component?:
                | T
                | {
                    wall?:
                      | T
                      | {
                          tokens?: T;
                          items?: T;
                          id?: T;
                          blockName?: T;
                        };
                  };
              id?: T;
            };
        footer?:
          | T
          | {
              preset?: T;
              header?: T;
              body?: T;
              component?:
                | T
                | {
                    wall?:
                      | T
                      | {
                          tokens?: T;
                          items?: T;
                          id?: T;
                          blockName?: T;
                        };
                  };
            };
      };
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "pages_select".
 */
export interface PagesSelect<T extends boolean = true> {
  name?: T;
  factory?: T;
  factoryData?: T;
  neighbors?: T;
  items?: T;
  related?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "tokens_select".
 */
export interface TokensSelect<T extends boolean = true> {
  name?: T;
  producing?: T;
  neighbors?: T;
  products?: T;
  related?: T;
  indexes?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "items_select".
 */
export interface ItemsSelect<T extends boolean = true> {
  name?: T;
  factory?: T;
  factoryData?: T;
  neighbors?: T;
  related?: T;
  pages?: T;
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
  id: number;
  title?: string | null;
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "v2website_select".
 */
export interface V2WebsiteSelect<T extends boolean = true> {
  title?: T;
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