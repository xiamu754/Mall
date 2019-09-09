<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <home-swiper :bannersList="bannersList"></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
    <feature-view></feature-view>
    <tab-control class="tab-control" 
                 :titles="['流行','新款','精选']"
                 @tabClick="tabClick"
                 ></tab-control>
    <goods-list :goods="showGoods"></goods-list>
    <ul>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  </div>
</template>


<script>
  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'

  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from '../home/childComps/FeatureView'

  import { getHomeMultidata , getHomeGoods } from 'network/home'


  export default {
    name: 'Home',
    components: {
      NavBar,
      TabControl,
      GoodsList,
      HomeSwiper,
      RecommendView,
      FeatureView,
      
    },
    data() {
      return {
        banners: {},
        bannersList: [],
        recommends: [],
        goods: {
          'pop': {page: 0,list: []},
          'new': {page: 0,list: []},
          'sell': {page: 0,list: []}
        },
        currentType: 'pop'
      }
    },
    computed: {
      showGoods () {
        return this.goods[this.currentType].list
      }
    },
    created () {
      // 1. 请求多个数据
      // 2. 当这个函数执行完毕，所有变量都会被释放掉，所以在释放之前，把数据保存到 data 中的 result 中
      this.getHomeMultidata ()
      // 请求商品数据
      this.getHomeGoods ('pop') 
      this.getHomeGoods ('new')
      this.getHomeGoods ('sell')
    },
    methods: {
      // 网络请求相关的方法
      getHomeMultidata () {
        getHomeMultidata ().then (res => {
        this.banners = res.data.data.banner
        this.bannersList = res.data.data.banner.list
        this.recommends = res.data.data.recommend.list
        })
      },
      getHomeGoods (type) {
        // 先取出来原来的 page，动态获取 page
        const page = this.goods[type].page + 1
        getHomeGoods(type,page).then(res => {
            this.goods[type].list.push(...res.data.data.list)
            this.goods[type].page += 1
        })
      },
      // 事件监听的方法
      tabClick (index) {
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
        }
      }
    }
  }
</script>


<style scoped>
  #home {
    padding-top: 44px;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #fff ;

    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }
  .tab-control {
    position: sticky;
    top: 44px;
    z-index: 9;
  }

</style>