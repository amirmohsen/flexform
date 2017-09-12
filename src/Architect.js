import React from 'react';
import {Path} from 'flexschema';

export default class Architect {

	static store; // value set in the FlexForm.js file
	static processorStore; // value set in the FlexForm.js file

	namespace;
	schema;
	plan;
	data;
	tree = null;

	constructor({namespace, schema, plan, data}) {
		this.namespace = namespace;
		this.schema = schema;
		this.plan = plan;
		this.data = data;
	}

	build() {
		this.tree = this._getComponent({
			isRoot: true,
			plan: this.plan,
			parentPath: new Path(),
			parentSchema: this.schema
		});
	}

	_getComponent({plan, parentPath, parentSchema, key, isRoot = false}) {
		let
			args = {
				plan,
				parentPath,
				parentSchema,
				key,
				isRoot,
				name: null,
				path: null,
				props: null,
				children: null,
				schema: null,
				renderedChildren: null,
				fieldComponent: null,
				isProcessed: {
					name: false,
					fieldComponent: false,
					props: false,
					children: false,
					path: false,
					schema: false,
					renderedChildren: false,
					key: false
				},
				settings: {
					renderWhenEmpty: false,
					renderWhenNoData: false,
					...(plan.settings ? plan.settings : {})
				},
				architect: this
			};


		this._processDynamic(args);

		args.name = this._getName(args);
		if(!args) {
			return null;
		}
		args.isProcessed.name = true;

		const FieldComponent = this._getFieldComponent(args);
		args.fieldComponent = FieldComponent;
		args.isProcessed.fieldComponent = true;

		if(args.plan.props) {
			args.props = this._getProps(args);
		}
		else {
			args.props = {};
		}

		args.isProcessed.props = true;

		if(args.plan.children) {
			args.children = this._getChildren(args);
		}

		args.isProcessed.children = true;

		if(args.props.path) {
			args.path = this._getPath(args);
			args.isProcessed.path = true;

			args.schema = this._getSchema(args);
			args.isProcessed.schema = true;

			if(!args.settings.renderWhenNoData && !this._hasData(args)) {
				return null;
			}
		}
		else if(args.isRoot) {
			args.path = args.parentPath;
			args.isProcessed.path = true;

			args.schema = args.parentSchema;
			args.isProcessed.schema = true;

			if(!args.settings.renderWhenNoData && !this._hasData(args)) {
				return null;
			}
		}
		else {
			args.isProcessed.path = true;
			args.isProcessed.schema = true;
		}

		if(args.children) {
			args.renderedChildren = this._renderChildren(args);

			if(!args.settings.renderWhenEmpty && !this._hasChildren(args)) {
				return null;
			}

			args.props.children = args.renderedChildren;
		}

		args.isProcessed.renderedChildren = true;

		if(!args.props.key) {
			args.props.key = this._getKey(args);
		}

		args.isProcessed.key = true;

		return <FieldComponent {...args.props}/>
	}

	_getName(args) {
		let {name} = args.plan;

		if(typeof name === 'function') {
			name = name(args);
		}

		return name;
	}

	_processDynamic(args) {
		if(args.plan && args.plan.dynamic) {
			let {processor, processorArgs = {}} = args.plan;
			processor = this.constructor.processorStore.get(processor).processor;
			args.plan = processor(processorArgs, args);
		}
	}

	_getFieldComponent({name}) {
		const {component} = this.constructor.store.get({namespace: this.namespace, name});
		return component;
	}

	_getProps(args) {
		const {props} = args.plan;

		if(typeof props === 'function') {
			return props(args);
		}

		return props;
	}

	_getChildren(args) {
		const {children} = args.plan;

		if(typeof children === 'function') {
			return children(args);
		}

		return children;
	}

	_getPath({parentPath, props}) {
		return parentPath.push(props.path);
	}

	_getSchema({parentSchema, props}) {
		return parentSchema.extract({path: new Path({path: props.path})});
	}

	_getKey({plan, key}) {
		if(plan.key !== undefined) {
			return plan.key;
		}

		return key;
	}

	_renderChildren({children, parentPath, path, parentSchema, schema}) {
		if(Array.isArray(children)) {
			return children.map((plan, index) => this._getComponent({
				plan,
				parentPath: path ? path : parentPath,
				parentSchema: schema ? schema : parentSchema,
				key: index
			})).filter(child => !!child);
		}
		return this._getComponent({
			plan: children,
			parentPath: path ? path : parentPath,
			parentSchema: schema ? schema : parentSchema
		});
	}

	_hasData(args) {
		return args.path.getData({data: this.data}) !== undefined;
	}

	_hasChildren(args) {
		return (!Array.isArray(args.renderedChildren) && args.renderedChildren) ||
			(Array.isArray(args.renderedChildren) && args.renderedChildren.length);
	}
}