<template>
  <div class="hello">
     <md-button @click="deleteGame">Delete this game from firestore!!!</md-button>
      <played-cards :cards=gameState.progress />

      <div class="my-cards"
          v-for="(hand, playerIndex) in gameState.playerHands"
          :key=playerIndex>
        <h1>Player {{playerIndex}}</h1>
        <card v-for="(cardId, cardIndex) in hand"
              v-on:play-card="playCard"
              v-on:discard-card="discardCard"
              :key=cardId
              :uniqueId=cardId
              :playerIndex=playerIndex
              :cardIndex=cardIndex
              isPlayable=true>
        </card>
      </div>

      <div class="discard">
        <h1>Discard</h1>
        <card v-for="cardId in gameState.discards"
              :key=cardId
              :uniqueId=cardId>
        </card>
      </div>

      <div class="deck">
        <h1>Deck</h1>
        <card v-for="cardId in gameState.deck"
              :key=cardId
              :uniqueId=cardId>
        </card>
      </div>

    </div>
</template>

<script>
const fb = require('../firebaseConfig.js')
import Card from '@/components/Card'
import PlayedCards from '@/components/PlayedCards'
import CardManager from '@/CardManager'
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
		playCard(cardInfo) {
      console.log("playCard");
      let cardManager = new CardManager(Object.assign({}, this.gameState));
      console.log("cardManager", cardManager);
      if(!cardManager.playCard(cardInfo.playerIndex, cardInfo.cardIndex)) {
        alert("invalid!");
      }
      this.updateGameState(cardManager.gameState);
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
    'played-cards': PlayedCards
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
  width: 884px; /* 220 * 4 for cards + 2*2 for border */
}
.deck {
  width: 50%;
}

.discard {
  width: 50%;
  float: right;
}
</style>
