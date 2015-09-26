/// <reference path="../tsd/tsd.d.ts" />
import * as React from 'react';
import * as Reflux from 'reflux';
import events from 'cu-events';

declare const cuAPI : any;

////////////////////////////////////////////////////////////////////////////////////////

import { CharacterStore } from 'cu-stores';
import { EnemyTargetStore } from 'cu-stores';
import { FriendlyTargetStore } from 'cu-stores';

const character : any = CharacterStore.create();
const enemyTarget : any = EnemyTargetStore.create();
const friendlyTarget : any = FriendlyTargetStore.create();

class Sprite {
  now: number = Date.now();
  type: string;
  text: string;
  bottom: number = 0;
  align: string = 'center';
  dead: boolean = false;
  isDead() : boolean {
    const now = Date.now();
    if (this.bottom > 100 || (now - this.now) > 10000) {
      return true;
    }
    return false;
  }
}

////////////////////////////////////////////////////////////////////////////////////////

class Animator {
  static animate(sprites : Sprite[]) : Sprite[] {
    const sprites2 : Sprite[] = [];
    let i : number;
    for (i = 0; i < sprites.length; i++) {
      sprites[i].bottom += 1;
      if (!sprites[i].isDead()) {
        sprites2.push(sprites[i]);
      }
    }
    return sprites2;
  }
  static stagger(sprites : Sprite[]) {
    if (sprites && sprites.length > 1) {
      const now = sprites[sprites.length-1];
      const last = sprites[sprites.length-2];
      if (now.now - last.now < 2000) {
        switch(last.align) {
          case "center":
            now.align = Math.random() < 0.5 ? "right" : "left";
            break;
          case "left":
            now.align = "center";
            break;
        }
      }
    }
  }
}

////////////////////////////////////////////////////////////////////////////////////////

const Entity = React.createClass<any,any>({
  render() {
    const sprite = this.props.sprite;
    const style = { bottom: sprite.bottom + 'px', opacity: (1.0 - ((10.0+sprite.bottom)/100.0)) };
    return (
      <div className={"sprite " + sprite.type + " " + sprite.align} style={style}>
      {sprite.text}
      </div>
    );
  }
}) ;

// So, BCT uses a 320x100 px display area, split into the following 5 sections each
// 64 pixels wide by 100 pixels tall
//   Friendly Target Damage / Heals
//   Self Stamina
//   Self Damage
//   Self Heal
//   Enemy Target Damage / Heals

const Slot = React.createClass<any,any>({
  render() {
    const sprites = this.props.sprites;
    const draw : JSX.Element[] = [];
    for (let i = 0; i < sprites.length; i++) {
      draw.push(<Entity sprite={sprites[i]}/>);
    }
    return (
      <div className="slot">
      {draw}
      </div>
    );
  }
});

////////////////////////////////////////////////////////////////////////////////

const SelfDamage = React.createClass<any,any>({
  getInitialState() {
    return { sprites: [] };
  },
  componentDidMount() {
    const self = this;
    this._timer = setInterval(() => {
      self.setState({ sprites: Animator.animate(self.state.sprites) });
    }, 100);
  },
  render() {
    function checkHealth(health : number, state : any) {
      // If health has reduced, then add a new sprite to show the damage
      if (health < state.health) {
        // we have taken damage
        const sprite = new Sprite();
        sprite.type = "self damage";
        sprite.text = (state.health - health).toString();
        state.sprites.push(sprite);
        Animator.stagger(state.sprites);
      }
    }
    checkHealth(this.props.health, this.state);
    this.state.health = this.props.health;
    return (
      <Slot sprites={this.state.sprites}/>
    );
  }
});

////////////////////////////////////////////////////////////////////////////////

const SelfHeals = React.createClass<any,any>({
  getInitialState() {
    return { sprites: [] };
  },
  componentDidMount() {
    const self = this;
    this._timer = setInterval(() => {
      self.setState({ sprites: Animator.animate(self.state.sprites) });
    }, 100);
  },
  render() {
    function checkHealth(health : number, state : any) {
      // If health has reduced, then add a new sprite to show the damage
      if (health > state.health) {
        // we have taken damage
        const sprite = new Sprite();
        sprite.type = "self heal";
        sprite.text = "+" + (health - state.health).toString();
        state.sprites.push(sprite);
        Animator.stagger(state.sprites);
      }
    }
    checkHealth(this.props.health, this.state);
    this.state.health = this.props.health;
    return (
      <Slot sprites={this.state.sprites}/>
    );
  }
});

