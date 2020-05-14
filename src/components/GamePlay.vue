<template>
  <div>
      <div class="left-sidebar">
        <h2>{{hintText}}</h2>
        <deck :remainingCards=gameState.deck.length />
        <played-cards :cards=gameState.progress />
        <md-button @click="deleteGame">Delete Game</md-button>
      </div>

      <hand v-for="(hand, playerKey) in gameState.playerHands"
          v-on:play-card="playCard"
          v-on:discard-card="discardCard"
          v-on:give-hint="giveHint"
          :key=playerKey :activePlayer="gameState.activePlayer"
          :playerKey=playerKey
          :cards=hand />

      <div class="discard" v-if="gameState.discards > 0">
        <h2>Discarded Cards:</h2>
        <card v-for="cardId in gameState.discards"
              :key=cardId
              :uniqueId=cardId>
        </card>
      </div>
    </div>
</template>

<script>
const fb = require('../firebaseConfig.js')
import Card from '@/components/Card'
import Hand from '@/components/Hand'
import PlayedCards from '@/components/PlayedCards'
import CardManager from '@/CardManager'
import Deck from '@/components/Deck'
import {GameState, GameStateConverter, createRandomGame} from '@/GameState'
import firebase from 'firebase'
import { db } from '../main'

export default {
  name: 'GamePlay',
  created: function () {
    console.log('GamePlay')
  },
  props: ['gameId'],
  data () {
    return {
      gameState: {},
    }
  },
  firestore () {
    console.log("this.gameId", this.gameId);
    return {
      gameState: fb.gameCollection.doc(this.gameId)
    }
  },
  computed: { 
    hintText() {
      return this.gameState.remainingHints + " hints remain";
    },
  },
  watch: {
    gameId(gameId) {
      // $bind automatically unbinds the previously bound property
      this.$bind('gameState', fb.gameCollection.doc(gameId))
    },
  },
  methods: {
    deleteGame() {
      console.log("deleteGame");
      fb.gameCollection.doc(this.gameId).delete().then(function() {
          console.log("Document successfully deleted!");
      }).catch(function(error) {
          console.error("Error removing document: ", error);
      });
      this.$router.push("/");
      // why do i have to do this manually?
      this.gameState = {};
      this.gameId = "";
    },
    giveHint() {
      console.log("playCard");
      let cardManager = new CardManager(Object.assign({}, this.gameState));
      console.log("cardManager", cardManager);
      if(!cardManager.giveHint()) {
        alert("invalid!");
      } else {
        this.updateGameState(cardManager.gameState);
      }
    },
		playCard(cardInfo) {
      console.log("playCard");
      let cardManager = new CardManager(Object.assign({}, this.gameState));
      console.log("cardManager", cardManager);
      if(!cardManager.playCard(cardInfo.playerIndex, cardInfo.cardIndex)) {
        alert("invalid!");
      } else {
        this.updateGameState(cardManager.gameState);
      }
    },
		discardCard(cardInfo) {
      let cardManager = new CardManager(Object.assign({}, this.gameState));
      cardManager.discardAndDraw(cardInfo.playerIndex, cardInfo.cardIndex);
      this.updateGameState(cardManager.gameState);
    },
		updateGameState(gameState) {
      console.log("updateGameState");
        fb.gameCollection.withConverter(GameStateConverter).doc(this.gameId)
        .set(gameState)
        .then((docRef) => {
            console.log("Success!");
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
    },
  },
  components: {
    'card': Card,
    'played-cards': PlayedCards,
    'hand': Hand,
    'deck': Deck,
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.my-cards {
  border: 2px solid grey;
  height: 200px;
  margin: auto;
}
.left-sidebar {
  float: left;
  background-color: #D8E8F0;
  padding: 10px;
  margin: 20px;
}
</style>
