// @ts-ignore
import addons, { makeDecorator } from '@storybook/addons';
import * as React from 'react';

const { ThemeProvider, zones, defaultThemeStyles } = require('@project/theme');

interface IThemeContainerProps {
  channel: any;
  children: React.ReactNode;
}

interface IThemeContainerState {
  themeName: string;
  defaultStyles: boolean;
}

export const withThemes = makeDecorator({
  name: 'withThemes',
  wrapper: (story: (context: any) => React.ReactNode, context: any) => (
    <ThemeContainer channel={addons.getChannel()}>
      {story(context)}
    </ThemeContainer>
  ),
});

class ThemeContainer extends React.Component<IThemeContainerProps, IThemeContainerState> {
  public state = {
    themeName: sessionStorage.themeName || 'light',
    defaultStyles: sessionStorage.themeDefaultStyles === 'true',
  };

  public componentDidMount() {
    const { channel } = this.props;
    channel.on('themes/setTheme', this.onThemeChange);
    channel.on('themes/setDefaultStyles', this.onDefaultStyles);
  }

  public componentWillUnmount() {
    const { channel } = this.props;
    channel.removeListener('themes/setTheme', this.onThemeChange);
    channel.removeListener('themes/setDefaultStyles', this.onDefaultStyles);
  }

  public onThemeChange = (themeName: string) => {
    this.setState({ themeName });
  };

  public onDefaultStyles = (defaultStyles: boolean) => {
    this.setState({ defaultStyles });
  };

  public render() {
    const { themeName, defaultStyles } = this.state;
    const { children } = this.props;

    return (
      <div style={defaultStyles && defaultThemeStyles ? defaultThemeStyles[themeName] : null}>
        <ThemeProvider theme={{ base: themeName }} zones={zones}>
          {children}
        </ThemeProvider>
      </div>
    );
  }
}
