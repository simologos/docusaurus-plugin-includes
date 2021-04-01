/**
 * Copyright (c) Bucher + Suter.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LoadContext, Plugin } from '@docusaurus/types';
import path from 'path';
import { RuleSetCondition, RuleSetLoader, RuleSetUseItem, RuleSetRule } from 'webpack';
import { cleanCopySharedFolders, copySharedFolders } from './cli';
import { IncludeLoaderOptionReplacements, IncludesLoaderOptions, IncludesPluginOptions, SharedFoldersOption } from './types';

export default function (
  context: LoadContext,
  options: IncludesPluginOptions,
): Plugin<void> {

  return {

    name: 'docusaurus-plugin-includes',

    configureWebpack(config: any) {
      let docsPluginInclude: RuleSetCondition = [];
      if (config.module) {
        var foundContentDocsPlugin = false;
        config.module.rules.forEach((rule: RuleSetRule) => {
          if (!foundContentDocsPlugin && rule.use && rule.include) {
            const includesArray = rule.include as RuleSetCondition[];
            const useArray = rule.use as RuleSetUseItem[];
            useArray.forEach(useItem => {
              const useSetLoader = useItem as RuleSetLoader;
              if (useSetLoader && useSetLoader.loader) {
                if (useSetLoader.loader.endsWith('plugin-content-docs\\lib\\markdown\\index.js')) {
                  foundContentDocsPlugin = true;
                }
              }
            });
            if (foundContentDocsPlugin) {
              docsPluginInclude = [...includesArray]; // copy the include paths docusaurus-plugin-content-docs 
            }
          }
        });
      }

      const loaderOptions: IncludesLoaderOptions = {
        replacements: options.replacements as IncludeLoaderOptionReplacements
      }

      return {
        module: {
          rules: [{
            test: /(\.mdx?)$/,
            include: docsPluginInclude,
            use: [
              {
                loader: path.resolve(__dirname, './includesLoader.js'),
                options: loaderOptions,
              },
            ],
          }],
        },
      };
    },

    extendCli(cli: any) {

      cli
        .command('includes:copySharedFolders')
        .description('Copy the configured shared folders')
        .action(() => {
          copySharedFolders(options.sharedFolders as SharedFoldersOption, context.siteDir);
        });

      cli
        .command('includes:cleanCopySharedFolders')
        .description('Delete existing target folders first, copySharedFolders')
        .action(() => {
          cleanCopySharedFolders(options.sharedFolders as SharedFoldersOption, context.siteDir);
        });

    },

  };
}
