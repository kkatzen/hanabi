<template>
  <div class="hello">
    <md-button @click="readFirestore">click me</md-button>
    {{ firebaseRead }}

    <md-button @click="playCardPrompt">Play Card</md-button>

    <div class="my-cards">
      <card :uniqueId="redPlayed">
      </card>
      <card :uniqueId="bluePlayed">
      </card>
      <card :uniqueId="greenPlayed">
      </card>
      <card :uniqueId="yellowPlayed">
      </card>
    </div>

    <div class="my-cards"
         v-for="(hand, index) in gamePlay.cardMap.players"
         :key=index>
      <h1>Player {{index}}</h1>
      <card v-for="cardId in hand" 
            :key=cardId
            :uniqueId=cardId>
      </card>
    </div>

    <h1>Deck</h1>
    <card v-for="cardId in gamePlay.cardMap.deck"
          :key=cardId
          :uniqueId=cardId>
    </card>

  </div>
</template>

<script>
const fb = require('../firebaseConfig.js')
import Card from '@/components/Card'
import GamePlay from '@/GamePlay'

export default {
  name: 'HelloWorld',
  data () {
    return {
      firebaseRead: 'firebase read...',
      gamePlay: new GamePlay(3,2)
    }
  },
  methods: {
    readFirestore() {
        fb.testCollection.doc("M13aPHDYrvXxQQSFXQZl").get().then(res => {
            console.log(res.data());
             this.firebaseRead = res.data().test;
        }).catch(err => {
            console.log(err)
        })
    },
    playCardPrompt() {
      console.log("playCardPrompt");
      let playerIndex = prompt("which player?");
      let cardIndex = prompt("which card?");
      this.gamePlay.playCard(playerIndex, cardIndex)
      console.log(this.gamePlay.cardMap);
    }
  },
  components: {
    'card': Card
  },
  computed: { 
      yellowPlayed() {
        console.log("yellowPlayed", this.gamePlay.cardMap);
          return 'y' + this.gamePlay.cardMap.played['y']
      },
      redPlayed() {
          return 'r' + this.gamePlay.cardMap.played['r']
      },
      bluePlayed() {
          return 'b' + this.gamePlay.cardMap.played['b']
      },
      greenPlayed() {
          return 'g' + this.gamePlay.cardMap.played['g']
      },
  }
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
</style>
