<template>
    <div class="hand" :style="{backgroundColor: backgroundColor}">
        <h2>
            {{playerKey}}
        </h2>
        <div v-if="!myHand && myTurn">
            <md-button @click="hintsVisible = !hintsVisible">{{toggleHintsText}}</md-button>
            <div v-if="hintsVisible">
                <hint-button v-for="hint in availableHints" 
                    :playerKey=playerKey
                    :hint=hint
                    :key=hint />
                </div>
        </div>
        <ol class="card-list">
            <li v-for="(cardInfo, cardIndex) in cardsInHand" :key=cardInfo.id>
                <card-in-hand :playerKey=playerKey
                      :cardIndex=cardIndex
                      :activePlayer=activePlayer>
                </card-in-hand>
            </li>
        </ol>
    </div>
</template>

<script>
import CardInHand from '@/components/CardInHand'
import HintButton from '@/components/HintButton'
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
    data () {
        return {
            hintsVisible: false
        }
    },
	computed: { 
        toggleHintsText() {
            return this.hintsVisible ? "hide hints" : "show hints";
        },
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
        },
        availableHints() {
            let hints = [];
            for(let cardInfo of this.cardsInHand) {
                console.log(cardInfo);
                if (!hints.find((i) => i == cardInfo.id.substr(0,1))) {
                    hints.push(cardInfo.id.substr(0,1));
                }
                if (!hints.find((i) => i == cardInfo.id.substr(1,1))) {
                    hints.push(cardInfo.id.substr(1,1));
                }
            }
            return hints.sort();
        }
    },
    watch: {
        activePlayer(activePlayer) {
            this.hintsVisible = false;
        },
    },
    components: {
        'card-in-hand': CardInHand,
        'hint-button': HintButton,
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hand {
    border: 1px solid grey;
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
