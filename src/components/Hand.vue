<template>
<!--v-for="(hand, playerIndex) in gameState.playerHands"
          :key=playerIndex
-->
    <div class="hand" :style="{backgroundColor: backgroundColor}">
        <h2>
            {{playerKey}}
        </h2>
        <div v-if="myHand && myTurn">
            <md-button @click=giveHint>Give Hint</md-button>
        </div>
        <ol class="card-list">
            <li v-for="(cardId, cardIndex) in cardsInHand" :key=cardId>
                <card :uniqueId=cardId
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
import CardManager from '@/CardManager'
const fb = require('./../firebaseConfig.js')

export default {
  name: 'Hand',
	props: {
        playerKey: {
            type: String,
            required: true,
        },
	},
	computed: { 
        activePlayer() {
            return this.$store.state.myGame.activePlayer;
        },
        cardsInHand() {
            return this.$store.state.myGame.playerHands[this.playerKey]
        },
        myHand() {
            return  this.playerKey == this.$store.state.myName;
        },
        myTurn() {
            return  this.activePlayer == this.$store.state.myName;
        },
        backgroundColor() {
            return this.playerKey == this.activePlayer ? "#C4FFBA" : "#FFFFFF";
        }
    },
    components: {
        'card': Card,
    },
    methods: {
        giveHint() {
            let cardManager = new CardManager(this.$store.state.myGame);
            if(!cardManager.giveHint()) {
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
.hand {
    border: 1px solid grey;
    height: 200px;
    margin: auto;
	display: table;   /* Allow the centering to work */
    margin: 20px;
}
.card-list {
	list-style: none;
    padding: 0;
}
.card-list li {
    float: left;
}
</style>
