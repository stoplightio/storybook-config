const path = require('path');
const webpack = require('webpack');

const cwd = process.cwd();

const pkg = require.resolve('package.json', {
  paths: [process.cwd()],
}) as any;

module.exports = ({ config }: any) => {
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
        options: {
          onlyCompileBundledFiles: true, // https://github.com/TypeStrong/ts-loader#onlycompilebundledfiles-boolean-defaultfalse
        },
      },
    ],
  });

  config.resolve.extensions.push('.ts', '.tsx');

  return config;
};
