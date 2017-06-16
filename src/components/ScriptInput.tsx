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

import {default as EvalStore} from '../store/EvalStore';

import {Editor} from './Editor';

export interface IScriptInputProps {
	onSubmit?: () => void;
}

export interface IScriptInputState {
	source: string;
}

export class ScriptInput extends React.Component<IScriptInputProps,IScriptInputState> {

	constructor(props) {

		super(props);

		this.state = {
			source: "if(items@loaded,\n   items.0.name ~ ' is ' ~ abs(items.0.age - items.1.age)\n     ~ ' years ' ~ if(#item0.age > items.1.age, 'older', 'younger') ~ ' then ' ~ #item1.name,\n   'Not loaded!')"
		};

		this.setValue = this.setValue.bind(this);
		this.eval = this.eval.bind(this);

	}

	public setValue(value: string){

		this.setState({
			source: value
		});

	}

	public eval(){

		if(this.props.onSubmit)
			this.props.onSubmit.call(null);

		EvalStore.eval(this.state.source);
		
	}
	
    public render() {
        return <div className="script-input">

        	<Editor mode="text" theme="tomorrow_night_eighties" autosize={true} value={this.state.source} onChange={this.setValue} />
        	<nav className="toolbar">
        		<button className="button circle" onClick={this.eval}><i className="mdi mdi-send"></i></button>
        	</nav>
        </div>;
    }

}