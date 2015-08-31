/// <reference path="../tsd/tsd.d.ts" />
import * as React from 'react';
import * as Reflux from 'reflux';
import events from 'cu-events';

////////////////////////////////////////////////////////////////////////////////////////
// Test: ControlGameScoreStore
////////////////////////////////////////////////////////////////////////////////////////

import { ControlGameScoreStore } from 'cu-stores';
const TestControlGameScoreStore = React.createClass({
    mixins: [Reflux.connect(ControlGameScoreStore, 'score')],
    getInitialState: function() {
        return { score: ControlGameScoreStore.info };
    },
    componentDidMount() {
        ControlGameScoreStore.start(); 
        // FIXME! - actions don't fire to imported store
        events.handlesControlGameScore.start();
    },
    render: function() {
        return (
            <div>
                <h1>Control Game Score</h1>
                <p>{ JSON.stringify(this.state.score) }</p>
            </div>
        );
    }
});

////////////////////////////////////////////////////////////////////////////////////////
// Test: ControlGameStore
////////////////////////////////////////////////////////////////////////////////////////

import { ControlGameStore } from 'cu-stores';
const TestControlGameStore = React.createClass({
	mixins: [Reflux.connect(ControlGameStore, 'game')],
	getInitialState: function() {
		return { game: ControlGameStore.info };
	},
	componentDidMount() {
        ControlGameStore.start(); 
        // FIXME! - actions don't fire to imported store
        events.handlesControlGame.start();
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
const TestCharacterStore = React.createClass({
    mixins: [Reflux.connect(CharacterStore, 'game')],
    getInitialState: function() {
        return { game: CharacterStore.info };
    },
    componentDidMount() {
        // FIXME! - actions don't fire to imported store
        events.handlesCharacter.start();
    },
    render: function() {
        return (<div><h1>CharacterStore</h1><p>{ JSON.stringify(this.state.game) }</p></div>);
    }
});

////////////////////////////////////////////////////////////////////////////////////////
// Test: TestEnemyTargetStore
////////////////////////////////////////////////////////////////////////////////////////

import { EnemyTargetStore } from 'cu-stores';
const TestEnemyTargetStore = React.createClass({
    mixins: [Reflux.connect(EnemyTargetStore, 'enemyTarget')],
    getInitialState: function() {
        return { enemyTarget: EnemyTargetStore.info };
    },
    componentDidMount() {
        // FIXME! - actions don't fire to imported store
        events.handlesEnemyTarget.start();
    },
    render: function() {
        return (<div><h1>EnemyTargetStore</h1><p>{ JSON.stringify(this.state.enemyTarget) }</p></div>);
    }
});

////////////////////////////////////////////////////////////////////////////////////////
// Test: TestFriendlyTargetStore
////////////////////////////////////////////////////////////////////////////////////////

import { FriendlyTargetStore } from 'cu-stores';
const TestFriendlyTargetStore = React.createClass({
    mixins: [Reflux.connect(FriendlyTargetStore, 'friendlyTarget')],
    getInitialState: function() {
        return { friendlyTarget: FriendlyTargetStore.info };
    },
    componentDidMount() {
        // FIXME! - actions don't fire to imported store
        events.handlesFriendlyTarget.start();
    },
    render: function() {
        return (<div><h1>FriendlyTargetStore</h1><p>{ JSON.stringify(this.state.friendlyTarget) }</p></div>);
    }
});

////////////////////////////////////////////////////////////////////////////////////////
// Test: TestAnnouncementStore
////////////////////////////////////////////////////////////////////////////////////////

import { AnnouncementsStore } from 'cu-stores';
const TestAnnouncementsStore = React.createClass({
    mixins: [Reflux.connect(AnnouncementsStore, 'announcements')],
    getInitialState: function() {
        return { announcements: AnnouncementsStore.info };
    },
    componentDidMount() {
        AnnouncementsStore.start();     // HACK
        // FIXME! - actions don't fire to imported store
        events.handlesAnnouncements.start();
    },
    render: function() {
        return (<div><h1>Announcements Store</h1><p>{ JSON.stringify(this.state.announcements) }</p></div>);
    }
});
React.render(<TestAnnouncementsStore/>, document.getElementById("cse-ui-apitest"));

////////////////////////////////////////////////////////////////////////////////////////
// Test: Run all of the things
////////////////////////////////////////////////////////////////////////////////////////

const RunAllOfTheThings = React.createClass({
    render: function() {
        return (
            <div>
                <TestControlGameScoreStore/>
                <TestControlGameStore/>
                <TestCharacterStore/>
                <TestEnemyTargetStore/>
                <TestFriendlyTargetStore/>
                <TestAnnouncementsStore/>
            </div>
        );
    }
});

////////////////////////////////////////////////////////////////////////////////////////
// Wait for cuAPI to initialise
////////////////////////////////////////////////////////////////////////////////////////

events.on("init", function() {

    /* HACK: cuAPI has a bug in that if you don't listen to the events
     * associated with these, then you never get the initial values, so
     * we have to start the stores early.
     */
    CharacterStore.start(); 
    EnemyTargetStore.start(); 
    FriendlyTargetStore.start(); 

	// Render the UI
	React.render(<RunAllOfTheThings/>, document.getElementById("cse-ui-apitest"));
});
