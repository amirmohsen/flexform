import autoprefixer from'autoprefixer';
import sharedWebpackConfig from './webpack.shared.config';

export default (config) => {
	let webpackConfig = sharedWebpackConfig(config);
	Object.assign(webpackConfig, {
		output: {
			path: config.assetsPath,
			publicPath: '/assets/',
			filename: '[name].js',
			chunkFilename: '[name]-[chunkhash].js'
		},
		module: {
			loaders: [
				{
					test: /\.scss$/,
					loader: `css?sourceMap!sass?sourceMap!postcss-loader`
				},
				{
					test: /\.jsx?$/,
					exclude: /node_modules/,
					loader: `babel`
				},
				{
					test: /\.json$/, loader: 'json-loader'
				},
				{
					test: /(\.woff2?|\.ttf|\.eot|\.svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
					loader: 'file'
				}
			]
		},
		postcss: () => [
			autoprefixer({add: true, remove: true, browsers: ['last 5 versions']})
		]
	});
	return webpackConfig;
};
