<template>
  <div class="card">
    <md-card :style="{backgroundColor: color}">
        <md-card-area>
          <md-card-header>
              <div class="md-title">{{number}}</div>
          </md-card-header>
        </md-card-area>
    </md-card>
  </div>
</template>

<script>
import { mapState } from "vuex";
import CardManager from '@/CardManager'

const colorMap = {
  'r':'#ebabab',
  'b':'#bdddfc',
  'g':'#abebb6',
  'y':'#f5f38c',
  'p': '#d4bdf0'
};
export default {
  name: 'CardInHand',
	props: {
		cardId: {
            required: true
        },
	},
	computed: { 
        color() {
            return colorMap[this.cardId.substring(0,1)]
        },
        number() {
            return this.cardId.substring(1,2)
        },
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card {
  width: 130px;
  margin: 10px;
}
</style>
