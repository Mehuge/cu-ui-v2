/// <reference path="../tsd/tsd.d.ts" />
import * as React from 'react';
import * as Reflux from 'reflux';
import events from 'cu-events';
import { ControlGameScoreStore } from 'cu-stores';

const controlGameScoreStore = ControlGameScoreStore.create();

const ApiTest = React.createClass({

	// Hook store up to component.  Each time character data is changed,
	// our state is updated, triggering a render
	mixins: [
		Reflux.connect(controlGameScoreStore, 'score')
	],

	// Provide an initial state (TODO: is there a better way to do this?)
	getInitialState: function() {
		return { score: controlGameScoreStore.info };
	},

	componentDidMount() {
		console.log('ApiTest: handlesControlGameStart.start()');
		// BROKE! events.handlesControlGameScore.start();
		controlGameScoreStore.start();
	},

	// Render the unit frame using character data
	render: function() {
		return (
			<div>{ JSON.stringify(this.state.score) }</div>
		);
	}
});

events.on("init", function() {
	React.render(<ApiTest/>, document.getElementById("cse-ui-apitest"));

	// Basic Reflux Action test.
	const action : any = Reflux.createActions(["test"]);
	console.dir(action);
	console.dir(action.test);
	const store : any = Reflux.createStore({
		listenables: action,
		test() {
			console.log('test action fired');
			debugger;
		}
	});
	console.dir(store);
	action.test();


	console.dir(events.handlesControlGameScore.action);
	events.handlesControlGameScore.action.start();

});
