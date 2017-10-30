# FlexForm
FlexForm is a powerful and flexible form generation React library that uses schemas generated using FlexSchema.

**Instability**
Please be warned that this is library is still quite unstable and lacks tests. If you do find bugs, please file
issues or even better submit PR fixes.

## Installation
`yarn add flexform`
or
`npm install flexform`

## Docs
[Read More](docs/index.md)

## Example
```js
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FlexSchema} from 'flexschema';
import {FlexForm, flexify} from 'flexform';

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
				if: context => {
					let
						data = context.getEntireData(),
						doYouDrinkPath = context.getPath();
					
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
		]).isRequired,
		label: PropTypes.string.isRequired,
		onChange: PropTypes.func.isRequired,
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
		label: PropTypes.string.isRequired,
		value: PropTypes.bool.isRequired,
		onChange: PropTypes.func.isRequired
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
	
	state = {
		data: {}
	};
	
	onChange = ({value}) => this.setState({ data: value });
	
	render() {
		return (
			<FlexForm
				schema={userSchema}
				value={this.state.data}
				onChange={this.onChange}
			>
				<Text
					label="Name"
					path="name"
				/>
				<Checkbox
					label="Do you drink?"
					ath="doYouDrink"
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

```