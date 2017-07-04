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

import _hljs = require('highlight.js');
import _metascript = require('./ext/highlight.js/metascript.js');

var hljs: any = _hljs;

hljs.registerLanguage('metascript', _metascript);

import {App} from './components/App';

window.addEventListener("load", () => {

	//Render app component
	ReactDOM.render(
	    <App />,
	    document.getElementById("app-container")
	);

});