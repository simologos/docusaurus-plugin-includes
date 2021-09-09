/**
 * Copyright (c) Bucher + Suter.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
export declare type IncludesLoaderOptions = {
    replacements?: IncludeLoaderOptionReplacements;
    embeds?: IncludeLoaderOptionEmbeds;
    sharedFolders: SharedFoldersOption;
};
declare type HtmlTags = string | HtmlTagObject | (string | HtmlTagObject)[];
interface HtmlTagObject {
    /**
     * Attributes of the HTML tag
     * E.g. `{'disabled': true, 'value': 'demo', 'rel': 'preconnect'}`
     */
    attributes?: {
        [attributeName: string]: string | boolean;
    };
    /**
     * The tag name e.g. `div`, `script`, `link`, `meta`
     */
    tagName: string;
    /**
     * The inner HTML
     */
    innerHTML?: string;
}
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
export declare type InjectHtmlTagsOption = undefined | {
    headTags?: HtmlTags;
    preBodyTags?: HtmlTags;
    postBodyTags?: HtmlTags;
}[];
export declare type IncludesPluginOptions = {
    replacements?: IncludeLoaderOptionReplacements;
    sharedFolders?: SharedFoldersOption;
    postBuildDeletedFolders?: string[];
    embeds?: IncludeLoaderOptionEmbeds;
    injectedHtmlTags?: InjectHtmlTagsOption;
};
export declare type VersionInfo = {
    version: string;
    urlAddIn: string;
};
export {};
//# sourceMappingURL=types.d.ts.map