// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { firestorePlugin } from 'vuefire'
const fb = require('./firebaseConfig.js')
import firebase from 'firebase'

Vue.use(firestorePlugin)
Vue.config.productionTip = false

// handle page reloads
let app
fb.auth.onAuthStateChanged(user => {
    if (!app) {
        app = new Vue({
            el: '#app',
            router,
            render: h => h(App)
        })
    }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
