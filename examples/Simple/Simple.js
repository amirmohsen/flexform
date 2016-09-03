import React, {Component} from 'react';
import schema from './schema';
import FlexForm, {GroupList, Group, Text} from 'src';

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
			<div>
				<FlexForm schema={schema} data={this.state.data} onInit={this.onChange} onChange={this.onChange} >
					<Group path="profile">
						<Text path="name"/>
					</Group>
					<GroupList path="children">
						<Group path="$">
							<Text path="name"/>
						</Group>
					</GroupList>
					{/*<GroupList path"children">*/}
						{/*<Group path"$">*/}
							{/*<Text path"name"/>*/}
							{/*<Image path"image"/>*/}
							{/*<RadioButton path"gender"/>*/}
						{/*</Group>*/}
					{/*</GroupList>*/}
				</FlexForm>
				<pre>
					{JSON.stringify(this.state.data, null, '\t')}
				</pre>
			</div>
		);
	}
}