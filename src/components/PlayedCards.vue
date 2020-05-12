<template>
    <div class="my-cards">
        <h1>Played cards</h1>
        <card v-for="cardId of cardIds" 
            :key=cardId
            :uniqueId=cardId>
        </card>
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
              cardIds.push(key + this.cards[key]);
          }
          return cardIds;
        }
    }  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.my-cards {
  border: 2px solid grey;
  height: 200px;
  margin: auto;
  width: 1004px;
}
</style>
