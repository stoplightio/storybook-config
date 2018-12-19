const path = require('path');
const webpack = require('webpack');

const cwd = process.cwd();

const pkg = require.resolve('package.json', {
  paths: [process.cwd()],
}) as any;

module.exports = (baseConfig: any, env: any, config: any) => {
  config.context = cwd;
  config.mode = 'development';
  config.resolve.alias['@project/stories'] = require.resolve('src/__stories__/index.ts', { paths: [cwd] });
  config.resolve.alias['@project/theme'] = require.resolve('.storybook/theme', {
    paths: [cwd],
  });

  config.plugins.push(
    new webpack.DefinePlugin({
      'pkg.name': JSON.stringify(pkg.name),
      'pkg.url': JSON.stringify(pkg.url),
    })
  );

  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    include: [path.resolve(cwd, 'src')],
    use: [
      {
        loader: require.resolve('ts-loader'),
        options: {},
      },
      {
        loader: require.resolve('react-docgen-typescript-loader'),
        options: {
          // without this, react / html base props will be included and there are a LOT of them
          propFilter: (prop: any) => {
            if (prop.parent == null) {
              return true;
            }

            return prop.parent.fileName.indexOf('node_modules/@types/react') < 0;
          },
        },
      },
    ],
  });

  config.resolve.extensions.push('.ts', '.tsx');

  return config;
};
