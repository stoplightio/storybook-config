import * as React from 'react';

const { themes } = require('@project/theme');

interface IPanelProps {
  channel: any;
  active: boolean;
}

interface IPanelState {
  themeName: string;
}

export class Panel extends React.Component<IPanelProps, IPanelState> {
  public state = {
    themeName: sessionStorage.themeName || 'light',
  };

  private setTheme = (themeName: string) => {
    this.setState({ themeName });
    sessionStorage.themeName = themeName;
  };

  public componentDidMount() {
    const { channel } = this.props;
    // Listen to the theme and change it.
    channel.on('themes/setTheme', this.setTheme);
  }

  public render() {
    const { themeName } = this.state;
    const { active, channel } = this.props;

    return active ? (
      <div style={{ margin: 25, width: '100%', overflow: 'auto' }}>
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
    ) : null;
  }

  // This is some cleanup tasks when the Notes panel is unmounting.
  public componentWillUnmount() {
    const { channel } = this.props;
    channel.removeListener('setTheme', this.setTheme);
  }
}
