import sharedWebpackConfig from './webpack.shared.config';

export default (config) => {
	let webpackConfig = sharedWebpackConfig(config);
	Object.assign(webpackConfig, {
		output: {
			libraryTarget: 'umd',
			library: 'FlexForm'
		}
	});
	return webpackConfig;
};