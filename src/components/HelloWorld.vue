<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button @click="readFirestore">click me</button>
    {{ firebaseRead }}
  </div>
</template>

<script>
const fb = require('../firebaseConfig.js')
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
      msg: 'Hello world!',
      firebaseRead: 'firebase read...'
    }
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
</style>
