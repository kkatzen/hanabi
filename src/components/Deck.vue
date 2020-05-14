<template>
  <div class="card-wrapper">
    <h2>Deck</h2>
    <md-card class="card">
        <md-card-header>
            <div class="md-title">{{remainingCards}}</div>
        </md-card-header>
    </md-card>
  </div>
</template>

<script>
export default {
  name: 'Deck',
	props: {
		remainingCards: {
			type: Number,
			required: true,
			default: 0
        },
	},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card-wrapper {
    width: 170px;
    margin: 10px;
    border: 2px solid grey;
    padding: 10px;
}
.card {
    background-color:#808080;
}
</style>
