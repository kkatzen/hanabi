<template>
  <div>
      <h1>Welcome, {{myName}}</h1>
      <h1 v-if="!this.myGame"> 
        No game found.
      </h1>
      <div v-else>
        <div class="right-sidebar">
          <action-log />
        </div>
        <div class="left-sidebar">
          <h2>{{misplayText}}</h2>
          <remaining-hints />
          <deck />
          <played-cards />
          <md-button @click="deleteGame">Delete Game</md-button>
        </div>
        <hand v-for="playerKey in playerKeys"
            :key=playerKey
            :playerKey=playerKey />
        <discards />
      </div>
  </div>
</template>

<script>
const fb = require('../firebaseConfig.js')
import Card from '@/components/Card'
import Hand from '@/components/Hand'
import RemainingHints from '@/components/RemainingHints'
import PlayedCards from '@/components/PlayedCards'
import Discards from '@/components/Discards'
import CardManager from '@/CardManager'
import ActionLog from '@/components/ActionLog'
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
    misplayText() {
      return this.myGame.misplays + " of 3 misplays";
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
    'discards': Discards,
    'remaining-hints': RemainingHints,
    'action-log': ActionLog,
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
