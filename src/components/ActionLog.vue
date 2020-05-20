<template>
    <div class="action-log-wrapper">
        <h2>Action log</h2>
        <ol>
            <li v-for="(action, index) of actionLog" :key=index>
                {{action}}
            </li>
        </ol>
    </div>
</template>

<script>
export default {
    name: 'ActionLog',
    computed: { 
      actionLog() {
          console.log(this.$store.state.myGame.actionLog);
          return this.$store.state.myGame.actionLog;
        }
    }  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
