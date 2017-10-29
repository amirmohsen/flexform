import React from 'react';
import PropTypes from 'prop-types';
import {Path} from 'flexschema';
import FieldStore from './FieldStore';
import ProcessorStore from './ProcessorStore';
import Architect from './Architect';

const {
	Component
} = React;

const
	store = new FieldStore(),
	processorStore = new ProcessorStore();

Architect.store = store;
Architect.processorStore = processorStore;

export default class FlexForm extends Component {

	static propTypes = {
		value: PropTypes.any.isRequired,
		meta: PropTypes.object.isRequired,
		schema: PropTypes.object.isRequired,
		namespace: PropTypes.string,
		plan: PropTypes.object,
		onChange: PropTypes.func,
		onSubmit: PropTypes.func,
		className: PropTypes.string,
		style: PropTypes.object
	};

	static defaultProps = {
		onChange: () => {},
		className: '',
		style: {}
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

	static store = store;

	static processorStore = processorStore;

	save = ({path, value}) => this.props.onChange({
		value: path.setData({
			data: this.props.value,
			newData: value,
			immutable: true
		})
	});

	onSubmit = e => {
		if(this.props.onSubmit) {
			this.props.onSubmit({e, value: this.props.value});
		}
		else {
			e.preventDefault();
		}
	};

	getChildContext() {
		return {
			flexForm: {
				data: this.props.value,
				meta: this.props.meta,
				schema: this.props.schema,
				save: this.save,
				schemaPath: new Path(),
				path: new Path()
			}
		};
	}

	getChildren() {
		if(this.props.plan) {
			const architect = new Architect({
				namespace: this.props.namespace,
				schema: this.props.schema,
				plan: this.props.plan,
				data: this.props.value
			});
			architect.build();
			return architect.tree;
		}

		return this.props.children;
	}

	render() {
		return (
			<form className={this.props.className} style={this.props.style} onSubmit={this.onSubmit}>
				{this.getChildren()}
			</form>
		);
	}

	static registerField(args) {
		this.store.set(args);
	}

	static registerProcessor(args) {
		this.processorStore.set(args);
	}
}