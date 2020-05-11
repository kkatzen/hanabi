<template>
  <div class="card">
    <md-card>
        <md-card-header>
            <div class="md-title">{{color}} {{number}}</div>
        </md-card-header>
    </md-card>
  </div>
</template>

<script>
export default {
    name: 'Card',
    props: {
		color: {
			type: String,
			required: true,
			default: "red"
        },
        number: {
			type: Number,
			required: true,
			default: 1
		}
	},
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
