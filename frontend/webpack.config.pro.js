const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpackMerge = require('webpack-merge');
const webpackConfigCommon = require('./webpack.config.common');

const basePath = path.resolve(__dirname, '../');
const targetPath = path.resolve(basePath, 'super-web-admin-boot/src/main/resources/static/resource/');
console.log( targetPath);
module.exports = webpackMerge(webpackConfigCommon, {
  mode: 'production',
  entry: {
    app: './src/App.tsx'
    // boss: './src/BossApp.tsx'
  },
  output: {
    filename: '[name].min.js',
    path: targetPath,
    chunkFilename: 'chunk/[name].min.js',
    publicPath: '/resource/'
  },

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ['.ts', '.tsx', '.js', '.json', '.css', '.less']
  },

  module: {
    rules: [
      {
				test: /\.worker\.ts$/, // ts结尾,这也很重要
				use: {
					loader: 'worker-loader',
					options: {
						chunkFilename: '[name]:[hash:8].js', // 打包后chunk的名称
						inline: 'fallback' // 开启内联模式,免得爆缺少标签或者跨域的错误
					}
				}
			},
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      {
        test: /\.(ts|tsx)?$/,
        loader: 'awesome-typescript-loader',
        exclude: /node_modules/
        // options: {
        //     getCustomTransformers: () => ({
        //         before: [ tsImportPluginFactory({
        //             libraryName: 'antd',
        //             libraryDirectory: 'lib',
        //             style: true
        //           }) ]
        //     }),
        // }
      },

      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      // { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },

      // image files
      // { test: /\.(png|jpg|gif)}$/, loader: "file-loader" },

      // url loader
      { test: /\.(png|woff|woff2|eot|ttf|svg)$/, use: ['url-loader'] },

      {
        test: /\.(less)$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
              modifyVars: {
                'primary-color': '#e83632'
              }
            }
          }
        ]
      },
      {
        test: /\.(css)$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          }
        ]
      },

      { test: /\.ejs$/, loader: 'html-loader' }
    ]
  },

  // When importing a module whose path matches one of the following, just
  // assume a corresponding global variable exists and use that instead.
  // This is important because it allows us to avoid bundling all of our
  // dependencies, which allows browsers to cache those libraries between builds.
  externals: {
    // "react": "React",
    // "react-dom": "ReactDOM",
    // "antd": "AntD",
    // "mobx": "mobx",
    // "mobx-react": "mobxReact"
  },
  plugins: [
    new HtmlWebpackPlugin({
      chunks: ['app'],
      filename: '../index.html',
      template: 'src/index.ejs'
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    // new ExtractTextPlugin({
    //     filename: "app.min.css"
    // }),
    // new CompressionWebpackPlugin({
    //     asset    : '[path].gz[query]',
    //     algorithm: 'gzip',
    //     test     : /\.js$|\.css$/,
    //     threshold: 10240,
    //     minRatio : 0.8
    // }),
    new CopyWebpackPlugin([
      {
        from: 'resource/**',
        to: path.resolve(basePath, 'src/main/webapp/WEB-INF/')
      }
    ]),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 0,
      minChunks: 1,
      name: true,
      cacheGroups: {
        react: {
          test: /(react|react-dom)/,
          name: 'react',
          chunks: 'all',
          priority: 70,
          reuseExistingChunk: true
        },
        antd: {
          test: /antd/,
          name: 'antd',
          chunks: 'all',
          priority: 60,
          reuseExistingChunk: true,
          enforce: true
        },
        antv: {
          test: /@antv/,
          name: 'antv',
          chunks: 'all',
          priority: 58,
          reuseExistingChunk: true,
          enforce: true
        },
        lodash: {
          test: /lodash/,
          name: 'lodash',
          chunks: 'all',
          priority: 48,
          reuseExistingChunk: true,
          enforce: true
        },
        quill: {
          test: /quill/,
          name: 'quill',
          chunks: 'all',
          priority: 42,
          reuseExistingChunk: true,
          enforce: true
        },
        mobx: {
          test: /(mobx)/,
          name: 'mobx',
          chunks: 'all',
          priority: 38,
          reuseExistingChunk: true,
          enforce: true
        },
        moment: {
          test: /(moment)/,
          name: 'moment',
          chunks: 'all',
          priority: 36,
          reuseExistingChunk: true,
          enforce: true
        },
        numeral: {
          test: /numeral/,
          name: 'numeral',
          chunks: 'all',
          priority: 50,
          reuseExistingChunk: true,
          enforce: true
        },
        vendors: {
          test: /(?=.*\b(node_modules)\b)(?!.*\b(react|react-dom|antd|antv|numeral|lodash|quill|mobx|moment)\b)(.+)/,
          // test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'initial',
          priority: 80
        }
      }
    }
  }
})
