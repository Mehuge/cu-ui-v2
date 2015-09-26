/// <reference path="../tsd/tsd.d.ts" />
import * as React from 'react';
import * as Reflux from 'reflux';
import events from 'cu-events';

declare const cuAPI : any;

////////////////////////////////////////////////////////////////////////////////////////

import { ControlGameScoreStore } from 'cu-stores';
import { ControlGameStore } from 'cu-stores';
import { CharacterStore } from 'cu-stores';
import { EnemyTargetStore } from 'cu-stores';
import { FriendlyTargetStore } from 'cu-stores';
import { AnnouncementsStore } from 'cu-stores';

const controlGameScore : any = ControlGameScoreStore.create();
const controlGame : any = ControlGameStore.create();
const character : any = CharacterStore.create();
const enemyTarget : any = EnemyTargetStore.create();
const friendlyTarget : any = FriendlyTargetStore.create();
const announcements : any = AnnouncementsStore.create();

////////////////////////////////////////////////////////////////////////////////////////

const Matrix = React.createClass<any,any>({
    render: function() {
		const style = { "top": this.props.y + "em", "left": this.props.x + "em" };
        const element = (
            <div id="matrix" style={style}>
                {this.props.text}
            </div>
        );
        return element;
    }
});

const ShowAllOfTheThings = React.createClass<any,any>({
    mixins: [
        Reflux.connect(controlGameScore.store, 'score'),
        Reflux.connect(controlGame.store, 'game'),
        Reflux.connect(character.store, 'character'),
        Reflux.connect(enemyTarget.store, 'enemy'),
        Reflux.connect(friendlyTarget.store, 'friendly'),
        Reflux.connect(announcements.store, 'announcements')
    ],
    getInitialState: function() {
        return {
            score: controlGameScore.store.info,
            game: controlGame.store.info,
            character: character.store.info,
            enemy: enemyTarget.store.info,
            friendly: friendlyTarget.store.info,
            announcements: announcements.store.info,
            matrix: []
        };
    },
    componentDidMount() {
        // build the matrix!
        // matrix bg will be N x N grid of text, made up from
        // data in store, rendered line by line.
        // Matrix data (the actual stats) will be overlayed
        // on top as vertical text in a gradient colour
        const self = this;
        function createMatrix() {
            let theMatrix : string [] = [];
            let s: string = JSON.stringify(self.state).replace(/[{}:",\[\]]/g, "");
            let o: number;
            for (var i = 0; i < 25; i++) {
                theMatrix.push(s.substr((Math.random()*(s.length-50))|0,50));
            }
            self.setState({
                matrix: theMatrix
            });
            setTimeout(createMatrix, 1000);
        }
        createMatrix();
    },
    render: function() {
        let players : any;
        if (this.state.score.players) {
            players = [
                <Matrix x="19" y="3" text={this.state.score.players.arthurians}/>,
                <Matrix x="20" y="5" text={this.state.score.players.tuathaDeDanann}/>,
                <Matrix x="21" y="7" text={this.state.score.players.vikings}/>,
                <Matrix x="20" y="10" text={this.state.score.players.max}/>,
            ];
        }
        return (
            <div id="content">
                <div id="bg">
                {
                    this.state.matrix.map(function(item:string) {
                        return <div>{item}</div>
                    })
                }
                </div>
                <Matrix x="3" y="3" text={this.state.character.name}/>
                <Matrix x="5" y="12" text={this.state.character.stamina}/>
                <Matrix x="7" y="5" text={this.state.character.health}/>
                <Matrix x="7" y="10" text={this.state.character.maxHealth}/>
                <Matrix x="13" y="3" text={this.state.enemy.name}/>
                <Matrix x="15" y="12" text={this.state.enemy.stamina}/>
                <Matrix x="17" y="5" text={this.state.enemy.health}/>
                <Matrix x="17" y="10" text={this.state.enemy.maxHealth}/>
                <Matrix x="23" y="3" text={this.state.friendly.name}/>
                <Matrix x="25" y="12" text={this.state.friendly.stamina}/>
                <Matrix x="27" y="3" text={this.state.friendly.health}/>
                <Matrix x="27" y="10" text={this.state.friendly.maxHealth}/>
                <Matrix x="9" y="3" text={this.state.game.arthurianScore}/>
                <Matrix x="10" y="5" text={this.state.game.tuathaDeDanannScore}/>
                <Matrix x="11" y="7" text={this.state.game.vikingScore}/>
                {players}
                <Matrix x="16" y="19" text={cuAPI.locationX.toFixed(2)}/>
                <Matrix x="17" y="18" text={cuAPI.locationY.toFixed(2)}/>
                <Matrix x="18" y="20" text={cuAPI.locationZ.toFixed(2)}/>
                <Matrix x="9" y="15" text={cuAPI.fps.toFixed(2)}/>

            </div>
        );
    }
});

////////////////////////////////////////////////////////////////////////////////////////
// Wait for cuAPI to initialise
////////////////////////////////////////////////////////////////////////////////////////

events.on("init", function() {

    // Start all of the things
    controlGameScore.actions.start();
    controlGame.actions.start();
    character.actions.start();
    enemyTarget.actions.start();
    friendlyTarget.actions.start();
    announcements.actions.start();

	// Render all of the things
	React.render(<ShowAllOfTheThings/>, document.getElementById("mehuge-matrix"));
});
