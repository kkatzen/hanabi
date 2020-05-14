<template>
<!--v-for="(hand, playerIndex) in gameState.playerHands"
          :key=playerIndex
-->
    <div class="hand">
        <h1>
            {{handHeader}}
        </h1>
        <div v-if="myHand && myTurn">
            <md-button @click=giveHint>Give Hint</md-button>
        </div>
        <ol class="card-list">
            <li v-for="(cardId, cardIndex) in cards" :key=cardId>
                <card v-on:play-card="playCard"
                        v-on:discard-card="discardCard"
                        :uniqueId=cardId
                        :playerKey=playerKey
                        :cardIndex=cardIndex
                        :activePlayer=activePlayer>
                </card>
            </li>
        </ol>
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
        myTurn() {
            console.log("myTurn", this.activePlayer)
            return  this.activePlayer == this.$store.state.myName;
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
        },
        giveHint() {
            this.$emit('give-hint');
        }
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hand {
    border: 1px solid grey;
    height: 200px;
    margin: auto;
	display: table;   /* Allow the centering to work */
}
.card-list {
	list-style: none;
}
.card-list li {
    float: left;
}
</style>
