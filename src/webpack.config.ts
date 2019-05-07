const path = require('path');
const webpack = require('webpack');
const PackageImporter = require('node-sass-package-importer');
const inliner = require('sass-inline-svg');

const cwd = process.cwd();

const pkg = require.resolve('package.json', {
  paths: [process.cwd()],
}) as any;

module.exports = ({ config }: any) => {
  config.context = cwd;
  config.mode = 'development';
  config.resolve.alias['@project/stories'] = require.resolve('src/__stories__/index.ts', { paths: [cwd] });

  config.plugins.push(
    new webpack.DefinePlugin({
      'pkg.name': JSON.stringify(pkg.name),
      'pkg.url': JSON.stringify(pkg.url),
    })
  );

  config.module.rules.push({
    test: /\.tsx?$/,
    include: [path.resolve(cwd, 'src')],
    use: [
      {
        loader: require.resolve('ts-loader'),
        options: {
          transpileOnly: true,
          onlyCompileBundledFiles: true, // https://github.com/TypeStrong/ts-loader#onlycompilebundledfiles-boolean-defaultfalse
        },
      },
    ],
  });

  config.module.rules.push({
    test: /\.css$/,
    include: [path.resolve(cwd, 'src')],
    use: [
      {
        loader: require.resolve('style-loader'),
        options: {
          sourceMap: true,
        },
      },
      {
        loader: require.resolve('css-loader'),
        options: {
          sourceMap: true,
          importLoaders: 1,
        },
      },
      {
        loader: require.resolve('postcss-loader'),
        options: {
          sourceMap: true,
          plugins: [
            require('autoprefixer')({
              env: 'last 2 Chrome versions, last 2 Firefox versions, last 1 Safari version',
            }),
          ],
        },
      },
    ],
  });

  config.module.rules.push({
    test: /\.scss$/,
    include: [path.resolve(cwd, 'src')],
    use: [
      {
        loader: require.resolve('style-loader'),
        options: {
          sourceMap: true,
        },
      },
      {
        loader: require.resolve('css-loader'),
        options: {
          sourceMap: true,
          importLoaders: 2,
        },
      },
      {
        loader: require.resolve('postcss-loader'),
        options: {
          sourceMap: true,
          plugins: [
            require('postcss-import'),
            require('autoprefixer')({
              env: 'last 2 Chrome versions, last 2 Firefox versions, last 1 Safari version',
            }),
          ],
        },
      },
      'resolve-url-loader',
      {
        loader: require.resolve('sass-loader'),
        options: {
          sourceMap: true,
          importer: [PackageImporter()],
          functions: {
            'svg-icon': inliner(path.resolve('node_modules', '@stoplight', 'ui-kit', 'styles', 'icons'), {
              // run through SVGO first
              optimize: true,
              // minimal "uri" encoding is smaller than base64
              encodingFormat: 'uri',
            }),
          },
        },
      },
    ],
  });

  config.resolve.extensions.push('.ts', '.tsx', '.jsx', '.js');

  return config;
};
