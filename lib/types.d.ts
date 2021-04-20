/**
 * Copyright (c) Bucher + Suter.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
export declare type IncludesLoaderOptions = {
    replacements?: IncludeLoaderOptionReplacements;
    embeds?: IncludeLoaderOptionEmbeds;
};
export declare type IncludeLoaderOptionReplacements = {
    key: string;
    value: string;
}[];
export declare type IncludeLoaderOptionEmbeds = {
    key: string;
    embedFunction(code: string): string;
}[];
export declare type SharedFoldersOption = undefined | {
    source: string;
    target: string;
}[];
export declare type IncludesPluginOptions = {
    replacements?: IncludeLoaderOptionReplacements;
    sharedFolders?: SharedFoldersOption;
    postBuildDeletedFolders?: string[];
    embeds?: IncludeLoaderOptionEmbeds;
};
export declare type VersionInfo = {
    version: string;
    urlAddIn: string;
};
//# sourceMappingURL=types.d.ts.map