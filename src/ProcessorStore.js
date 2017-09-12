import FlexStore from 'flexstore';

export default class ProcessorStore extends FlexStore {

	has({namespace, name}) {
		return super.has({path: [namespace, name]});
	}

	set({namespace, name, processor}) {
		super.set({
			path: [namespace, name],
			value: {
				processor
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