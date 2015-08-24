/// <reference path="definitions/tsd.d.ts" />
var React = require('react');
var Reflux = require('reflux');
var cu_events_1 = require('cu-events');
var cu_stores_1 = require('cu-stores');
var cu_components_1 = require('cu-components');
var characterStore = cu_stores_1.CharacterStore.create();
var Character = React.createClass({
    // Hook store up to component.  Each time character data is changed,
    // our state is updated, triggering a render
    mixins: [
        Reflux.connect(characterStore, 'character')
    ],
    // Provide an initial state (TODO: is there a better way to do this?)
    getInitialState: function () {
        return { character: characterStore.info };
    },
    componentDidMount: function () {
        // Start listening for character events
        cu_events_1["default"].handlesCharacter.start();
    },
    // Render the unit frame using character data
    render: function () {
        var state = this.state, character = state.character;
        return (React.createElement(cu_components_1.UnitFrame, {"className": "character", "name": character.name, "race": character.race, "health": character.health, "maxHealth": character.maxHealth, "stamina": character.stamina, "maxStamina": character.maxStamina}));
    }
});
cu_events_1["default"].on("init", function () {
    React.render(React.createElement(Character, null), document.getElementById("main"));
});
