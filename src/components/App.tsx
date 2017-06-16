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

import {LogView} from './LogView';
import {ScriptInput} from './ScriptInput';
import {ModelView} from './ModelView';

export interface IAppState {
	showHelp: boolean;
    showHint: boolean;
}

export class App extends React.Component<{},IAppState> {

	constructor(props) {

		super(props);

		this.state = {
			showHelp: false,
            showHint: true
		};

		this.toggleHelp = this.toggleHelp.bind(this);
        this.hideHelp = this.hideHelp.bind(this);

	}

	public toggleHelp(){

		this.setState({
			showHelp: !this.state.showHelp,
            showHint: this.state.showHelp
		});

	}

    public hideHelp(){

        this.setState({
            showHelp: false,
            showHint: false
        });

    }

    public render() {
        return <div className="app">
        	<aside className="sidebar">
        		<header>
        			<h1><strong>META</strong> <em>Script</em> Playground</h1>
                    <a href="https://github.com/meta-web/metaweb-script" className="button circle right-space" target="_blank" title="META Script on GitHub"><i className="mdi mdi-github-circle"></i></a>
        			<button className={"button circle" + ( this.state.showHelp ? " active" : "" )} onClick={this.toggleHelp} title="Toggle Guide"><i className="mdi mdi-book-open-page-variant"></i></button>
        		</header>
        		<ModelView />
        	</aside>
        	<div className="main">
        		<ScriptInput onSubmit={this.hideHelp} />
        		<div className={"content-wrap"+ ( this.state.showHint ? " show-hint" : "" )}>
        			<LogView />
		        	<div className={"help" + ( this.state.showHelp ? " show" : "" )}>
		        		<iframe src="help.html" frameBorder="0" />
		        	</div>
        		</div>
        	</div>
        </div>;
    }

}