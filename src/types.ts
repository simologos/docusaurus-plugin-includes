/**
 * Copyright (c) Bucher + Suter.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export type IncludesLoaderOptions = {
    replacements?: IncludeLoaderOptionReplacements,
    embeds?: IncludeLoaderOptionEmbeds
};

export type IncludeLoaderOptionReplacements = {key: string, value: string}[];

export type IncludeLoaderOptionEmbeds = {key: string, embedFunction(code:string): string }[];

export type SharedFoldersOption = undefined | {source: string, target: string}[];

export type IncludesPluginOptions = {
    replacements?: IncludeLoaderOptionReplacements,
    sharedFolders?: SharedFoldersOption,
    postBuildDeletedFolders?: string[],
    embeds?: IncludeLoaderOptionEmbeds
}

export type VersionInfo = {
  version: string,
  urlAddIn: string,
}
