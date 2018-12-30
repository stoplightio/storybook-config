import * as React from 'react';

const { themes } = require('@project/theme');

interface IPanelProps {
  channel: any;
  active: boolean;
}

interface IPanelState {
  themeName: string;
  defaultStyles: boolean;
}

export class Panel extends React.Component<IPanelProps, IPanelState> {
  public state = {
    themeName: sessionStorage.themeName || 'light',
    defaultStyles: sessionStorage.themeDefaultStyles === 'true',
  };

  private setTheme = (themeName: string) => {
    this.setState({ themeName });
    sessionStorage.themeName = themeName;
  };

  private setDefaultStyles = (defaultStyles: boolean) => {
    this.setState({ defaultStyles });
    sessionStorage.themeDefaultStyles = defaultStyles;
  };

  public componentDidMount() {
    const { channel } = this.props;
    // Listen to the theme and change it.
    channel.on('themes/setTheme', this.setTheme);
    channel.on('themes/setDefaultStyles', this.setDefaultStyles);
  }

  public render() {
    const { themeName, defaultStyles } = this.state;
    const { active, channel } = this.props;

    return active ? (
      <div style={{ display: 'flex', flexFlow: 'column nowrap', padding: 25, width: '100%', overflow: 'auto' }}>
        <div>
          {themes.map((theme: string) => (
            <span
              key={theme}
              onClick={() => channel.emit('themes/setTheme', theme)}
              style={{
                display: 'inline-block',
                padding: '5px 10px',
                color: theme === themeName ? 'green' : undefined,
                border: `1px solid ${theme === themeName ? '#ccc' : '#ddd'}`,
                marginRight: 10,
                cursor: theme === themeName ? 'default' : 'pointer',
                background: theme === themeName ? '#eee' : 'transparent',
                fontWeight: 'bold',
                borderRadius: 3,
              }}
            >
              {theme}
            </span>
          ))}
        </div>
        <div style={{ marginTop: 20 }}>
          <label htmlFor="default-styles">Inject theme.js' defaultThemeStyles?</label>
          <input
            id="default-styles"
            type="checkbox"
            checked={defaultStyles}
            onChange={() => channel.emit('themes/setDefaultStyles', !defaultStyles)}
          />
        </div>
      </div>
    ) : null;
  }

  // This is some cleanup tasks when the Notes panel is unmounting.
  public componentWillUnmount() {
    const { channel } = this.props;
    channel.removeListener('themes/setTheme', this.setTheme);
    channel.removeListener('themes/setDefaultStyles', this.setDefaultStyles);
  }
}
