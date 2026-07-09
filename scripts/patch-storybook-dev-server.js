const fs = require('fs');
const path = require('path');

const target = path.join(
  process.cwd(),
  'node_modules',
  '@storybook',
  'core',
  'dist',
  'server',
  'dev-server.js'
);

if (!fs.existsSync(target)) {
  console.log('[postinstall] Storybook dev-server not found, skipping patch.');
  process.exit(0);
}

let content = fs.readFileSync(target, 'utf8');
const original = content;

// Storybook 5 passes removed webpack-dev-middleware options (noInfo/logLevel/clientLogLevel/watchOptions).
const managerOld = `const devMiddlewareOptions = {\n      publicPath: config.output.publicPath,\n      watchOptions: {\n        aggregateTimeout: 2000,\n        ignored: /node_modules/\n      },\n      // this actually causes 0 (regular) output from wdm & webpack\n      logLevel: 'warn',\n      clientLogLevel: 'warning',\n      noInfo: true\n    };`;
const managerNew = `const devMiddlewareOptions = {\n      publicPath: config.output.publicPath,\n      stats: 'errors-warnings'\n    };`;

const previewOld = `const devMiddlewareOptions = _objectSpread({\n      publicPath: previewConfig.output.publicPath,\n      watchOptions: _objectSpread({\n        aggregateTimeout: 1,\n        ignored: /node_modules/\n      }, previewConfig.watchOptions || {}),\n      // this actually causes 0 (regular) output from wdm & webpack\n      logLevel: 'warn',\n      clientLogLevel: 'warning',\n      noInfo: true\n    }, previewConfig.devServer);`;
const previewNew = `const devMiddlewareOptions = {\n      publicPath: previewConfig.output.publicPath,\n      stats: 'errors-warnings'\n    };`;

content = content.replace(managerOld, managerNew);
content = content.replace(previewOld, previewNew);

if (content !== original) {
  fs.writeFileSync(target, content, 'utf8');
  console.log('[postinstall] Patched Storybook dev-server for webpack-dev-middleware v5 compatibility.');
} else {
  console.log('[postinstall] Storybook dev-server patch already applied or pattern not found.');
}
