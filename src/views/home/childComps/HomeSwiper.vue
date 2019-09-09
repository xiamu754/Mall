<template>
  <div>
    <swiper>
      <swiper-item  v-for="item in bannersList">
        <a :href="item.link">
          <img :src="item.image" alt="">
        </a>
      </swiper-item>
    </swiper> 
  </div>
</template>


<script>
  import {Swiper,SwiperItem} from 'components/common/swiper'

export default {
  name: 'HomeSwiper',
  props: {
    bannersList: {
      type: Array,
      default () {
        return []
      }  
    }
  },
  components: {
    Swiper,
    SwiperItem
  }
}
</script>


<style  scoped>

</style>