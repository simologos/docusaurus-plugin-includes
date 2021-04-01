# `docusaurus-plugin-includes`

Plugin for Docusaurus to include the content of markdown in other markdown files.

Other than including files using [MDX transclusion](https://mdxjs.com/getting-started#documents), this plugin ensures that the content of the included markdown file also appears in the table of contents on the right side of the docusaurus page.

The plugin is intended to have shared content (e.g. chapters), that appears in multiple places of the same documentation, as well as shared content that is used in documentation of multiple websites.

Because documentation blocks shared across multiple websites often contain project specific words like the project name, the plugin can also replace placeholders with project specific replacements specified in the docusaurus configuration file.

In order that docusaurus can archive all used markdown files into `versioned_docs` folder when creating a new version, the included files also have to be located inside of the docs folder. So we need to copy the files shared with other products from outside into a subfolder of docs before we can use them. The plugin can also do this copy job for configured folders.

## Usage

### Compile, copy, install as local plugin

```
yarn add docusaurus-plugin-includes
```
or
```
npm install docusaurus-plugin-includes --save
```

Then adapt your `docusaurus.config.js` with the following block:

```
plugins: [
    [
      'docusaurus-plugin-includes',
      {
        replacements: [
          { key: '{ProductName}', value: 'My long product name for XYZ' },
          { key: '{ShortName}', value: 'XYZ' },
        ],
        sharedFolders: [
          { source: '../../_shared', target: '../docs/shared'},
        ]
      },
    ],
  ],
```

### Include markdown files in other markdown files

Add the following at the position where another file should be included:

```
{@include: pathRelativeToDocsFolder/markdownfile.md}
```

A real world sample is `{@include: shared/finesse_compatibility.md}`.
The path is relative from the main docs folder. In the sample above, the included file is located in a subfolder `shared` in the main docs folder.

The included markdown files must be plain markdown files **without** docusaurus headers with tags like `id`and `title`. 

Included files are allowed to again include other files. Make sure to avoid endless include loops.

### Copy shared folder(s) from outside into docs folder

The shared files must also be located in the main `docs` folder to make sure they are also copied automatically from docusaurus into the `versioned_docs` folder when creating a version. Markdown files shared with other external product documentations must therefore somehow be copied from outside into a subfolder of the main docs folder.

The plugin adds 2 command line commands to automate copying these folder(s).
- `includes:copySharedFolders`: Copy the configured shared folders
- `includes:cleanCopySharedFolders`: Delete existing target folders first, copySharedFolders

The folders to copy can be configured in plugins configuration in `docusaurus.config.js` file.

```
  sharedFolders: [
    { source: '../../_shared', target: '../docs/shared'},
  ]
```

Source and target path are defined relative to the website folder where also the file `docusaurus.config.js` is located.

### Replace placeholders

Because we often need the product name or the CRM name in the documentation, we need the possibility to add placeholders in the shared markdown files that will be replaced with the value for the current product.

The plugin also allows such placeholder replacements configured in `docusaurus.config.js` file.

```
  replacements: [
    { key: '{ProductName}', value: 'My Awesome Project' },
    { key: '{SolutionName}', value: 'My Awesome Solution' },
  ],
```
