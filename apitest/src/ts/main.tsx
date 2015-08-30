/// <reference path="../tsd/tsd.d.ts" />
import * as React from 'react';
import * as Reflux from 'reflux';
import events from 'cu-events';

const ApiTest = React.createClass({

	// Hook store up to component.  Each time character data is changed,
	// our state is updated, triggering a render
	mixins: [
	],

	// Provide an initial state (TODO: is there a better way to do this?)
	getInitialState: function() {
		return {};
	},

	componentDidMount() {
		// start listening for control game events
		// replace with a store
		const component = this;
		// events.handlesControlGame.start();  --- used by store, not events
		events.on('controlgame-score', function(data) {
			component.setState(data);
		});
	},

	// Render the unit frame using character data
	render: function() {
		return (
			<div>{ JSON.stringify(this.state) }</div>
		);
	}
});

events.on("init", function() {
	React.render(<ApiTest/>, document.getElementById("cse-ui-apitest"));
});
