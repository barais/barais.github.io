//import { ScullyConfig } from '@scullyio/scully';
import { ScullyConfig, setPluginConfig } from '@scullyio/scully';
/** this loads the default render plugin, remove when switching to something else. */
import '@scullyio/scully-plugin-puppeteer';
import '@k9n/scully-plugin-toc';

import {
  TocConfig,
  TocPluginName,
} from  '@k9n/scully-plugin-toc';
/*export const config: ScullyConfig = {
  projectRoot: './src',
  projectName: 'mulder',
  outDir: './dist/static',
  routes: {},
};*/

import 'prismjs/components/prism-java.js';
import 'prismjs/components/prism-visual-basic.js';
import 'prismjs/components/prism-yaml.js';
import 'prismjs/components/prism-bash.js';

setPluginConfig('md', { enableSyntaxHighlighting: true });


const tocOptions: TocConfig = {
  blogAreaSelector: '#blog-content', // where to search for TOC headings
  insertSelector: '#toc', // where to insert the TOC
  level: ['h2', 'h3'], // what heading levels to include
  trailingSlash: true, // add trailing slash before the anker ('#')
  scrollIntoViewOnClick: true  // add event to each link that scrolls into view on click:
                               // onclick="document.getElementById('target-id').scrollIntoView()"
};
//const TocPlugin = getTocPlugin();
//setPluginConfig(TocPlugin, tocOptions);
setPluginConfig(TocPluginName, tocOptions);



export const config: ScullyConfig = {
    projectRoot: './src',
    projectName: 'mulder',
    outDir: './dist/static',
    routes: {
        '/teaching/:slug': {
            type: 'contentFolder',
            postRenderers: [TocPluginName],
            slug: {
                folder: './teaching',
            },
        },
        // tslint:disable-next-line:prettier
        '/s/:slug': {
            type: 'contentFolder',
            slug: {
                folder: './includes',
            },
        },
        '/blog/:slug': {
            type: 'contentFolder',
            postRenderers: [TocPluginName],
            slug: {
                folder: './blog',
            },
        },
    },
};
