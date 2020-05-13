<template>
<!--v-for="(hand, playerIndex) in gameState.playerHands"
          :key=playerIndex
-->
  <div class="my-cards">
    <h1>
        {{handHeader}}
    </h1>
    <card v-for="(cardId, cardIndex) in cards"
            v-on:play-card="playCard"
            v-on:discard-card="discardCard"
            :key=cardId
            :uniqueId=cardId
            :playerKey=playerKey
            :cardIndex=cardIndex
            :activePlayer=activePlayer>
    </card>
    </div>
</template>

<script>
import Card from '@/components/Card'

export default {
  name: 'Hand',
    created: function () {
        console.log("Hand");
    },
	props: {
        cards: {},
        playerKey: {
            type: String,
            required: true,
        },
        activePlayer: {
            type: String,
            required: true,
        },
	},
	computed: { 
        myHand() {
            return  this.playerKey == this.$store.state.myName;
        },
        handHeader() {
            let handOwner = this.myHand ? "ME, " + this.playerKey + "!!!" : this.playerKey;
            let activeTag = this.playerKey == this.activePlayer ? "ACITVE PLAYER: " : "";
            return activeTag + handOwner;
        },
    },
    components: {
        'card': Card,
    },
    methods: {
        playCard(cardInfo) {
            this.$emit('play-card', cardInfo);
        },
        discardCard(cardInfo) {
            this.$emit('discard-card', cardInfo);
        }
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card {
  width: 170px;
  float: left;
  margin: 10px;
}
</style>
