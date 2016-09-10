import extend from 'extend';
import autoprefixer from'autoprefixer';
import sharedWebpackConfig from './webpack.shared.config';

export default (config) => {
	let webpackConfig = sharedWebpackConfig(config);
	webpackConfig = extend(true, {}, webpackConfig, {
		output: {
			publicPath: '/assets/'
		},
		module: {
			loaders: []
		},
		postcss: () => [
			autoprefixer({add: true, remove: true, browsers: ['last 5 versions']})
		]
	});
	webpackConfig.module.loaders = webpackConfig.module.loaders.concat([
		{
			test: /\.scss$/,
			loader: `css?sourceMap!sass?sourceMap!postcss-loader`
		},
		{
			test: /(\.woff2?|\.ttf|\.eot|\.svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
			loader: 'file'
		}
	]);
	return webpackConfig;
};
