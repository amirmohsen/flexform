import {resolve} from 'path';
import webpackExamplesConfig from './webpack.examples.config';
import webpackLibConfig from './webpack.lib.config';
import {argv} from 'yargs';

process.chdir(resolve(__dirname, '../../'));

if(argv.debug) {
	process.env.NODE_ENV = 'development';
}
else {
	process.env.NODE_ENV = 'production';
}

let webpackConfig = argv.debug ? webpackExamplesConfig : webpackLibConfig;

export default webpackConfig({
	root: resolve(__dirname, '../../'),
	assetsPath: resolve(__dirname, '../../dist'),
	dev: !!argv.debug,
	entries: {
		index: argv.debug ? './examples/index.js' : './src'
	}
});