const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const webpackConfigCommon = require('./webpack.config.common');

const devDomain = 'local.jd.com';
const devPort = 8008;

module.exports = webpackMerge(webpackConfigCommon, {
	mode: 'development',
	watch: true,
	devServer: {
		contentBase: path.resolve(__dirname, 'dist'),
		port: devPort,
		open: true,
		host: devDomain,
		proxy: {
			// '/api/modelUtterance': {
			//     target: 'http://127.0.0.1:3000/',
			//     changeOrigin: true,
			//     pathRewrite: {
			//         "/api/modelUtterance": ''
			//     }
			// },
			context: ['/api', '/upload'],
			target: 'http://open-jimi3-test.jd.com/',
			changeOrigin: true
		}
	},

	entry: {
		app: './src/App.tsx'
	},

	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/'
	},

	// Enable sourcemaps for debugging webpack's output.
	devtool: 'source-map',

	resolve: {
		// Add '.ts' and '.tsx' as resolvable extensions.
		extensions: ['.ts', '.tsx', '.js', '.json']
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
			{ test: /\.tsx?$/, loader: 'awesome-typescript-loader' },

			// All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
			{
				enforce: 'pre',
				test: /\.js$/,
				loader: 'source-map-loader',
				exclude: [
					path.resolve(__dirname, 'node_modules/mutationobserver-shim'),
					path.resolve(__dirname, 'node_modules/viser-react'),
					path.resolve(__dirname, 'node_modules/viser'),
					path.resolve(__dirname, 'node_modules/reflect-metadata')
				]
			},

			// image files
			// { test: /\.(png|jpg|gif)}$/, loader: "file-loader" },

			// url loader
			{ test: /\.svg/, use: ['url-loader'] },

			// less
			{
				test: /\.(css|less)$/,
				use: [{ loader: 'style-loader' }, { loader: 'css-loader' }, { loader: 'less-loader' }]
			},

			{ test: /\.ejs$/, loader: 'html-loader' }
		]
	},

	// When importing a module whose path matches one of the following, just
	// assume a corresponding global variable exists and use that instead.
	// This is important because it allows us to avoid bundling all of our
	// dependencies, which allows browsers to cache those libraries between builds.
	externals: {},

	plugins: [
		new CleanWebpackPlugin([path.resolve(__dirname, 'dist')]),
		new HtmlWebpackPlugin({
			title: '数据报表平台',
			template: 'src/template.ejs',
			filename: 'index.html'
		}),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('development')
		}),
		new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
	],
	optimization: {
		splitChunks: {
			chunks: 'async',
			minSize: 30000,
			minChunks: 1,
			maxAsyncRequests: 5,
			maxInitialRequests: 3,
			name: true,
			cacheGroups: {
				vendors: {
					test: /node_modules/,
					name: 'vendors',
					chunks: 'all'
				}
			}
		}
	}
});
