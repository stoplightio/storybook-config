import { ThemeProvider, ThemeZones } from '@stoplight/ui-kit';
// @ts-ignore
import addons, { makeDecorator } from '@storybook/addons';
import * as React from 'react';

interface IThemeContainerProps {
  channel: any;
  themes: string[];
  zones: ThemeZones<string>;
}

interface IThemeContainerState {
  themeName: string;
}

export const withThemes = (themes: string[], zones: ThemeZones<string>) =>
  makeDecorator({
    name: 'withThemes',
    wrapper: (story: (context: any) => React.ReactNode, context: any) => (
      <ThemeContainer channel={addons.getChannel()} themes={themes} zones={zones}>
        {story(context)}
      </ThemeContainer>
    ),
  });

class ThemeContainer extends React.Component<IThemeContainerProps, IThemeContainerState> {
  public state = {
    themeName: sessionStorage.themeName || 'light',
  };

  public componentDidMount() {
    const { channel } = this.props;
    channel.on('themes/setTheme', this.onThemeChange);
  }

  public componentWillUnmount() {
    const { channel } = this.props;
    channel.removeListener('themes/setTheme', this.onThemeChange);
  }

  public onThemeChange = (themeName: string) => {
    this.setState({ themeName });
  };

  public render() {
    const { themeName } = this.state;
    const { zones, children } = this.props;

    return (
      <ThemeProvider theme={{ base: themeName }} zones={zones}>
        {children}
      </ThemeProvider>
    );
  }
}
