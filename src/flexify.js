import React from 'react';
import PropTypes from 'prop-types';
import lodash from 'lodash';

const {
	Component,
	cloneElement,
	Children
} = React;

const {
	isEqual
} = lodash;

export default (options = {}) =>  Original => class FlexField extends Component {

	static propTypes = {
		path: PropTypes.string
	};

	static contextTypes = {
		flexForm: PropTypes.shape({
			data: PropTypes.any.isRequired,
			meta: PropTypes.object.isRequired,
			schema: PropTypes.object.isRequired,
			save: PropTypes.func.isRequired,
			path: PropTypes.object.isRequired
		}).isRequired
	};

	static childContextTypes = {
		flexForm: PropTypes.shape({
			data: PropTypes.any.isRequired,
			meta: PropTypes.object.isRequired,
			schema: PropTypes.object.isRequired,
			save: PropTypes.func.isRequired,
			path: PropTypes.object.isRequired
		}).isRequired
	};

	constructor(props, context) {
		super(props, context);
		this.state = this.getState({props, context});
	}

	componentWillReceiveProps(nextProps, nextContext) {
		if(!isEqual(this.props, nextProps) || !isEqual(this.context, nextContext)) {
			this.setState(this.getState({props: nextProps, context: nextContext}));
		}
	}

	getState({props, context}) {
		const
			path = this.getPath({pathPiece: props.path, pathObject: context.flexForm.path}),
			schema = this.getSchema({
				path,
				parentSchema: context.flexForm.schema
			}),
			data = this.getData({
				path,
				context
			});

		return {
			path,
			schema,
			data
		};
	}

	getPath({pathPiece, pathObject}) {
		return pathPiece ? pathObject.push(pathPiece) : pathObject;
	}

	getSchema({path, parentSchema}) {
		return parentSchema.extract({path});
	}

	getData({path, context}) {
		return path.getData({data: context.flexForm.data});
	}

	save = ({value}) => this.context.flexForm.save({
		path: this.state.path,
		value
	});

	getChildContext() {
		return {
			flexForm: {
				...this.context.flexForm,
				path: this.state.path
			}
		};
	}

	getChildren() {
		const
			schema = this.state.schema,
			type = schema.getField({name: 'type'}),
			hasSharedValues = !!schema.getField({name: 'values'});

		if((type === 'array' || type === 'object') && hasSharedValues && Children.count(this.props.children) === 1) {
			if(type === 'array') {
				return this.state.data.map((itemData, index) => cloneElement(this.props.children, {
					path: index
				}));
			}

			return Object.keys(this.state.data).map(key => cloneElement(this.props.children, {
				path: key
			}));
		}

		return this.props.children;
	}

	render() {
		let componentProps = {
			...this.props,
			flexForm: this.state,
			children: this.getChildren(),
			onChange: this.save,
			value: this.state.data
		};

		if(options.generateProps) {
			componentProps = {
				...componentProps,
				...options.generateProps({flexFormContext: this, componentProps})
			}
		}

		return (
			<Original {...componentProps}/>
		);
	}
};