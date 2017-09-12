import FlexStore from 'flexstore';

export default class FieldStore extends Store {

	has({namespace, name}) {
		return super.has({path: [namespace, name]});
	}

	set({namespace, name, component}) {
		super.set({
			path: [namespace, name],
			value: {
				component
			}
		});
	}

	get({namespace, name}) {
		return super.get({path: [namespace, name]});
	}

	remove({namespace, name}) {
		if(this.has({namespace, name})) {
			super.remove({path: [namespace, name]});
		}
	}
}