import webpack from 'webpack';
import CleanPlugin from 'clean-webpack-plugin';

export default (config) => {

	let	webpackConfig = {
		context: config.root,
		entry: config.entries,
		output: {
			path: config.assetsPath,
			filename: '[name].js',
			chunkFilename: '[name]-[chunkhash].js'
		},
		module: {
			loaders: [
				{
					test: /\.jsx?$/,
					exclude: /node_modules/,
					loaders: process.env.NODE_ENV === 'production' ? ['babel'] : ['react-hot', 'babel']
				},
				{
					test: /\.json$/, loader: 'json-loader'
				}
			]
		},
		progress: true,
		plugins: [],
		resolve: {
			root: config.root,
			extensions: ['', '.json', '.js', '.jsx']
		},
		externals: []
	};

	if(process.env.NODE_ENV === 'production') {
		webpackConfig.plugins = webpackConfig.plugins.concat([
			new CleanPlugin([config.assetsPath], {
				root: config.root
			}),
			new webpack.DefinePlugin({
				'process.env': {
					'NODE_ENV': JSON.stringify('production')
				}
			}),
			new webpack.optimize.DedupePlugin(),
			new webpack.optimize.OccurenceOrderPlugin(),
			new webpack.optimize.UglifyJsPlugin({
				compress: {
					warnings: false
				}
			})
		]);
	}
	else {
		webpackConfig.devtool = 'source-map';
	}

	return webpackConfig;
};
