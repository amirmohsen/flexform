import extend from 'extend';
import nodeExternals from 'webpack-node-externals';
import sharedWebpackConfig from './webpack.shared.config';

export default (config) => {
	let webpackConfig = sharedWebpackConfig(config);
	webpackConfig = extend(true, {}, webpackConfig, {
		output: {
			libraryTarget: 'commonjs2',
			library: 'FlexForm',
		},
		target: 'node',
		externals: []
	});
	webpackConfig.externals.push(nodeExternals());
	return webpackConfig;
};