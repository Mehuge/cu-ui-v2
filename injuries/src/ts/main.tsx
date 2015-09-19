/// <reference path="../tsd/tsd.d.ts" />
import * as React from 'react';
import * as Reflux from 'reflux';
import events from 'cu-events';
import { CharacterStore } from 'cu-stores';
import { Injuries } from 'cu-components';

const character : any = CharacterStore.create();

const CharacterInjuries = React.createClass({

	// Hook store up to component.  Each time character data is changed,
	// our state is updated, triggering a render
	mixins: [
		Reflux.connect(character.store, 'character')
	],

	// Provide an initial state (TODO: is there a better way to do this?)
	getInitialState: function() {
		return { character: character.store.info };
	},

	componentDidMount() {
		character.actions.start();    // Start listening for character events
	},

	// Render the unit frame using character data
	render: function() {
		return (<Injuries injuries={this.state.character.injuries}/>);
	}
});

events.on("init", function() {
	character.actions.start();	// HACK for cuAPI bug
	React.render(<CharacterInjuries/>, document.getElementById("cse-ui-injuries"));
});
