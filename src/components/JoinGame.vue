<template>
    <div>
        <div v-if="gameExists">
            <md-button @click="deleteGame">Delete this game from firestore!!!</md-button>
            <br />
            Invite friends with this URL:
            http://localhost:8080/#/join/{{gameId}}
            <br />
            Start game here:
            <router-link :to="gameUrl">{{gameId}}</router-link>
        </div>
        <div v-else>
            Missing game with id {{gameId}}
        </div>
    </div>
</template>

<script>
const fb = require('../firebaseConfig.js')
import {GameState, GameStateConverter, createRandomGame} from '@/GameState'
import firebase from 'firebase'
import { db } from '../main'

export default {
    name: 'JoinGame',
    props: {
        gameId: {
            type: String,
        }
    },
    created: function () {
        console.log("JoinGame");
        console.log(this.gameId);
    },
    data () {
        return {
            gameId: "",
            gameState: {},
        }
    },
    firestore () {
        console.log("this.gameId", this.gameId);
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
        gameExists() {
            console.log("this.gameState", this.gameState);
            return this.gameState != undefined && this.gameState != null && this.gameState != {} && this.gameId != "" && this.gameId != undefined && this.gameId != null;
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
