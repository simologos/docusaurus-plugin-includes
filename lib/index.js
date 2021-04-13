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
const path_1 = __importDefault(require("path"));
const cli_1 = require("./cli");
const postBuildDeletes_1 = require("./postBuildDeletes");
function default_1(context, pluginOptions) {
    return {
        name: 'docusaurus-plugin-includes',
        configureWebpack(config, _isServer, _utils) {
            let docsPluginInclude = [];
            if (config.module) {
                var foundContentDocsPlugin = false;
                config.module.rules.forEach(rule => {
                    if (!foundContentDocsPlugin && rule.use && rule.include) {
                        const includesArray = rule.include;
                        const useArray = rule.use;
                        useArray.forEach(useItem => {
                            const useSetLoader = useItem;
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
            const loaderOptions = {
                replacements: pluginOptions.replacements
            };
            return {
                module: {
                    rules: [{
                            test: /(\.mdx?)$/,
                            include: docsPluginInclude,
                            use: [
                                {
                                    loader: path_1.default.resolve(__dirname, './includesLoader.js'),
                                    options: loaderOptions,
                                },
                            ],
                        }],
                },
            };
        },
        extendCli(cli) {
            cli
                .command('includes:copySharedFolders')
                .description('Copy the configured shared folders')
                .action(() => {
                cli_1.copySharedFolders(pluginOptions.sharedFolders, context.siteDir);
            });
            cli
                .command('includes:cleanCopySharedFolders')
                .description('Delete existing target folders first, copySharedFolders')
                .action(() => {
                cli_1.cleanCopySharedFolders(pluginOptions.sharedFolders, context.siteDir);
            });
        },
        async postBuild(_props) {
            if (pluginOptions.postBuildDeletedFolders) {
                await postBuildDeletes_1.postBuildDeleteFolders(pluginOptions.postBuildDeletedFolders);
            }
        },
    };
}
exports.default = default_1;