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

export interface ILogEntry {
	id?: string;
	source: string;
	error: string;
	result: string;
	js: string;
	bindings: string;
}

export const EVENT_LOG_CHANGE = 'change';

export class LogStore extends EventEmitter {

	protected entries: Array<ILogEntry> = [];

	public add(entry: ILogEntry){

		entry.id = Math.random() + "_" + Date.now();

		this.entries.unshift(entry);
		this.emit(EVENT_LOG_CHANGE);

	}

	public getAll(){

		return this.entries.slice();

	}

}

export default new LogStore();