<template>
    <div>
        <div v-if="gameExists">
            <div v-if="isJoinPhase">
                <h1>Invite your friends to join</h1>
                <h2>http://localhost:8080/#/join/{{gameId}}</h2>
                <p>
                    <md-button @click="joinGame">Join game!!!</md-button>
                </p>
                <div v-for="(value, name) in this.gameState.playerHands" 
                    :key=value>
                    {{name}}
                </div>
                <p>
                    <md-button @click="startGame">Start game!!!</md-button>
                </p>
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
            const newPlayer = prompt("name?");
            window.sessionStorage.setItem('firework_friend', newPlayer);
            let cardManager = new CardManager(Object.assign({}, this.gameState));
            cardManager.addPlayer(newPlayer);
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
        }
    },
    components: {
        'game-play': GamePlay,
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
