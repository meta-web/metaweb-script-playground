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

import {ILogEntry} from '../store/LogStore';

import {Editor} from './Editor';

export interface ILogEntryProps {
	entry: ILogEntry
}

export interface ILogEntryState {
	showJs: boolean;
	showBindings: boolean;
}

export class LogEntry extends React.Component<ILogEntryProps,ILogEntryState> {

	constructor(props: ILogEntryProps) {

		super(props);

		this.state = {
			showJs: false,
			showBindings: false
		};

		this.toggleBindings = this.toggleBindings.bind(this);
		this.toggleJs = this.toggleJs.bind(this);

	}

	public toggleBindings(){

		let state: any = this.state;

		state.showBindings = !state.showBindings;
		this.setState(state);

	}
	
	public toggleJs(){

		let state: any = this.state;

		state.showJs = !state.showJs;
		this.setState(state);

	}

    public render() {

    	let entry = this.props.entry;

        return <li className={ entry.error ? "error" : "success" }>
        	<span className="label">Source</span>
        	<Editor className="source" mode="text" readonly={true} autosize={true} value={entry.source} />
        	<div className="result">
        		<span className="label">Result</span>
        		<Editor className="result" mode="json" readonly={true} autosize={true} value={entry.result} />
        	</div>
        	<div className={"error" + ( entry.error !== null ? " show" : "" )}>
        		<span className="label">Error</span>
        		<pre>{entry.error}</pre>
        	</div>
        	{ !entry.error ? <div className="details">
	        	<nav className="toolbar">
	        		<button className={this.state.showBindings ? "active" : ""} onClick={this.toggleBindings}><i className="mdi mdi-link"></i> Show bindings</button>
	        		<button className={this.state.showJs ? "active" : ""} onClick={this.toggleJs}><i className="mdi mdi-code-tags"></i> Show JS</button>
	        	</nav>
	        	<div className={"bindings" + ( this.state.showBindings ? " show" : "" )}>
					<span className="label">Property bindings</span>
	        		<Editor mode="json" readonly={true} autosize={true} value={entry.bindings} />
	        	</div>
	        	<div className={"js" + ( this.state.showJs ? " show" : "" )}>
	        		<span className="label">JavaScript</span>
					<Editor mode="javascript" readonly={true} autosize={true} wordwrap={true} value={entry.js} />
				</div>
        	</div> : null }
        </li>;
    }

}