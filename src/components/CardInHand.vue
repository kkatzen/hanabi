<template>
  <div class="card">
    <div class="background-color" :style="backgroundColorStyles" />
    <div class="background-image" :style="backgroundImageStyles" />
    <md-card class="card-card">
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
    <div v-if="!myHand" :style="hintedTextStyle">
      {{hintedText}}
    </div>
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
  name: 'CardInHand',
	props: {
		uniqueId: {
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
    backgroundColorStyles() {
      let color = this.cardInfo.colorHinted || !this.myHand ? this.color : "#ffffff";
      const styles = {
        width: "130px",
        height: "72px",
        position: "absolute",
        backgroundColor: color
      };
      return styles;
    },
    backgroundImageStyles() {
      const styles = {
        width: "130px",
        height: "72px",
        position: "absolute"
      };
      styles["backgroundColor"] = "#ffffff";
      styles["backgroundImage"] = "url('static/pattern" + this.cardInfo.backgroundId + ".png";
      styles["opacity"] = ".1";
      return styles;
    },
    hintedTextStyle() {
      const styles = {
        border: "1px solid grey",
        backgroundColor: "#eeeeee",
        fontSize: "23px",
        lineHeight: "30px",
        height: "30px",
      };
      if (this.cardInfo.colorHinted) { 
        styles["backgroundColor"] = this.color
      }
      return styles;
    },
    hintedText() {
      if (!this.cardInfo.numberHinted) return "";
      if (this.number == 5) return "5!!!";
      return this.number;
    },
    color() {
        return colorMap[this.cardId.substring(0,1)]
    },
    number() {
        return this.cardId.substring(1,2)
    },
    myHand() {
      return this.playerKey == this.$store.state.myName;
    },
    isPlayableNow() {
      return this.playerKey == this.activePlayer && this.playerKey == this.$store.state.myName;
    },
    displayNumber () {
      if (this.myHand && this.cardInfo.numberHinted) return "???";
      if (this.number == "5") return "5!!!"
      return this.number;
    },
    cardId () {
      return this.uniqueId != undefined ? this.uniqueId : this.cardInfo.id;
    },
    cardInfo() {
      console.log(this.$store.state.myGame.playerHands[this.playerKey][this.cardIndex]);
      return this.$store.state.myGame.playerHands[this.playerKey][this.cardIndex];
    }
	},
  methods: {
    playCard() {
      let cardManager = new CardManager(this.$store.state.myGame);
      if(!cardManager.playCard(this.playerKey, this.cardIndex)) {
        alert("invalid! card discarded. misplay!");
      }
      let gameUpdate = {
          gameId: this.$store.state.myGameId,
          gameState: cardManager.gameState
      };
      this.$store.dispatch("updateGame", gameUpdate);
    },
    discardCard() {
      let cardManager = new CardManager(this.$store.state.myGame);
      cardManager.discardAndDraw(this.playerKey, this.cardIndex);
        let gameUpdate = {
            gameId: this.$store.state.myGameId,
            gameState: cardManager.gameState
        };
        this.$store.dispatch("updateGame", gameUpdate);
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card {
  width: 130px;
  margin: 10px;
}
.card-card {
  background-color: transparent !important;
}
</style>
