/// <reference path="definitions/tsd.d.ts" />
import * as React from 'react';
import * as Reflux from 'reflux';
import * as cuAPI from 'cu-fake-api';
import events from 'cu-events';
import { CharacterStore } from 'cu-stores';
import { UnitFrame } from 'cu-components';

const characterStore = CharacterStore.create();

const Character = React.createClass({

	// Hook store up to component.  Each time character data is changed,
	// our state is updated, triggering a render
	mixins: [
		Reflux.connect(characterStore, 'character')
	],

	// Provide an initial state (TODO: is there a better way to do this?)
	getInitialState: function() {
		return { character: characterStore.info };
	},

	componentDidMount() {
		// Start listening for character events
		events.handlesCharacter.start();
	},

	// Render the unit frame using character data
	render: function() {
		var state = this.state, character = state.character;
		return (<UnitFrame
				className="character"
				name={character.name} race={character.race}
				health={character.health} maxHealth={character.maxHealth}
				stamina={character.stamina} maxStamina={character.maxStamina} />
			);
	}
});

events.on("init", function() {
	React.render(<Character/>, document.getElementById("main"));
});