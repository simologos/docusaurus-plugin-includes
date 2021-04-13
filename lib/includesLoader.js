"use strict";
/**
 * Copyright (c) Bucher + Suter.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const loader_utils_1 = require("loader-utils");
const fs_1 = __importDefault(require("fs"));
const markdownLoader = function (source) {
    let fileString = source;
    const callback = this.async();
    const options = loader_utils_1.getOptions(this);
    const markdownFilename = this.resourcePath.substring(this.resourcePath.lastIndexOf('\\') + 1);
    const markdownFilepath = this.resourcePath.substring(0, this.resourcePath.length - markdownFilename.length);
    function addMarkdownIncludes(fileContent) {
        var res = fileContent;
        const includes = fileContent.match(/\{@include: .*\}/g);
        if (includes) {
            includes.forEach(include => {
                const replacer = new RegExp(include, 'g');
                const includeFile = include.substring(11, include.length - 1);
                const fullPath = `${markdownFilepath}${includeFile}`;
                if (fs_1.default.existsSync(fullPath)) {
                    var includeFileContent = fs_1.default.readFileSync(fullPath, "utf8");
                    res = res.replace(replacer, includeFileContent);
                    res = addMarkdownIncludes(res);
                }
                else {
                    res = res.replace(replacer, `\n> include file not found: ${fullPath}\n`);
                }
            });
        }
        return res;
    }
    function replacePlaceHolders(documentContent) {
        var res = documentContent;
        var placeHolders = [...options.replacements];
        if (!placeHolders) {
            placeHolders = [];
        }
        placeHolders.push({ key: '{ContainerMarkdown}', value: markdownFilename });
        placeHolders.forEach(replacement => {
            const replacer = new RegExp(replacement.key, 'g');
            res = res.replace(replacer, replacement.value);
        });
        return res;
    }
    fileString = replacePlaceHolders(addMarkdownIncludes(fileString));
    return (callback && callback(null, fileString));
};
exports.default = markdownLoader;
