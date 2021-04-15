import { ScullyConfig, setPluginConfig } from '@scullyio/scully';
import 'prismjs/components/prism-java.js';
import 'prismjs/components/prism-visual-basic.js';
import 'prismjs/components/prism-yaml.js';

setPluginConfig('md', { enableSyntaxHighlighting: true });

export const config: ScullyConfig = {
    projectRoot: './src',
    projectName: 'mulder',
    outDir: './dist/static',
    routes: {
        '/teaching/:slug': {
            type: 'contentFolder',
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
            slug: {
                folder: './blog',
            },
        },
    },
};
