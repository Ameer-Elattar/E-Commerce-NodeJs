<template>
  <div class="container-fluid">
  <div class="row">
    <div class="col-2">
      One of three columns
    </div>
    <div class="col-10">
      One of three columns
    </div>
  </div>
</div>
</template>

<script>

import {storedata} from './../storedata.js'



export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data:()=>({
    storedata:storedata()
  })
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
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
