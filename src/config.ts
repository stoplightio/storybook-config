import { addParameters, configure } from '@storybook/react';
import { create } from '@storybook/theming';

// This is kinda fragile as it makes the assumptions that it is installed in
// the top-level node_modules of the root project.
const pkg = require('../../../package.json');

addParameters({
  options: {
    isFullScreen: false,
    showNav: true,
    showPanel: true,
    showSearchBox: false,
    panelPosition: 'right',
    sortStoriesByKind: true,
    selectedAddonPanel: undefined,
    theme: create({
      base: 'light',

      brandTitle: pkg.name,
      brandUrl: pkg.repository.url,
    }),
  },
});

function loadStories() {
  require('@project/stories');
}

configure(loadStories, module);
