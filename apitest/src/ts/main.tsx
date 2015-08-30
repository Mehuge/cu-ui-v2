/// <reference path="../tsd/tsd.d.ts" />
import * as React from 'react';
import * as Reflux from 'reflux';
import events from 'cu-events';

// Test: ControlGameScoreStore
import { ControlGameScoreStore } from 'cu-stores';
const controlGameScoreStore = ControlGameScoreStore.create();
const TestControlGameScoreStore = React.createClass({
    mixins: [Reflux.connect(controlGameScoreStore, 'score')],
    getInitialState: function() {
        return { score: controlGameScoreStore.info };
    },
    componentDidMount() {
        controlGameScoreStore.start(); // FIXME! events.handlesControlGameScore.start();
    },
    render: function() {
        return (<div><h1>ControlGameScoreStore</h1><p>{ JSON.stringify(this.state.score) }</p></div>);
    }
});

// Test: ControlGameStore
import { ControlGameStore } from 'cu-stores';
const controlGameStore = ControlGameStore.create();
const TestControlGameStore = React.createClass({
	mixins: [Reflux.connect(controlGameStore, 'game')],
	getInitialState: function() {
		return { game: controlGameStore.info };
	},
	componentDidMount() {
		controlGameStore.start(); // FIXME! events.handlesControlGame.start();
	},
	render: function() {
		return (<div><h1>ControlGameStore</h1><p>{ JSON.stringify(this.state.game) }</p></div>);
	}
});

// Test: TestCharacterStore
import { CharacterStore } from 'cu-stores';
const characterStore = CharacterStore.create();
const TestCharacterStore = React.createClass({
    mixins: [Reflux.connect(characterStore, 'game')],
    getInitialState: function() {
        return { game: characterStore.info };
    },
    componentDidMount() {
        characterStore.start(); // FIXME! events.handlesCharacter.start();
    },
    render: function() {
        return (<div><h1>CharacterStore</h1><p>{ JSON.stringify(this.state.game) }</p></div>);
    }
});

// Test: TestEnemyTargetStore
import { EnemyTargetStore } from 'cu-stores';
const enemyTargetStore = EnemyTargetStore.create();
const TestEnemyTargetStore = React.createClass({
    mixins: [Reflux.connect(enemyTargetStore, 'enemyTarget')],
    getInitialState: function() {
        return { enemyTarget: enemyTargetStore.info };
    },
    componentDidMount() {
        enemyTargetStore.start(); // FIXME! events.handlesEnemyTarget.start();
    },
    render: function() {
        return (<div><h1>EnemyTargetStore</h1><p>{ JSON.stringify(this.state.enemyTarget) }</p></div>);
    }
});

// Test: TestFriendlyTargetStore
import { FriendlyTargetStore } from 'cu-stores';
const friendlyTargetStore = FriendlyTargetStore.create();
const TestFriendlyTargetStore = React.createClass({
    mixins: [Reflux.connect(friendlyTargetStore, 'friendlyTarget')],
    getInitialState: function() {
        return { friendlyTarget: friendlyTargetStore.info };
    },
    componentDidMount() {
        friendlyTargetStore.start(); // FIXME! events.handlesFriendlyTarget.start();
    },
    render: function() {
        return (<div><h1>FriendlyTargetStore</h1><p>{ JSON.stringify(this.state.friendlyTarget) }</p></div>);
    }
});

// Test: TestAnnouncementStore
import { AnnouncementsStore } from 'cu-stores';
const announcementsStore = AnnouncementsStore.create();
const TestAnnouncementsStore = React.createClass({
    mixins: [Reflux.connect(announcementsStore, 'announcements')],
    getInitialState: function() {
        return { announcements: announcementsStore.info };
    },
    componentDidMount() {
        announcementsStore.start(); // FIXME! events.handlesAnnouncements.start();
    },
    render: function() {
        return (<div><h1>AnnouncementsStore</h1><p>{ JSON.stringify(this.state.announcements) }</p></div>);
    }
});

const Tests = React.createClass({
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

events.on("init", function() {

	// Render the UI
	React.render(<Tests/>, document.getElementById("cse-ui-apitest"));

	// Basic Reflux Action test (this is working)
	const action : any = Reflux.createActions(["test"]);
	console.dir(action);
	console.dir(action.test);
	console.dir(action.test.shouldEmit());
	const store : any = Reflux.createStore({
		listenables: action,
		test() {
			console.log('test action fired');
		}
	});
	console.dir(store);
	action.test();

	console.log('handlesControlGameScore action:-');
	console.dir(events.handlesControlGameScore.action);
	console.dir(events.handlesControlGameScore.action.start);
	console.dir(events.handlesControlGameScore.action.start.shouldEmit());
	events.handlesControlGameScore.action.start();
});
