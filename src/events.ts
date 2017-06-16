/*
 * MetaWEB
 *
 * META Script playground
 *
 * @package metaweb-script-playground
 * @copyright 2017 Jiri Hybek <jiri@hybek.cz>
 * @license MIT
 */

export class EventEmitter {

	private _listeners: any = {};

	public on(eventName: string, handler: (event: any) => void){

		if(!this._listeners[eventName])
			this._listeners[eventName] = [];

		this._listeners[eventName].push(handler);

	}

	public off(eventName: string, handler: (event: any) => void){

		if(!this._listeners[eventName]) return;

		var i = this._listeners[eventName].indexOf(handler);

		if(i >= 0)
			this._listeners[eventName].splice(i, 1);

		if(this._listeners[eventName].length === 0)
			delete this._listeners[eventName];

	}

	public removeAllListeners(){

		this._listeners = {};

	}

	protected emit(eventName: string, eventData: any = null){

		if(!this._listeners[eventName]) return;

		for(var i = 0; i < this._listeners[eventName].length; i++)
			this._listeners[eventName][i].call(null, eventData, eventName);

	}

}