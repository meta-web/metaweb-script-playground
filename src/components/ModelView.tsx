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

import {default as ModelStore, EVENT_MODEL_CHANGE, EVENT_PLACEHOLDERS_CHANGE} from '../store/ModelStore';

import {Editor} from './Editor';

export interface IModelViewState {
	model: string;
	placeholders: string;
}

export class ModelView extends React.Component<{},IModelViewState> {

	constructor(props) {

		super(props);

		this.state = {
			model: '',
			placeholders: ''
		};

		this.handleModelChange = this.handleModelChange.bind(this);
		this.handlePlaceholdersChange = this.handlePlaceholdersChange.bind(this);

		this.setModel = this.setModel.bind(this);
		this.setPlaceholders = this.setPlaceholders.bind(this);

	}

	public componentDidMount(){

		ModelStore.on(EVENT_MODEL_CHANGE, this.handleModelChange);
		ModelStore.on(EVENT_PLACEHOLDERS_CHANGE, this.handlePlaceholdersChange);

		this.handleModelChange();
		this.handlePlaceholdersChange();

	}

	public componentWillUnmount(){

		ModelStore.off(EVENT_MODEL_CHANGE, this.handleModelChange);
		ModelStore.off(EVENT_PLACEHOLDERS_CHANGE, this.handlePlaceholdersChange);

	}

	public handleModelChange(){

		let state: any = this.state;
		state.model = ModelStore.getModel();

		this.setState(state);

	}

	public handlePlaceholdersChange(){

		let state: any = this.state;
		state.placeholders = ModelStore.getPlaceholders();

		this.setState(state);

	}

	public setModel(value: string){

		ModelStore.setModel(value);

	}

	public setPlaceholders(value: string){

		ModelStore.setPlaceholders(value);

	}

    public render() {
        return <div className="view-model">
        	<h2>Model</h2>
        	<Editor className="model" mode="json" value={this.state.model} onChange={this.setModel} />
        	<h2>Placeholders</h2>
        	<Editor className="placeholders" mode="json" value={this.state.placeholders} onChange={this.setPlaceholders} />
        </div>;
    }

}