/**
 * Copyright (c) Bucher + Suter.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export type IncludesLoaderOptions = {
    replacements: IncludeLoaderOptionReplacements
};

export type IncludeLoaderOptionReplacements = {key: string, value: string}[];

export type SharedFoldersOption = {source: string, target: string}[];

export type IncludesPluginOptions = {
    replacements: IncludeLoaderOptionReplacements,
    sharedFolders: SharedFoldersOption,
    postBuildDeletedFolders: string[]
}

export type VersionInfo = {
  version: string,
  urlAddIn: string,
}
