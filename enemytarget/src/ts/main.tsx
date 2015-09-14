/// <reference path="../tsd/tsd.d.ts" />
import * as React from 'react';
import * as Reflux from 'reflux';
import events from 'cu-events';
import { EnemyTargetStore } from 'cu-stores';
import { UnitFrame } from 'cu-components';

const enemyTarget : any = EnemyTargetStore.create();

const EnemyTarget = React.createClass({

	// Hook store up to component.  Each time character data is changed,
	// our state is updated, triggering a render
	mixins: [
		Reflux.connect(enemyTarget.store, 'enemyTarget')
	],

	// Provide an initial state (TODO: is there a better way to do this?)
	getInitialState: function() {
		return { enemyTarget: enemyTarget.store.info };
	},

	componentDidMount() {
		// Start listening for character events
		// FIXME: broken, currently no-op
		enemyTarget.actions.start();
	},

	// Render the unit frame using character data
	render: function() {
		var state = this.state, enemyTarget = state.enemyTarget;
		return (<UnitFrame
				name={enemyTarget.name} race={enemyTarget.race}
				health={enemyTarget.health} maxHealth={enemyTarget.maxHealth}
				stamina={enemyTarget.stamina} maxStamina={enemyTarget.maxStamina} />
			);
	}
});

events.on("init", function() {
	enemyTarget.actions.start();	// HACK for cuAPI bug
	React.render(<EnemyTarget/>, document.getElementById("cse-ui-enemytarget"));
});
