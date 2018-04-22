var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var webpack = require('webpack')

module.exports = {

	entry: {
	 	index: ['./src/js/entry.js'],
	 	util: ['./src/js/util-sync.js']
	},
	output: {
		path: path.resolve(__dirname, './dist/static'),
		publicPath: 'static/',
		filename: '[name].[chunkhash].js'
	},
	resolve: {
		extensions: ['', '.js', '.css', '.html']
	},
	module: {
		loaders: [
			{
				test: /\.css$/,
				loader: 'style!css'
			}
		]
	},
	plugins: [
		// 沒寫chunk如下，視為判斷全部chunk，再轉filename: commons.js
		// new webpack.optimize.CommonsChunkPlugin('common.js'),
		
		new webpack.optimize.CommonsChunkPlugin({
			chunks: ["index", "util"],

			// name為全部chunks轉成統一一個chunk
			name:['commons'],
			filename: "commons.js"
			
		}),
                                               
		new HtmlWebpackPlugin({
			chunks: ['commons', 'util', 'index'], 
			filename: '../index.html', 
			template: './src/tpl/index.html',
			inject: true
		})
	]
}
