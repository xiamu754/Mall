<template>
  <div id="detail" @titleClick="titleClick">
    <detail-nav-bar class="detail-nav"></detail-nav-bar>
    <scroll class="content" ref="scroll">
      <detail-swiper :top-images="topImage"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info ref="param" :param-info="paramInfo"></detail-param-info>
      <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
      <goods-list ref="recommend" :goods="recommends"></goods-list>
      <back-top></back-top>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
  </div>
</template>


<script>
  import DetailNavBar from './childComponents/DetailNavBar'
  import DetailSwiper from './childComponents/DetailSwiper'
  import DetailBaseInfo from './childComponents/DetailBaseInfo'
  import DetailShopInfo from './childComponents/DetailShopInfo'
  import DetailGoodsInfo from './childComponents/DetailGoodsInfo'
  import DetailParamInfo from './childComponents/DetailParamInfo'
  import DetailCommentInfo from './childComponents/DetailCommentInfo'
  import DetailBottomBar from './childComponents/DetailBottomBar'

  import Scroll from 'components/common/scroll/Scroll'
  import GoodsList from 'components/content/goods/GoodsList'

  import {getDetail,Goods,Shop,GoodsParam ,getRecommend} from 'network/detail'
  import {debounce} from '../../common/utils'
  import {backTopMixin} from '../../common/mixin'

  export default {
    name: 'Detail',
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      GoodsList,
      DetailBottomBar,
      Scroll,
    },
    props: {

    },
    mixins: [backTopMixin],
    data () {
      return {
        iid: null,
        topImage: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        themeTopYs: [],
        getThemeTopY: null
      }
    },
    created () {
      // 保存传入的 iid 
      this.iid = this.$route.params.iid
      // 根据 iid 请求详情数据
      getDetail (this.iid).then(res => {

        // 获取顶部轮播图数据
        const data = res.data.result
        
        this.topImage = data.itemInfo.topImages
        
        // 获取商品信息
        this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
        // 创建店铺信息的对象
        this.shop = new Shop(data.shopInfo)
        // 获取商品详情信息
        this.detailInfo = data.detailInfo
        // 获取商品参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
        // 获取评论信息
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
        } 
      }) 
      // 请求推荐数据
      getRecommend ().then(res => {
        this.recommends = res.data.data.list
      })
      // 给 getThemeTopY
      this.getThemeTopY = debounce(() => {  
        this.getThemeTopY = []
        this.getThemeTopY.push(0)
        this.getThemeTopY.push(this.$refs.param.$el.offsetTop)
        this.getThemeTopY.push(this.$refs.comment.$el.offsetTop)
        this.getThemeTopY.push(this.$refs.recommend.$el.offsetTop)      
      })
    },
    methods: {
      imageLoad () {
        this.$refs.scroll.refresh()
        this.getThemeTopY()
      },
      titleClick (index) {
        this.$ref.scroll.scrollTo(0,-this.themeTopYs[index],200)
      // 是否返回顶部
      this.listenShowBackTop(position)
      },
      addToCart () {
        const product = {}
        // 获取商品信息
        product.image = this.topImage[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.price = this.goods.realPrice
        product.iid = this.iid
        // 把商品信息保存到购物车
        this.$store.dispatch('addCart',product)
      }
    }
  }

</script>


<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }
  .content {
    height: calc(100% - 44px);
  }
  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

</style>