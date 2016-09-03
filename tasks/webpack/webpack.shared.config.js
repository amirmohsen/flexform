import webpack from 'webpack';

export default (config) => {

	let	webpackConfig = {
		context: config.root,
		entry: config.entries,
		module: {
			loaders: [
				{
					test: /\.jsx?$/,
					exclude: /node_modules/,
					loaders: ['react-hot', 'babel']
				},
				{
					test: /\.json$/, loader: 'json-loader'
				}
			]
		},
		progress: true,
		resolve: {
			root: config.root,
			extensions: ['', '.json', '.js', '.jsx']
		}
	};

	if(process.env.NODE_ENV === 'production') {
		webpackConfig.plugins = webpackConfig.plugins.concat([
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
