<template>
  <div class="hello">
    <md-button @click="readFirestore">click me</md-button>
    {{ firebaseRead }}

    <played-cards :cards=cardManager.progress />
    <md-button @click="playCardPrompt">Play Card</md-button>

    <div class="my-cards"
         v-for="(hand, index) in cardManager.playerHands"
         :key=index>
      <h1>Player {{index}}</h1>
      <card v-for="cardId in hand" 
            :key=cardId
            :uniqueId=cardId>
      </card>
    </div>

    <h1>Deck</h1>
    <card v-for="cardId in cardManager.deck"
          :key=cardId
          :uniqueId=cardId>
    </card>

  </div>
</template>

<script>
const fb = require('../firebaseConfig.js')
import Card from '@/components/Card'
import PlayedCards from '@/components/PlayedCards'
import CardManager from '@/CardManager'

export default {
  name: 'HelloWorld',
  data () {
    return {
      firebaseRead: 'firebase read...',
      cardManager: new CardManager(3,2)
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
      this.cardManager.playCard(playerIndex, cardIndex)
      console.log(this.cardManager.cardMap);
    }
  },
  components: {
    'card': Card,
    'played-cards': PlayedCards
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
