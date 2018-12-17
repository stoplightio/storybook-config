// @ts-ignore
import addons from '@storybook/addons';
import * as React from 'react';

import { Panel } from './Panel';

export const register = (themes: string[]) =>
  addons.register('themes', (api: any) => {
    // Also need to set a unique name to the panel.
    addons.addPanel('themes/panel', {
      title: 'Themes',
      render: ({ active }: Partial<{ active: boolean }>) => (
        <Panel channel={addons.getChannel()} active={!!active} themes={themes} />
      ),
    });
  });
