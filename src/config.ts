import { withOptions } from '@storybook/addon-options';
import { addDecorator, configure } from '@storybook/react';
import { withThemes } from './addons/withThemes';

addDecorator(
  withOptions({
    name: pkg.name || 'Stoplight UI-Kit',
    url: pkg.url || 'https://github.com/stoplightio/ui-kit',
    goFullScreen: false,
    showStoriesPanel: true,
    showAddonPanel: true,
    showSearchBox: false,
    addonPanelInRight: true,
    sortStoriesByKind: true,
    selectedAddonPanel: undefined,
  })
);

addDecorator(withThemes(require('@project/theme')));

configure(require('@project/stories'), module);

function loadStories() {
  require('@project/stories');
}

configure(loadStories, module);
