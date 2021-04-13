/**
 * Copyright (c) Bucher + Suter.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
export declare type IncludesLoaderOptions = {
    replacements: IncludeLoaderOptionReplacements;
};
export declare type IncludeLoaderOptionReplacements = {
    key: string;
    value: string;
}[];
export declare type SharedFoldersOption = {
    source: string;
    target: string;
}[];
export declare type IncludesPluginOptions = {
    replacements: IncludeLoaderOptionReplacements;
    sharedFolders: SharedFoldersOption;
    postBuildDeletedFolders: string[];
};
export declare type VersionInfo = {
    version: string;
    urlAddIn: string;
};
//# sourceMappingURL=types.d.ts.map