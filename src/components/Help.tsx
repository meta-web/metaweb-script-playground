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

import MarkdownIt = require('markdown-it');
import highlightjs = require('markdown-it-highlightjs');

import {default as EvalStore} from '../store/EvalStore';

import {Editor} from './Editor';

export interface IHelpProps {
	className: string;
}

export interface IHelpState {
	content: string;
}

export class Help extends React.Component<IHelpProps,IHelpState> {

	constructor(props) {

		super(props);

		this.state = {
			content: ''
		};

	}

	public componentWillMount(){

		var oReq = new XMLHttpRequest();
		
		oReq.addEventListener("load", (res) => {

			let md = new MarkdownIt();
			md.use(highlightjs);

			let content = md.render( oReq.responseText );

			this.setState({
				content: content
			});

		});

		oReq.open("GET", "./HELP.md");
		oReq.send();

	}

    public render() {
        return <div className={this.props.className}>
        	<article className="rtc" dangerouslySetInnerHTML={{__html: this.state.content}}></article>
        </div>;
    }

}