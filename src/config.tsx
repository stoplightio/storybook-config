// @ts-ignore
import { withOptions } from '@storybook/addon-options';
import { addDecorator, configure } from '@storybook/react';
import * as React from 'react';
import { withThemes } from './custom-addons/withThemes';

addDecorator(
  withOptions({
    // @ts-ignore
    name: pkg.name || 'Stoplight UI-Kit',
    // @ts-ignore
    url: pkg.url || 'https://github.com/stoplightio/ui-kit',
    goFullScreen: false,
    showStoriesPanel: true,
    showAddonPanel: true,
    showSearchBox: false,
    addonPanelInRight: true,
    sortStoriesByKind: true,
    hierarchySeparator: /\//,
    hierarchyRootSeparator: /:/,
    selectedAddonPanel: undefined,
  })
);

addDecorator(withThemes);

addDecorator(storyFn => <div>{storyFn()}</div>);

// configure(require('@project/stories'), module);

function loadStories() {
  require('@project/stories');
}

configure(loadStories, module);
