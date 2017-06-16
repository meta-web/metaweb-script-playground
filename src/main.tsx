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

import {App} from './components/App';

window.addEventListener("load", () => {

	//Render app component
	ReactDOM.render(
	    <App />,
	    document.getElementById("app-container")
	);

});