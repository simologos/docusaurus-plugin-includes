/**
 * Copyright (c) Bucher + Suter.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { IncludesLoaderOptions } from './types';
import fs from 'fs';
import path from 'path';

// TODO temporary until Webpack5 export this type
// see https://github.com/webpack/webpack/issues/11630
interface Loader extends Function {
  (this: any, source: string): string | Buffer | void | undefined;
}

const markdownLoader: Loader = function (source) {

  let fileString = source as string;
  const callback = this.async();

  const options = this.getOptions() as unknown as IncludesLoaderOptions;
  const markdownFilename = path.basename(this.resourcePath);
  const markdownFilepath = path.dirname(this.resourcePath);

  // Do not load and render markdown files without docusaurus header.
  // These files are only used to be included in other files and should not generate their own web page
  if (fileString.length >= 3 && fileString.substring(0,3) !== '---') {
    return (callback && callback(null, ""));
  }

  function addMarkdownIncludes(fileContent: string) {
    var res = fileContent;
    const matches = fileContent.match(/\{@\w+: .+\}/g);
    if (matches) {
      matches.forEach(match => {
        const replacer = new RegExp(match, 'g');
        if (match.startsWith('{@include: ')) {
          const includeFile = match.substring(11, match.length - 1);
          const fullPath = path.join(markdownFilepath, includeFile);
          if (fs.existsSync(fullPath)) {
            var includeFileContent = fs.readFileSync(fullPath, "utf8");
            res = res.replace(replacer, includeFileContent);
            res = addMarkdownIncludes(res);
          }
          else {
            res = res.replace(replacer, `\n> include file not found: ${includeFile} --> ${fullPath}\n`);
          }
        }
        else {
          const parts = match.substr(2, match.length - 3).split(': ');
          if (parts.length === 2) {
            if (options.embeds) {
              for (const embed of options.embeds) {
                if (embed.key === parts[0]) {
                  const embedResult = embed.embedFunction(parts[1]);
                  res = res.replace(replacer, embedResult);
                }
              }
            }
          }
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
      placeHolders.push({ key: '{ContainerMarkdown}', value: markdownFilename });
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
