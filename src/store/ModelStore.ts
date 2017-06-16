/*
 * MetaWEB
 *
 * META Script playground
 *
 * @package metaweb-script-playground
 * @copyright 2017 Jiri Hybek <jiri@hybek.cz>
 * @license MIT
 */

import {EventEmitter} from '../events';

export const EVENT_MODEL_CHANGE = 'model_change';
export const EVENT_PLACEHOLDERS_CHANGE = 'placeholders_change';

export class ModelStore extends EventEmitter {

	protected model: string = '{}';
	protected placeholders: string = '{}';

	public constructor(){

		super();

		this.model = JSON.stringify({
			"@doctype": "test.document",
			"@attribute": "attrValue",
			"@structAttr": {
				_: {
					"a": 1,
					"b": 2
				}
			},
			_: {
				count: {
					$: 2
				},
				items: {
					"@loaded": true,
					_: {
						0: {
							_: {
								"name": { "$": "John" },
								"age": { "$": 32 }
							}
						},
						1: {
							_: {
								"name": { "$": "Jack" },
								"age": { "$": 23 }
							}
						},
					}
				}
			}
		}, null, 4);

		/*
		this.placeholders = JSON.stringify({
			"scope": [],
			"item0": [ "items", "0" ],
			"item1": [ "items", "1" ]
		}, null, 4);
		*/
		this.placeholders = '{\n    "scope": [],\n    "item0": [ "items", "0" ],\n    "item1": [ "items", "1" ]\n}';

	}

	public setModel(model: string){

		this.model = model;
		this.emit(EVENT_MODEL_CHANGE);

	}

	public getModel(){

		return this.model;

	}

	public setPlaceholders(placeholders: string){

		this.placeholders = placeholders;
		this.emit(EVENT_PLACEHOLDERS_CHANGE);

	}

	public getPlaceholders(){

		return this.placeholders;

	}

}

export default new ModelStore();