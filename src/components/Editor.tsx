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

declare var ace: any;

export interface IEditorProps {
	mode: string;
	className?: string;
	onChange?: (value: string) => void;
	readonly?: boolean;
	value?: string;
	theme?: string;
	autosize?: boolean;
	wordwrap?: boolean;
}

export interface IEditorState {
	id: string;
	value: string;
}

export class Editor extends React.Component<IEditorProps,IEditorState> {

	protected editor: any = null;

	constructor(props: IEditorProps) {

		super(props);

		this.state = {
			id: "editor_" + Math.random() + "_" + Date.now(),
			value: props.value
		};

		this.update = this.update.bind(this);

	}

	public componentDidMount(){

		this.editor = ace.edit(this.state.id);

        this.editor.setTheme("ace/theme/" + (this.props.theme || "chrome"));
        this.editor.getSession().setMode("ace/mode/" + this.props.mode);
        this.editor.renderer.setShowGutter(false);
        this.editor.setShowPrintMargin(false);

        if(this.props.autosize)
			this.editor.setOptions({
		    	maxLines: Infinity
			});

		if(this.props.wordwrap)
			this.editor.getSession().setUseWrapMode(true);

        this.editor.setReadOnly(this.props.readonly || false);
		
		if(this.props.value !== undefined)
			this.editor.setValue(this.props.value, -1);

		this.editor.on("change", () => {

			if(this.props.readonly)
				return;

			this.update( this.editor.getValue() );

		});

	}

	public componentWillReceiveProps(nextProps: IEditorProps){

		if(this.editor && nextProps.value != this.state.value)
			this.editor.setValue(nextProps.value, -1);

	}

	public update(value: string){

		if(this.props.onChange){
			
			this.setState({
				id: this.state.id,
				value: value
			});
			
			this.props.onChange.call(null, value);

		}

	}

    public render() {
        return <div className={"code-editor" + ( this.props.readonly ? " readonly" : "" ) + ( this.props.className ? " " + this.props.className : "" )}>
        	<div className="editor-wrap" id={this.state.id}></div>
        </div>;
    }

}