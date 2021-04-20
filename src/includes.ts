/**
 * Copyright (c) Bucher + Suter.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {getOptions} from 'loader-utils';
import {loader} from 'webpack';
import {IncludesLoaderOptions} from './types';
import fs from 'fs';
 
const markdownLoader: loader.Loader = function (source) {

  let fileString = source as string;
  const callback = this.async();

  const options = getOptions(this) as unknown as IncludesLoaderOptions;
  const markdownFilename = this.resourcePath.substring(this.resourcePath.lastIndexOf('\\')+1);
  const markdownFilepath = this.resourcePath.substring(0, this.resourcePath.length - markdownFilename.length);

  function addMarkdownIncludes(fileContent: string) {
    var res = fileContent;
    const includes = fileContent.match(/\{@include: .*\}/g);
    if (includes) {
      includes.forEach(include => {
        const replacer = new RegExp(include, 'g');
        const includeFile = include.substring(11, include.length-1);
        const fullPath = `${markdownFilepath}${includeFile}`;
        if (fs.existsSync(fullPath)) {
          var includeFileContent = fs.readFileSync(fullPath, "utf8");
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

  function replacePlaceHolders(documentContent: string) {
    var res = documentContent;
    if (options.replacements) {
      var placeHolders = [...options.replacements];
      if (!placeHolders) {
        placeHolders = [];
      }
      placeHolders.push({ key: '{ContainerMarkdown}', value: markdownFilename } );
      placeHolders.forEach(replacement => {
        const replacer = new RegExp(replacement.key, 'g');
        res = res.replace(replacer, replacement.value);
      });
    }
    return res;
  }    

  fileString = replacePlaceHolders(addMarkdownIncludes(fileString));

  return (callback && callback(null, fileString));
};
 
export default markdownLoader;
