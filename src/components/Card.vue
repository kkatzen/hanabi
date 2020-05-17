<template>
  <div class="card">
    <md-card :style="{backgroundColor: displayColor}">
        <md-card-area>
          <md-card-header>
              <div class="md-title">{{displayNumber}}</div>
          </md-card-header>
        </md-card-area>
        <div v-if="isPlayableNow">
          <md-card-actions>
            <md-button @click=playCard>Play</md-button>
         </md-card-actions>
          <md-card-actions >
            <md-button @click=discardCard>Discard</md-button>
         </md-card-actions>
        </div>
    </md-card>
  </div>
</template>

<script>
import { mapState } from "vuex";
import CardManager from '@/CardManager'

const colorMap = {
  'r':'#ebabab',
  'b':'#bdddfc',
  'g':'#abebb6',
  'y':'#f5f38c',
  'p': '#d4bdf0'
};
export default {
  name: 'Card',
	props: {
		uniqueId: {
			type: String,
			required: true,
			default: "r1a"
    },
    playerKey: {
    },
    cardIndex: {
    },
    activePlayer: {
			type: String,
    },
	},
	computed: { 
    color() {
        return colorMap[this.uniqueId.substring(0,1)]
    },
    number() {
        return this.uniqueId.substring(1,2)
    },
    myHand() {
      return this.playerKey == this.$store.state.myName;
    },
    isPlayableNow() {
      return this.playerKey == this.activePlayer && this.playerKey == this.$store.state.myName;
    },
    displayColor() {
      return this.myHand ? "grey" : this.color;
    },
    displayNumber () {
      return this.myHand ? "???" : this.number;
    }
	},
  methods: {
    playCard() {
      let cardManager = new CardManager(this.$store.state.myGame);
      if(!cardManager.playCard(this.playerKey, this.cardIndex)) {
        alert("invalid!");
      } else {
        let gameUpdate = {
            gameId: this.$store.state.myGameId,
            gameState: cardManager.gameState
        };
        this.$store.dispatch("updateGame", gameUpdate);
      }
    },
    discardCard() {
      let cardManager = new CardManager(this.$store.state.myGame);
      cardManager.discardAndDraw(this.playerKey, this.cardIndex);
        let gameUpdate = {
            gameId: this.$store.state.myGameId,
            gameState: cardManager.gameState
        };
        this.$store.dispatch("updateGame", gameUpdate);
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card {
  width: 130px;
  margin: 10px;
}
</style>
