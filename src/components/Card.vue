<template>
  <div class="card">
    <md-card :style="{backgroundColor: color}">
        <md-card-header>
            <div class="md-title">{{number}}</div>
        </md-card-header>
        <div v-if="isPlayable">
          <md-card-actions>
            <md-button @click="play">Play</md-button>
            <md-button @click="discard">Discard</md-button>
         </md-card-actions>
        </div>
    </md-card>
  </div>
</template>

<script>

const colorMap = {
  'r':'#ebabab',
  'b':'#bdddfc',
  'g':'#abebb6',
  'y':'#f5f38c',
  'p': '#d4bdf0'
};
export default {
  name: 'Card',
	props: {
		uniqueId: {
			type: String,
			required: true,
			default: "r1a"
    },
    cardManager: {
    },
    playerIndex: {
    },
    cardIndex: {
    },
    isPlayable: {
    }
	},
	computed: { 
    color() {
        return colorMap[this.uniqueId.substring(0,1)]
    },
    number() {
        return this.uniqueId.substring(1,2)
    },
	},
	methods: {
		play() {
      if(!this.cardManager.playCard(this.playerIndex, this.cardIndex)) {
        alert("invalid!");
      }
    },
		discard() {this.cardManager.discardAndDraw(this.playerIndex, this.cardIndex)},
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card {
  width: 200px;
  float: left;
  margin: 10px;
}
</style>