////////////////////////////////////////////////////////////////////////////////

const SelfStamina = React.createClass<any,any>({
  getInitialState() {
    return { sprites: [] };
  },
  componentDidMount() {
    const self = this;
    this._timer = setInterval(() => {
      self.setState({ sprites: Animator.animate(self.state.sprites) });
    }, 100);
  },
  render() {
    function checkHealth(stamina : number, state : any) {
      // If health has reduced, then add a new sprite to show the damage
      if (stamina != state.stamina) {
        // we have taken damage
        const sprite = new Sprite();
        sprite.type = "self stamina" + (stamina > state.stamina ? " recover" : ""); 
        sprite.text = Math.abs(state.stamina - stamina).toString();
        state.sprites.push(sprite);
        Animator.stagger(state.sprites);
      }
    }
    checkHealth(this.props.stamina, this.state);
    this.state.stamina = this.props.stamina;
    return (
      <Slot sprites={this.state.sprites}/>
    );
  }
});

////////////////////////////////////////////////////////////////////////////////

const Enemy = React.createClass<any,any>({
  getInitialState() {
    return { sprites: [] };
  },
  componentDidMount() {
    const self = this;
    this._timer = setInterval(() => {
      self.setState({ sprites: Animator.animate(self.state.sprites) });
    }, 100);
  },
  render() {
    function checkHealth(health : number, state : any) {
      // If health has reduced, then add a new sprite to show the damage
      if (health != state.health) {
        // we have taken damage
        const sprite = new Sprite();
        sprite.type = "enemy " + (health > state.health ? "heal" : "damage");
        sprite.text = Math.abs(state.health - health).toString();
        state.sprites.push(sprite);
        Animator.stagger(state.sprites);
      }
    }
    checkHealth(this.props.enemy.health, this.state);
    this.state.health = this.props.enemy.health;
    return (
      <Slot sprites={this.state.sprites}/>
    );
  }
});

////////////////////////////////////////////////////////////////////////////////

const Friendly = React.createClass<any,any>({
  getInitialState() {
    return { sprites: [] };
  },
  componentDidMount() {
    const self = this;
    this._timer = setInterval(() => {
      self.setState({ sprites: Animator.animate(self.state.sprites) });
    }, 100);
  },
  render() {
    function checkHealth(health : number, state : any) {
      // If health has reduced, then add a new sprite to show the damage
      if (health != state.health) {
        // we have taken damage
        const sprite = new Sprite();
        sprite.type = "friendly " + (health > state.health ? "heal" : "damage");
        sprite.text = Math.abs(state.health - health).toString();
        state.sprites.push(sprite);
        Animator.stagger(state.sprites);
      }
    }
    checkHealth(this.props.friendly.health, this.state);
    this.state.health = this.props.friendly.health;
    return (
      <Slot sprites={this.state.sprites}/>
    );
  }
});


////////////////////////////////////////////////////////////////////////////////

const BasicCombatText = React.createClass<any,any>({
  mixins: [
    Reflux.connect(character.store, 'character'),
    Reflux.connect(enemyTarget.store, 'enemy'),
    Reflux.connect(friendlyTarget.store, 'friendly'),
  ],
  getInitialState() {
    return {
      character: character.store.info,
      enemy: enemyTarget.store.info,
      friendly: friendlyTarget.store.info,
    };
  },
  componentDidMount() {
    character.actions.start();
    enemyTarget.actions.start();
    friendlyTarget.actions.start();
  },
  render() {
    return (
      <div className="slots">
        <Friendly name="friendly" friendly={this.state.friendly}/>
        <SelfStamina name="self-stamina" stamina={this.state.character.stamina}/>
        <SelfHeals name="self-heals" health={this.state.character.health}/>
        <SelfDamage name="self-damage" health={this.state.character.health}/>
        <Enemy name="enemy" enemy={this.state.enemy}/>
      </div>
    );
  }
});

////////////////////////////////////////////////////////////////////////////////
// Wait for cuAPI to initialise
////////////////////////////////////////////////////////////////////////////////

events.on("init", function() {

  // TEMP: Start all of the things
  character.actions.start();
  enemyTarget.actions.start();
  friendlyTarget.actions.start();

	// Render all of the things
	React.render(<BasicCombatText/>, document.getElementById("mehuge-bct"));
});
