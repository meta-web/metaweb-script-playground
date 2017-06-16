/*
 * MetaWEB
 *
 * META Script playground
 *
 * @package metaweb-script-playground
 * @copyright 2017 Jiri Hybek <jiri@hybek.cz>
 * @license MIT
 */

import {default as ModelStore} from './ModelStore';
import {default as LogStore} from './LogStore';

import {Compiler, helpers, ModelMockup} from 'metaweb-script';

export class EvalStore {

	protected compiler: Compiler;

	public constructor(){

		this.compiler = new Compiler();

	}

	public eval(source: string){

		let entry = {
			source: source,
			error: null,
			result: null,
			js: null,
			bindings: null
		};

		try {

			let modelData, placeholders;

			try {
				modelData = JSON.parse(ModelStore.getModel());
			} catch(e) {
				throw new Error("Invalid model - cannot parse JSON");
			}

			try {
				placeholders = JSON.parse(ModelStore.getPlaceholders());
			} catch(e) {
				throw new Error("Invalid placeholders - cannot parse JSON");
			}
			
			if(!(modelData instanceof Object) || modelData instanceof Array)
				throw new Error("Model must be an object.");

			if(!(placeholders instanceof Object) || placeholders instanceof Array)
				throw new Error("Placeholders must be an object.");

			let model = new ModelMockup(modelData);

			let script = this.compiler.compileScript(source);
			
			entry.js = script.js;
			entry.bindings = JSON.stringify(script.bindings, null, 4);

			let res = script.executor.call(null, model, placeholders, helpers);

			entry.result = JSON.stringify(res, null, 4);

		} catch (e) {

			entry.error = String(e);

		}

		LogStore.add(entry);

	}

}

export default new EvalStore();
