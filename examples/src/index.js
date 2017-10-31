import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {FlexSchema} from 'flexschema';
import {FlexForm, flexify} from '../../dist/flexschema.esm';

const {Component} = React;

let userSchema = FlexSchema.init({
	schema: {
		type: 'object',
		shape: {
			name: {
				type: 'string'
			},
			doYouDrink: {
				type: 'boolean'
			},
			weeklyAlcoholConsumptionUnits: {
				type: 'number',
				if: () => context => {
					let
						data = context.getEntireData(),
						doYouDrinkPath = context.getCurrentPath().pop().push('doYouDrink');

					return doYouDrinkPath.getData({data});
				}
			}
		}
	}
});


@flexify()
class Text extends Component {

	static propTypes = {
		value: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.number
		]),
		label: PropTypes.string,
		onChange: PropTypes.func,
		dataType: PropTypes.oneOf([
			'string',
			'number'
		])
	};

	static defaultProps = {
		dataType: 'string'
	};

	onChange = e => {
		let value = e.target.value;

		if(this.props.dataType === 'number') {
			value = Number.parseFloat(value);

			if(Number.isNaN(value)) {
				return;
			}
		}

		this.props.onChange({value});
	};

	render() {
		return (
			<div>
				<div>{this.props.label}</div>
				<input
					value={this.props.value}
					onChange={this.onChange}
				/>
			</div>
		);
	}
}

@flexify()
class Checkbox extends Component {

	static propTypes = {
		label: PropTypes.string,
		value: PropTypes.bool,
		onChange: PropTypes.func
	};

	onChange = () => this.props.onChange({value: !this.props.value});

	render() {
		return (
			<div>
				<div>{this.props.label}</div>
				<input
					type="checkbox"
					checked={this.props.value}
					onChange={this.onChange}
				/>
			</div>
		);
	}
}

class Form extends Component {

	constructor(...args) {
		super(...args);
		this.state = this.processData({value: {}});
	}

	onChange = ({value}) => {
		this.setState(this.processData({value}));
	};

	processData({value}) {
		let context = userSchema.process({
			data: value
		});

		return {
			data: context.getData(),
			schemaSnapshot: context.getSchemaSnapshot()
		};
	}

	render() {
		if(!this.state.schemaSnapshot) {
			return null;
		}

		return (
			<FlexForm
				schema={this.state.schemaSnapshot}
				value={this.state.data}
				onChange={this.onChange}
			>
				<Text
					label="Name"
					path="name"
				/>
				<Checkbox
					label="Do you drink?"
					path="doYouDrink"
				/>
				<Text
					label="How many units of alcohol do you drink every week?"
					path="weeklyAlcoholConsumptionUnits"
					dataType="number"
				/>
			</FlexForm>
		);
	}
}

ReactDOM.render(
	<Form/>,
	document.querySelector('.react-wrapper')
);