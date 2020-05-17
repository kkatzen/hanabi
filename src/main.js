// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { firestorePlugin } from 'vuefire'
const fb = require('./firebaseConfig.js')
import firebase from 'firebase'
import { vuexfireMutations, firestoreAction } from 'vuexfire'
import {GameState, GameStateConverter, createRandomGame} from '@/GameState'

Vue.use(firestorePlugin)
Vue.config.productionTip = false

import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    myName: null,
    myGameId: "1234567",
    myGame: "default"
  },
  mutations: vuexfireMutations,
  actions: {
    bindMyGame: firestoreAction((bindFirestoreRef, gameId) => {
      console.log("bindMyGame 1");
      return bindFirestoreRef.bindFirestoreRef(
        "myGame", fb.gameCollection.withConverter(GameStateConverter).doc(gameId),
      );
    }),
    updateGame({ commit }, gameUpdate) {
      fb.gameCollection.doc(gameUpdate.gameId).withConverter(GameStateConverter)
      .set(gameUpdate.gameState)
      .then((docRef) => {
        console.log("Success!", docRef);
      })
      .catch((error) => {
          console.error("Error adding document: ", error);
      });
    },
  }
});

// handle page reloads
let app
fb.auth.onAuthStateChanged(user => {
    console.log("onAuthStateChanged");
    if (!app) {
        app = new Vue({
            el: '#app',
            router,
            store,
            render: h => h(App)
        })
    }
})
