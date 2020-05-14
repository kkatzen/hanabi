<template>
    <div class="played-cards-wrapper">
        <h2>Played cards</h2>
        <ol class="card-list">
            <li v-for="cardId of cardIds" :key=cardId>
                <card :uniqueId=cardId />
            </li>
        </ol>
    </div>
</template>

<script>
import Card from '@/components/Card'

export default {
    name: 'PlayedCards',
    props: {
        cards: {
            type: Object,
			required: true,
            default: () => {return {'r':4, 'y':0, 'b':0, 'g':0, 'p':0}},
            validator: function (value) {
                return true;
            }
        }
    },
    components: {
        'card': Card
    },
    computed: { 
      cardIds() {
          let cardIds = [];
          for (let key in this.cards) {
              // construct card ID so card component can render properly
              cardIds.push(key + this.cards[key] + "-p");
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
