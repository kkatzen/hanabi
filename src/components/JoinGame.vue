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
                    <h3 v-if="currentNumberPlayers < 3">
                        At least 3 players required.
                    </h3>
                    <md-button @click="startGame" :disabled="this.currentNumberPlayers < 3">Start game!!!</md-button>
                </p>
                <div class="invite-code-box">
                    <h1>Invite your friends to join</h1>
                    <h2>http://localhost:8080/#/join/{{gameId}}</h2>
                </div>
                <p>
                    <md-button @click="deleteGame">Cancel and delete</md-button>
                </p>
                <!--<router-link :to="gameUrl">{{gameId}}</router-link>-->
            </div>
            <div v-else>
                Game!
                <game-play :gameId=gameId />
            </div>
        </div>
        <div v-else>
            <h1>Missing game with id {{gameId}}</h1>
        </div>
    </div>
</template>

<script>
const fb = require('../firebaseConfig.js')
import {GameState, GameStateConverter} from '@/GameState'
import firebase from 'firebase'
import { db } from '../main'
import CardManager from '@/CardManager'
import GamePlay from '@/components/GamePlay'

export default {
    name: 'JoinGame',
    props: {
        gameId: {
            type: String,
        }
    },
    data () {
        return {
            userName: "",
            userJoined: false,
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
            window.sessionStorage.setItem('firework_friend', this.userName);
            let cardManager = new CardManager(Object.assign({}, this.gameState));
            cardManager.addPlayer(this.userName);
            this.updateGameState(cardManager.gameState);
            this.userJoined = true;
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
            console.log("updateGameState");
            fb.gameCollection.withConverter(GameStateConverter).doc(this.gameId)
            .set(gameState)
            .then((docRef) => {
                console.log("Success!");
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
        },
    },
    computed: { 
        gameExists() {
            return this.gameState != undefined && this.gameState != null && this.gameState != {} && this.gameId != "" && this.gameId != undefined && this.gameId != null;
        },
        gameUrl() {
            return "/game/" + this.gameId;
        },
        isJoinPhase() {
            return this.gameState.activePlayer == null;
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
</style>
