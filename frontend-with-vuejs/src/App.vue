<template>
  <headerbar/>
  <RouterView></RouterView>

</template>

<script>
import headerbar from './components/header.vue'
import HelloWorld from './components/HelloWorld.vue'
import {storedata} from './storedata.js'

export default {
  name: 'App',
  data:()=>({
    storedata : storedata()
  }),
  components: {
    HelloWorld,headerbar
  }
}
</script>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
