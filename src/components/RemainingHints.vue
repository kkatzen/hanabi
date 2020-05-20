<template>
  <div class="remaining-hints">
    <h2>{{remainingHints}} hints remain</h2>
      <ol class="hint-list">
          <li v-for="i in 8" :key=i>
            <div class="box"
                 :class="{ 'full-box': i <= remainingHints }"/>
          </li>
      </ol>
  </div>
</template>

<script>
export default {
  name: 'RemainingHints',
	computed: {
    remainingHints() {
      return this.$store.state.myGame.remainingHints;
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.remaining-hints {
    width: 170px;
    margin: 10px;
    height: 90px;
    border: 2px solid grey;
    display: table;
    text-align: center;
}
.hint-list {
  margin: auto;
	list-style: none;
  padding: 0;
  margin-left: 5px;
}
.hint-list li {
    float: left;
}
.box {
  background-color: white;
  border: 1px solid grey;
  height: 15px;
  width: 15px;
  margin: 2px;
}
.full-box {
  background-color: #6DC15E;
}
</style>
