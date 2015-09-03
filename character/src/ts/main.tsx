/// <reference path="../tsd/tsd.d.ts" />
import * as React from 'react';
import * as Reflux from 'reflux';
import events from 'cu-events';
import { CharacterStore } from 'cu-stores';
import { UnitFrame } from 'cu-components';

const character = CharacterStore.create();

const Character = React.createClass({

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
		// Start listening for character events
		// FIXME: React Actions seem to be broken!!
		character.actions.start();		// no-op cos its broken
	},

	// Render the unit frame using character data
	render: function() {
		var state = this.state, character = state.character;
		return (
			<UnitFrame
				className="character"
				name={character.name} race={character.race}
				health={character.health} maxHealth={character.maxHealth}
				stamina={character.stamina} maxStamina={character.maxStamina} />
		);
	}
});

events.on("init", function() {
	character.actions.start();					// HACK: for cuAPI time limited events issue
	React.render(<Character/>, document.getElementById("cse-ui-character"));
});
