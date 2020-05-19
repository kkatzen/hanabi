<template>
    <div class="discards" v-if="myGame.discards.length > 0">
    <h2>Discarded Cards</h2>
    <ul v-for="(i, colorKey) of sortedDiscards"
            class="discard-color-list"
            :key="colorKey">
        <li v-for="num of sortedDiscards[colorKey]"
                :key=num>
            <card :cardId="colorKey + num" />
        </li>
    </ul>
    </div>
</template>

<script>
import Card from '@/components/Card'

export default {
name: 'Discards',
components: {
    'card': Card
},
computed: {
    myGame() {
        console.log(this.$store.state.myGame);
      return this.$store.state.myGame;
    },
    sortedDiscards() {
        const discardMap = {
        'r':[],
        'b':[],
        'g':[],
        'y':[],
        'p':[]
        };
        for (let card of this.$store.state.myGame.discards) {
            const color = card.substring(0,1);
            const number = card.substring(1,2);
            discardMap[color].push(number);
        }
        for (let color of Object.keys(discardMap)) {
            discardMap[color].sort()
        }
      return discardMap;
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.discards {
    min-width: 300px;
    border: 1px solid grey;
	display: table;   /* Allow the centering to work */
}
.discard-color-list {
    float:left;
 	list-style: none;
    padding: 0;
}
</style>
