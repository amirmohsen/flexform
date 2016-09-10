import React, {Component} from 'react';
import schema from './schema';
import FlexForm from 'lib';
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