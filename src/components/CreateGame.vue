<template>
    <div>
        <md-button @click="createGame">Create a new game!!!</md-button>
    </div>
</template>

<script>
const fb = require('../firebaseConfig.js')
import firebase from 'firebase'
import { db } from '../main'
import { GameStateConverter, createBlankGame } from '@/GameState'

export default {
    name: 'CreateGame',
    methods: {
        createGame() {
            let newGameState = createBlankGame();
            fb.gameCollection.withConverter(GameStateConverter)
            .add(newGameState)
            .then((docRef) => {
                console.log("Document written with ID: ", docRef.id);
                this.$router.push("/join/" + docRef.id)
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
        }
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
