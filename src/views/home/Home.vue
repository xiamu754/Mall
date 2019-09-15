<template>
  <div id="home" class="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control ref="tabControl1"
                  :titles="['流行','新款','精选']"
                  @tabClick="tabClick"
                  class="tab-control"
                  v-show="isTabFixed"
                  ></tab-control>
    <scroll class="content" ref="scroll" 
            :probe-type="3" 
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
        <home-swiper :bannersList="bannersList" 
                      class="home-swiper"
                      @swiperImageLoad="swiperImageLoad"></home-swiper>
        <recommend-view :recommends="recommends"></recommend-view>
        <feature-view></feature-view>
        <tab-control ref="tabControl2"
                    :titles="['流行','新款','精选']"
                    @tabClick="tabClick"
                    ></tab-control>
        <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backTop" v-show="isBackShow"/>
  </div>
</template>


<script>
  import NavBar from 'components/common/navbar/NavBar'
  import Scroll from 'components/common/scroll/Scroll'
  import BackTop from 'components/common/backtop/BackTop'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'


  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from '../home/childComps/FeatureView'

  import { getHomeMultidata , getHomeGoods } from 'network/home'
  import {debounce} from '../../common/utils'


  export default {
    name: 'Home',
    components: {
      NavBar,
      TabControl,
      GoodsList,
      HomeSwiper,
      RecommendView,
      FeatureView,
      Scroll,
      BackTop
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
        currentType: 'pop',
        isBackShow: false,
        tabOffset: 0,
        isTabFixed: false
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
    mounted () {
      // 图片加载完成的事件监听
      const refresh = debounce(this.$refs.scroll.refresh,200)
      this.$bus.$on('itemImageLoad',() => {
        refresh()
      })
      
      // 获得 tabControl 的 offsetTop

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

            // 完成上拉加载更多
            this.$refs.scroll.finishPullUp()
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
        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index
      },
      backTop () {
        this.$refs.scroll.scrollTo(0,0)
      },
      contentScroll (position) {
        // 判断 backTop 是否显示
        this.isBackShow = (-position.y) > 1000
        // 决定 tabControl 是否吸顶
        this.isTabFixed = (-position.y) > this.tabOffset

      },
      loadMore () {
        this.getHomeGoods(this.currentType)
      },
      swiperImageLoad () {

        this.tabOffset = this.$refs.tabControl2.$el.offsetTop   
        
      }
    }
  }
</script>


<style scoped>
  #home {
    padding-top: 44px;
   overflow: hidden;
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
    position: relative;
    z-index: 9
  }
  .wrapper {
    height: 435px;
  }
</style>