// Require the webpack-chain module. This module exports a single
// constructor function for creating a configuration API.
const Config = require('webpack-chain');
const WebpackHTMLPlugin = require('html-webpack-plugin');

// Instantiate the configuration with a new API
const config = new Config();

// Make configuration changes using the chain API.
// Every API call tracks a change to the stored configuration.

config
  // Interact with entry points
  .entry('index')
    .add('src/main.js')
    .end()
  // Modify output settings
  .output
    .path('dist')
    .filename('[name].bundle.js');

// Create named rules which can be modified later
config.module
  .rule('lint')
    .test(/\.js$/)
    .pre()
    .include
      .add('src')
      .end()
    // Even create named uses (loaders)
    .use('eslint')
      .loader('eslint-loader')
      .options({
        rules: {
          semi: 'off'
        }
      });

config.module
  .rule('compile')
    .test(/\.js$/)
    .include
      .add('src')
      .add('test')
      .end()
    .use('babel')
      .loader('babel-loader')
      .options({
        presets: [
          ['@babel/preset-env', { modules: false }]
        ]
      });

// Create named plugins too!
config
  .plugin('clean')
    .use(CleanPlugin, [['dist'], { root: '/dir' }]);

config
    .plugin('HtmlWebpackPlugin')
    .options({
        title = "This is my title"
        });

config.module
.rule('HtmlWebpackPlugin')
.use('HtmlWebpackPlugin')
    .tap(options => {
    // modify the options...
    title = "This is my title"
    return options
    });
config.module
.rule('HtmlWebpackPlugin')
.use(HtmlWebpackPlugin)
    .loader('HtmlWebpackPlugin')
    .tap(options => Object.assign(options, { title : "This is my title" }));

// Example: Only add minify plugin during production,
// otherwise set devtool to source-map
config
.when(process.env.NODE_ENV === 'production',
  config => config.plugin('minify').use(BabiliWebpackPlugin),
  config => config.devtool('source-map')
);

// Export the completed configuration object to be consumed by webpack
module.exports = config.toConfig();