/// <reference path="../tsd/tsd.d.ts" />
import * as React from 'react';
import * as Reflux from 'reflux';
import events from 'cu-events';

////////////////////////////////////////////////////////////////////////////////////////

import { ControlGameScoreStore } from 'cu-stores';
import { ControlGameStore } from 'cu-stores';
import { CharacterStore } from 'cu-stores';
import { EnemyTargetStore } from 'cu-stores';
import { FriendlyTargetStore } from 'cu-stores';
import { AnnouncementsStore } from 'cu-stores';

////////////////////////////////////////////////////////////////////////////////////////

const Matrix = React.createClass<any,any>({
    render: function() {
        const element = (
            <div id="matrix" style={{ "top": this.props.y + "em", "left": this.props.x + "em" }}>
                {this.props.text}
            </div>
        );
        return element;
    }
});

const ShowAllOfTheThings = React.createClass<any,any>({
    mixins: [
        Reflux.connect(ControlGameScoreStore, 'score'),
        Reflux.connect(ControlGameStore, 'game'),
        Reflux.connect(CharacterStore, 'character'),
        Reflux.connect(EnemyTargetStore, 'enemy'),
        Reflux.connect(FriendlyTargetStore, 'friendly'),
        Reflux.connect(AnnouncementsStore, 'announcements')
    ],
    getInitialState: function() {
        return { 
            score: ControlGameScoreStore.info,
            game: ControlGameStore.info,
            character: CharacterStore.info,
            enemy: EnemyTargetStore.info,
            friendly: FriendlyTargetStore.info,
            announcements: AnnouncementsStore.info,
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
                <Matrix x="21" y="7" text={this.state.score.players.viking}/>,
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
            </div>
        );
    }
});

////////////////////////////////////////////////////////////////////////////////////////
// Wait for cuAPI to initialise
////////////////////////////////////////////////////////////////////////////////////////

events.on("init", function() {

    // Start all of the things
    ControlGameScoreStore.start();
    ControlGameStore.start();
    CharacterStore.start(); 
    EnemyTargetStore.start(); 
    FriendlyTargetStore.start(); 
    AnnouncementsStore.start();

	// Render all of the things
	React.render(<ShowAllOfTheThings/>, document.getElementById("cse-ui-matrix"));
});
