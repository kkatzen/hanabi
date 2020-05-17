<template>
  <div>
      <h1>Welcome, {{myName}}</h1>
      <h1 v-if="!this.myGame"> 
        No game found.
      </h1>
      <div v-else>
        <div class="right-sidebar">
          <div class="discard" v-if="myGame.discards.length > 0">
            <h2>Discarded Cards:</h2>
            <card v-for="cardId in myGame.discards"
                  :key=cardId
                  :cardId=cardId>
            </card>
          </div>
        </div>
        <div class="left-sidebar">
          <h2>{{hintText}}</h2>
          <deck />
          <played-cards />
          <md-button @click="deleteGame">Delete Game</md-button>
        </div>

        <hand v-for="playerKey in playerKeys"
            :key=playerKey
            :playerKey=playerKey />
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
import {GameState, createRandomGame} from '@/GameState'
import firebase from 'firebase'
import { db } from '../main'
import { mapState } from "vuex";

export default {
  name: 'GamePlay',
  computed: { 
    ...mapState(["myName", "myGameId"]),
    myGame() {
      return this.$store.state.myGame;
    },
    hintText() {
      return this.myGame.remainingHints + " hints remain";
    },
    playerKeys() {
      return Object.keys(this.myGame.playerHands).sort();
    }
  },
  methods: {
    deleteGame() {
      fb.gameCollection.doc(this.myGameId).delete().then(function() {
          console.log("Document successfully deleted!");
      }).catch(function(error) {
          console.error("Error removing document: ", error);
      });
      this.$router.push("/");
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
.right-sidebar {
  float: right;
  background-color: #D8E8F0;
  padding: 10px;
  margin: 20px;
}
</style>
