import Vue from 'vue'
import Router from 'vue-router'
import GamePlay from '@/components/GamePlay'
import CreateGame from '@/components/CreateGame'

/* Material Design Imports */
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import { MdCard, MdButton } from 'vue-material/dist/components'
Vue.use(MdCard);
Vue.use(MdButton);

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'CreateGame',
      component: CreateGame,
    },
    {
      path: '/game/:gameId',
      name: 'GamePlay',
      component: GamePlay,
      props: true
    }
  ]
})
