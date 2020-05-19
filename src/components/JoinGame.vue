<template>
    <div>
        <div v-if="gameExists">
            <div v-if="isJoinPhase">
                <h1 v-if="currentNumberPlayers >= 5">
                    Maximum number of players in this game
                </h1>
                <div v-if="userJoined"> 
                    <h1>Get ready to play, {{userName}}!</h1>
                </div>
                <div v-if="!userJoined && currentNumberPlayers < 5">
                    <md-field class="user-join-field">
                        <label>Your Name</label>
                        <md-input v-model="userName"></md-input>
                    </md-field>
                    <md-button :disabled=joinButtonDisabled @click="joinGame">Join game!!!</md-button>
                </div>

                <div v-if="currentNumberPlayers == 0">
                    <h1>Waiting for players to join...</h1>
                </div>
                <div v-else>
                    <h1>Current players</h1>
                    <md-list class="current-players-list">
                        <md-list-item v-for="(value, name) in this.gameState.playerHands" 
                            :key=value>
                            {{name}}
                        </md-list-item>
                    </md-list>
                </div>
                <p>
                    <h3 v-if="currentNumberPlayers < 2">
                        At least 2 players required.
                    </h3>
                    <h3 v-if="currentNumberPlayers == 5">
                        Maximum of 5 players
                    </h3>
                    <md-button @click="startGame" :disabled="disableStartGame">Start game!!!</md-button>
                </p>
                <div class="invite-code-box">
                    <h1>Invite your friends to join</h1>
                    <h2>http://fireworkswithfriends.firebaseapp.com/#/join/{{gameId}}</h2>
                </div>
                <p>
                    <md-button @click="deleteGame">Cancel and delete</md-button>
                </p>
            </div>
            <div v-else>
                <div v-if="gameIsLost" class="end-game">
                   You Lost!!!
                </div>
                <div v-else-if="gameIsWon" class="end-game">
                   You Won!!!
                </div>
                <game-play />
            </div>
        </div>
        <div v-else>
            <h1>Missing game with id {{gameId}}</h1>
        </div>
    </div>
</template>

<script>
const fb = require('../firebaseConfig.js')
import firebase from 'firebase'
import { db } from '../main'
import CardManager from '@/CardManager'
import GamePlay from '@/components/GamePlay'

export default {
    name: 'JoinGame',
    created() {
        this.$store.state.myName = undefined;
    },
    props: {
        gameId: {
            type: String,
        }
    },
    data () {
        return {
            userName: "",
            gameState: {},
        }
    },
    firestore () {
        return {
            gameState: fb.gameCollection.doc(this.gameId)
        }
    },
    watch: {
        gameId(gameId) {
            // $bind automatically unbinds the previously bound property
            this.$bind('gameState', fb.gameCollection.doc(gameId))
        },
    },
    methods: {
        joinGame() {
            // Set up store
            this.$store.state.myName = this.userName;
            this.$store.state.myGameId = this.gameId;
            this.$store.dispatch("bindMyGame", this.gameId);

            // Update database
            let cardManager = new CardManager(Object.assign({}, this.gameState));
            cardManager.addPlayer(this.userName);
            this.updateGameState(cardManager.gameState);
        },
        deleteGame() {
            fb.gameCollection.doc(this.gameId).delete().then(function() {
                console.log("Document successfully deleted!");
            }).catch(function(error) {
                console.error("Error removing document: ", error);
            });
        },
        startGame() {
            let cardManager = new CardManager(Object.assign({}, this.gameState));
            cardManager.dealCardsAndStartGame();
            this.updateGameState(cardManager.gameState);
        },
        updateGameState(gameState) {
            let gameUpdate = {
                gameId: this.gameId,
                gameState: gameState
            };
            this.$store.dispatch("updateGame", gameUpdate);
        },
    },
    computed: { 
        userJoined() {
            return this.$store.state.myName != null;
        },
        disableStartGame() {
            return this.currentNumberPlayers < 2 || this.currentNumberPlayers == 5;
        },
        gameExists() {
            return this.gameState != undefined && this.gameState != null && this.gameState != {} && this.gameId != "" && this.gameId != undefined && this.gameId != null;
        },
        gameUrl() {
            return "/game/" + this.gameId;
        },
        isJoinPhase() {
            return this.gameState.activePlayer == null;
        },
        gameIsLost() {
            return this.gameState != undefined && (this.gameState.misplays == 3 || (this.gameState.deck && this.gameState.deck.length == 0));
        },
        gameIsWon() {
            if (this.gameState != undefined) {
                return false;
            }
            let sum = 0;
            for (let color of Object.keys(this.gameState.progress)){
                sum += this.gameState.progress[color];
            }
            return sum == 25;
        },
        joinButtonDisabled() {
            return !this.userName;
        },
        currentNumberPlayers() {
            return Object.keys(this.gameState.playerHands).length;
        },
    },
    components: {
        'game-play': GamePlay,
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.user-join-field {
    width: 30%;
    margin: auto;
}
.invite-code-box {
    border: 1px solid grey;
    width: 80%;
    margin: auto;
}
.current-players-list {
    width: 40%;
    margin: auto;
}
.end-game {
    font-size: 100px;
    line-height: 100px;
    text-align: center;
    padding: 20px;
}
</style>
