<template>
    <div>
        <div v-if="!gameCreated">
        <md-button @click="createGame">Create a new game!!!</md-button>
        </div>
            <div v-else>
        <md-button @click="deleteGame">Delete this game from firestore!!!</md-button>
        </div>
        <router-link :to="gameUrl">{{gameId}}</router-link>
    </div>
</template>

<script>
const fb = require('../firebaseConfig.js')
import {GameState, GameStateConverter, createRandomGame} from '@/GameState'
import firebase from 'firebase'
import { db } from '../main'

export default {
    name: 'CreateGame',
    created: function () {
        console.log('hi')
    },
    data () {
        return {
            gameId: ""
        }
    },
    methods: {
        createGame() {
            let newGameState = createRandomGame(3,2);
            fb.gameCollection.withConverter(GameStateConverter)
            .add(newGameState)
            .then((docRef) => {
                console.log("Document written with ID: ", docRef.id);
                this.gameId = docRef.id;
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
        },
        deleteGame() {
        fb.gameCollection.doc(this.gameId).delete().then(function() {
            console.log("Document successfully deleted!");
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
        // why do i have to do this manually?
        this.gameId = "";
        },
    },
    computed: { 
        gameCreated() {
            return this.gameId != "";
        },
        gameUrl() {
            if(this.gameId)
                return "/game/" + this.gameId;
            return "";
        }
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
