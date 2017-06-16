/*
 * MetaWEB
 *
 * META Script playground
 *
 * @package metaweb-script-playground
 * @copyright 2017 Jiri Hybek <jiri@hybek.cz>
 * @license MIT
 */

import * as React from "react";
import * as ReactDOM from "react-dom";

import {default as LogStore, EVENT_LOG_CHANGE, ILogEntry} from '../store/LogStore';
import {default as EvalStore} from '../store/EvalStore';

import {LogEntry} from './LogEntry';

export class LogView extends React.Component<{},{}> {

	constructor(props) {

		super(props);

		this.handleChange = this.handleChange.bind(this);
		this.addSample = this.addSample.bind(this);

	}

	public componentDidMount(){

		LogStore.on(EVENT_LOG_CHANGE, this.handleChange);

	}

	public componentWillUnmount(){

		LogStore.off(EVENT_LOG_CHANGE, this.handleChange);

	}

	public handleChange(){

		this.forceUpdate();

	}

	public addSample(){

		EvalStore.eval("1+1");
		
	}
	
    public render() {
        return <div className="view-log">
        	<ul className="entries">
        	{LogStore.getAll().map((entry: ILogEntry) => {
        		return <LogEntry key={entry.id} entry={entry} />
        	})}
        	</ul>
        </div>;
    }

}