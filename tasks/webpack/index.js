import {resolve} from 'path';
import webpackConfig from './webpack.examples.config';
import {argv} from 'yargs';

process.chdir(resolve(__dirname, '../../'));

if(argv.debug) {
	process.env.NODE_ENV = 'development';
}
else {
	process.env.NODE_ENV = 'production';
}

export default webpackConfig({
	root: resolve(__dirname, '../../'),
	assetsPath: resolve(__dirname, '../../dist'),
	dev: !!argv.debug,
	entries: {
		main: './examples/index.js'
	}
});