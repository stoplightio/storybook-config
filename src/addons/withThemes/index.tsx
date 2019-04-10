import addons, { makeDecorator, StoryContext } from '@storybook/addons';
import Channel from '@storybook/channels';
import * as React from 'react';

interface IThemeContainer {
  channel: Channel;
  children: React.ReactElement;
  themes: string[];
}

const darkTheme = {
  backgroundColor: '#111',
  color: '#fff',
};

export const withThemes = ({ ThemeProvider, themes, zones }: any) =>
  makeDecorator({
    name: 'withThemes',
    wrapper: (story: (context: StoryContext) => React.ReactNode, context: StoryContext) => (
      <ThemeContainer channel={addons.getChannel()} themes={themes}>
        <ThemeProvider zones={zones}>{story(context)}</ThemeProvider>
      </ThemeContainer>
    ),
  });

const ThemeContainer: React.FunctionComponent<IThemeContainer> = ({ channel, themes, children }) => {
  const [themeName, setThemeName] = React.useState(sessionStorage.themeName || 'light');

  React.useEffect(
    () => {
      channel.emit('themes/list', themes);
    },
    [themes]
  );

  React.useEffect(
    () => {
      channel.on('themes/setTheme', setThemeName);

      return () => {
        channel.removeListener('themes/setTheme', setThemeName);
      };
    },
    [channel, setThemeName]
  );

  return (
    <div style={{ ...(themeName === 'dark' ? darkTheme : null), minHeight: '100vh', padding: '5px 10px' }}>
      {React.cloneElement(children, {
        theme: { base: themeName },
      })}
    </div>
  );
};
