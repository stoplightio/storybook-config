import { ThemeZones } from '@stoplight/ui-kit';
import { withInfo } from '@storybook/addon-info';
import { withOptions } from '@storybook/addon-options';
import { StoryDecorator } from '@storybook/react';
import { withThemes } from './custom-addons/withThemes';

export function setupDecorators(
  addDecorator: (decorator: StoryDecorator) => void,
  themes: string[],
  zones: ThemeZones<string>
) {
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

  addDecorator(
    withInfo({
      header: false,
      inline: true,
      source: false, // not that helpful?
      styles: {
        infoBody: {
          backgroundColor: 'white',
          margin: '50px 0 0 0',
          padding: '0 25px 25px 25px',
          lineHeight: '2',
          width: 800,
          fontSize: 12,
        },
      },
    })
  );

  addDecorator(withThemes(themes, zones));
}
