# Flex Form

Flex Form is a JavaScript library for generating forms from Mongoose Schemas, using React components.
**Note: This library is in a working condition. However, since it is the early days, things may rapidly change.**

## Installation

Make sure React and Mongoose are installed in your project.
Mongoose has an npm package which has a lot of issues in the browser.
For now, the CDN version is recommended.

```
npm install --save flexform
```

## Usage

The followings can be imported from the `flexform` module.
 
```
import FlexForm, {Field, FlexFormError, TypeNoMatchError, types, setType} from 'flexform';
```

### Field component

Flex Form as the name suggests, is about providing flexibility.
Unlike other form generators, it doesn't come with built-in fields, but it allows you to create any number of your own fields, both simple and complex.

All fields that you create must extend the `Field` component.
Here's a simple text field. Check the `examples` folder for more.

```
import React from 'react';
import {Field} from 'flexform';

export default class Text extends Field {

	onChange = (e) => {
		this.save(e.target.value);
	};

	render() {
		return (
			<input type="text" value={this.getData()} onChange={this.onChange} />
		)
	}
}
```

### FlexForm component

Provided with the following schema:

```
export default new mongoose.Schema({
	profile: {
		name: String,
		age: Number,
		higherEd: Boolean
	},
	children: [
		{
			name: String,
			gender: {
				type: String,
				default: 'female'
			}
		}
	]
});
```

We can easily generate a form (with or without existing data):

```
import React, {Component} from 'react';
import schema from './schema';
import FlexForm from 'flexform';
import {GroupList, Group, Text, Radio, Checkbox} from '../BasicFields';

export default class Simple extends Component {

	onChange = (data) => {
		this.setState({
			data
		});
	};

	constructor(props) {
		super(props);
		this.state = {
			data: {
				profile: {
					age: 30
				},
				children: [
					{
						name: 'Julie'
					},
					{
						name: 'Ashley'
					}
				]
			}
		};
	}

	render() {
		return (
			<FlexForm schema={schema} data={this.state.data} onInit={this.onChange} onChange={this.onChange} >
				<Group path="profile">
					Name: <Text path="name"/>
					Age: <Text path="age"/>
					Has Higher Education Degree? <Checkbox path="higherEd"/>
				</Group>
				Children:
				<GroupList path="children">
					<Group path="$">
						Name: <Text path="name"/>
						Gender:
						Male: <Radio value="male" path="gender" />
						Female: <Radio value="female" path="gender" />
					</Group>
				</GroupList>
				<pre>
					{JSON.stringify(this.state.data, null, '\t')}
				</pre>
			</FlexForm>
		);
	}
}
```

### Other exports

Other exports can be used for further customization, such as extra types.
For more information, clone this repo and run `npm run dev` to get the example up.

## License

Flex Form is MIT licensed.
