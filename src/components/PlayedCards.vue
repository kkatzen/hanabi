<template>
    <div class="played-cards-wrapper">
        <h2>Played cards</h2>
        <ol class="card-list">
            <li v-for="cardId of cardIds" :key=cardId>
                <card :cardId=cardId />
            </li>
        </ol>
    </div>
</template>

<script>
import Card from '@/components/Card'

export default {
    name: 'PlayedCards',
    components: {
        'card': Card
    },
    computed: { 
      cardIds() {
          let cardIds = [];
          for (let key in this.$store.state.myGame.progress) {
              // construct card ID so card component can render properly
              cardIds.push(key + this.$store.state.myGame.progress[key] + "-p");
          }
          return cardIds;
        }
    }  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.played-cards-wrapper {
    border: 2px solid grey;
    margin: auto;
    padding: 10px;
    text-align: center;
}
.card-list {
	list-style: none;
    padding: 0;
}
</style>
