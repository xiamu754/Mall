<template>
  <div>
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
  </div>
</template>


<script>
  import NavBar from 'components/common/navbar/NavBar'

  import { mapGetters } from 'vuex'

  export default {
    name: 'ShopCar',
    components: {
      NavBar,
    },
    computed: {
      cartLength () {
        return this.$store.getters.length
      }
    }
  }
</script>


<style scoped>
  .nav-bar {
    background: #FF8198;
    color: #fff
  }
</style>