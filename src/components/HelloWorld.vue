<template>
  <div class="hello">
    <md-button @click="readFirestore">click me</md-button>
    {{ firebaseRead }}
    <div class="my-cards">
      <h1>My cards</h1>
      <card color="red" number=2></card>
      <card color="blue" number=5></card>
      <card color="green" number=2></card>
      <card color="blue" number=4></card>
    </div>
  </div>
</template>

<script>
const fb = require('../firebaseConfig.js')
import Card from '@/components/Card'

export default {
  name: 'HelloWorld',
  methods: {
    readFirestore() {
        fb.testCollection.doc("M13aPHDYrvXxQQSFXQZl").get().then(res => {
            console.log(res.data());
             this.firebaseRead = res.data().test;
        }).catch(err => {
            console.log(err)
        })
    }
  },
  data () {
    return {
      firebaseRead: 'firebase read...'
    }
  },
  components: {
    'card': Card
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.my-cards {
  border: 2px solid grey;
  height: 200px;
  margin: auto;
  width: 884px; /* 220 * 4 for cards + 2*2 for border */
}
</style>
