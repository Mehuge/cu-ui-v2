/// <reference path="../tsd/tsd.d.ts" />
import * as React from 'react';
import * as Reflux from 'reflux';
import events from 'cu-events';
debugger;

////////////////////////////////////////////////////////////////////////////////////////
// Test: ControlGameScoreStore
////////////////////////////////////////////////////////////////////////////////////////

import { ControlGameScoreStore } from 'cu-stores';
const controlGameScore : any = ControlGameScoreStore.create();
const TestControlGameScore = React.createClass({
    mixins: [Reflux.connect(controlGameScore.store, 'game')],
    getInitialState: function() {
        return { game: controlGameScore.store.info };
    },
    componentDidMount() {
        controlGameScore.actions.start();
    },
    render: function() {
        return (
            <div>
                <h1>Control Game Score</h1>
                <p>{ JSON.stringify(this.state.game.players) }</p>
                <p>{ JSON.stringify(this.state.game.score) }</p>
            </div>
        );
    }
});

////////////////////////////////////////////////////////////////////////////////////////
// Test: ControlGameStore
////////////////////////////////////////////////////////////////////////////////////////

import { ControlGameStore } from 'cu-stores';
const controlGame : any  = ControlGameStore.create();
const TestControlGame = React.createClass({
	mixins: [Reflux.connect(controlGame.store, 'game')],
	getInitialState: function() {
		return { game: controlGame.store.info };
	},
	componentDidMount() {
        controlGame.actions.start();
	},
	render: function() {
		return (
            <div>
                <h1>Control Game</h1>
                <p>{ JSON.stringify(this.state.game) }</p>
            </div>
        );
	}
});

////////////////////////////////////////////////////////////////////////////////////////
// Test: TestCharacterStore
////////////////////////////////////////////////////////////////////////////////////////

import { CharacterStore } from 'cu-stores';
const character : any  = CharacterStore.create();
const TestCharacter = React.createClass({
    mixins: [Reflux.connect(character.store, 'character')],
    getInitialState: function() {
        return { character: character.store.info };
    },
    componentDidMount() {
        character.actions.start();
    },
    render: function() {
        return (<div><h1>Character</h1><p>{ JSON.stringify(this.state.character) }</p></div>);
    }
});

////////////////////////////////////////////////////////////////////////////////////////
// Test: TestEnemyTargetStore
////////////////////////////////////////////////////////////////////////////////////////

import { EnemyTargetStore } from 'cu-stores';
const enemyTarget : any  = EnemyTargetStore.create();
const TestEnemyTarget = React.createClass({
    mixins: [Reflux.connect(enemyTarget.store, 'enemyTarget')],
    getInitialState: function() {
        return { enemyTarget: enemyTarget.store.info };
    },
    componentDidMount() {
        enemyTarget.actions.start();
    },
    render: function() {
        return (<div><h1>Enemy Target</h1><p>{ JSON.stringify(this.state.enemyTarget) }</p></div>);
    }
});

////////////////////////////////////////////////////////////////////////////////////////
// Test: TestFriendlyTargetStore
////////////////////////////////////////////////////////////////////////////////////////

import { FriendlyTargetStore } from 'cu-stores';
const friendlyTarget : any  = FriendlyTargetStore.create();
const TestFriendlyTarget = React.createClass({
    mixins: [Reflux.connect(friendlyTarget.store, 'friendlyTarget')],
    getInitialState: function() {
        return { friendlyTarget: friendlyTarget.store.info };
    },
    componentDidMount() {
        friendlyTarget.actions.start();
    },
    render: function() {
        return (<div><h1>Friendly Target</h1><p>{ JSON.stringify(this.state.friendlyTarget) }</p></div>);
    }
});

////////////////////////////////////////////////////////////////////////////////////////
// Test: TestAnnouncementStore
////////////////////////////////////////////////////////////////////////////////////////

import { AnnouncementsStore } from 'cu-stores';
const announcements : any  = AnnouncementsStore.create();
const TestAnnouncements = React.createClass({
    mixins: [Reflux.connect(announcements.store, 'announcements')],
    getInitialState: function() {
        return { announcements: announcements.store.info };
    },
    componentDidMount() {
        announcements.actions.start();
    },
    render: function() {
        return (<div><h1>Announcements</h1><p>{ JSON.stringify(this.state.announcements) }</p></div>);
    }
});

////////////////////////////////////////////////////////////////////////////////////////
// Test: Run all of the things
////////////////////////////////////////////////////////////////////////////////////////

const RunAllOfTheThings = React.createClass({
    render: function() {
        return (
            <div>
                <TestControlGameScore/>
                <TestControlGame/>
                <TestCharacter/>
                <TestEnemyTarget/>
                <TestFriendlyTarget/>
                <TestAnnouncements/>
            </div>
        );
    }
});

////////////////////////////////////////////////////////////////////////////////////////
// Wait for cuAPI to initialise
////////////////////////////////////////////////////////////////////////////////////////

events.on("init", function() {

    /* HACK: cuAPI has a bug in that if you don't listen to the events
     * associated with these stores very seen after the API has initialised,
     * (50ms was too long in my test), then you never get the initial values, so
     * we have to start the stores early, as componentDidMount() can be delayed
     * due to Reacts use of an event queue.
     */
    character.actions.start();
    enemyTarget.actions.start();
    friendlyTarget.actions.start();

	// Render the UI
	React.render(<RunAllOfTheThings/>, document.getElementById("mehuge-apitest"));
});
