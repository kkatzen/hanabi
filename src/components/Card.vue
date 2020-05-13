<template>
  <div class="card">
    <md-card :style="{backgroundColor: color}">
        <md-card-header>
            <div class="md-title">{{number}}</div>
        </md-card-header>
        <div v-if="isPlayableNow">
          <md-card-actions>
            <md-button @click=playCard>Play</md-button>
            <md-button @click=discardCard>Discard</md-button>
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
    isPlayableNow() {
      let myName = window.sessionStorage.getItem("firework_friend");
      console.log("isPlayableNow",myName);
      console.log("isPlayableNow",this.playerIndex);
      return this.isPlayable && this.playerIndex == myName;
    },
	},
  methods: {
    playCard() {
      this.$emit('play-card', {cardIndex: this.cardIndex, playerIndex: this.playerIndex});
    },
    discardCard() {
      this.$emit('discard-card', {cardIndex: this.cardIndex, playerIndex: this.playerIndex});
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card {
  width: 170px;
  float: left;
  margin: 10px;
}
</style>
