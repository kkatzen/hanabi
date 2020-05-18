<template>
    <div class="hint-button-div">
        <md-button @click=giveHint>{{hintText}}</md-button>
   </div>
</template>

<script>
import CardManager from '@/CardManager'

const colorMap = {
  'r':'red',
  'b':'blue',
  'g':'green',
  'y':'yellow',
  'p': 'purple'
};
export default {
  name: 'HintButton',
	props: {
		playerKey: {
            required: true
        },
		hint: {
            required: true
        },
	},
	computed: { 
        hintText() {
            let cardCount = 0;
            const substrIndex = isNaN(parseInt(this.hint)) ? 0 : 1;
            for(let cardInfo of this.$store.state.myGame.playerHands[this.playerKey]) {
                if (cardInfo.id.substr(substrIndex,1) == this.hint) {
                    cardCount++;
                }
            }
            let cardWord = cardCount > 1 ? "cards" : "card";
            if (isNaN(parseInt(this.hint))) {
                return "Reveal " + cardCount + " " + colorMap[this.hint] + " "+ cardWord;
            }
            console.log("this.hint",this.hint);
            return "Reveal " + cardCount+ " " + cardWord + " with the number " + this.hint;
        },
    },
    methods: {
        giveHint() {
            let cardManager = new CardManager(this.$store.state.myGame);
            if(!cardManager.giveHint(this.playerKey, this.hint)) {
                alert("invalid!");
            } else {
                let gameUpdate = {
                    gameId: this.$store.state.myGameId,
                    gameState: cardManager.gameState
                };
                this.$store.dispatch("updateGame", gameUpdate);
            }
        }
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hint-button-div {
  clear:both;
}
</style>
