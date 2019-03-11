import { Box } from '@stoplight/ui-kit/Box';
import { Button } from '@stoplight/ui-kit/Button';
import Channel from '@storybook/channels';
import * as React from 'react';

interface IPanel {
  active: boolean;
  channel: Channel;
}

export const Panel: React.FunctionComponent<IPanel> = ({ active, channel }) => {
  const [themeName, setThemeName] = React.useState(sessionStorage.themeName || 'light');
  const [themes, setThemes] = React.useState<string[]>([]);

  const setTheme = React.useCallback<(theme: string) => void>(
    theme => {
      setThemeName(theme);
      sessionStorage.themeName = theme;
    },
    [setThemeName]
  );

  React.useEffect(
    () => {
      channel.on('themes/list', setThemes);

      return () => {
        channel.removeListener('themes/list', setThemes);
      };
    },
    [channel, setThemes]
  );

  React.useEffect(
    () => {
      channel.on('themes/setTheme', setTheme);

      return () => {
        channel.removeListener('themes/setTheme', setTheme);
      };
    },
    [channel, setTheme]
  );

  if (!active) return null;

  return (
    <Box m="25px" width="100%" overflow="auto">
      {themes.map((theme: string) => (
        <Button
          key={theme}
          onClick={() => channel.emit('themes/setTheme', theme)}
          display="inline-block"
          py={2}
          px={3}
          fontWeight={700}
          mr={3}
          borderRadius={3}
          color={theme === themeName ? 'green' : undefined}
          cursor={theme === themeName ? 'default' : 'pointer'}
          backgroundColor={theme === themeName ? 'eee' : 'transparent'}
        >
          {theme}
        </Button>
      ))}
    </Box>
  );
};
