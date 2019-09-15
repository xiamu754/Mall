export const itemListenerMixin = {
  mounted() {
    let newRefresh = debonce(this.$refs.scroll.refresh,100)
    this.itemImageListener = () => {
      newRefresh()
    }
    this.$bus.$on('itemImgLoad',this.itemImgListener)
  },
}

import BackTop from 'components/common/backtop/BackTop'
import {BACK_POSITION} from './const'


export const backTopMixin = {
  components: {
    BackTop
  },
  data () {
    return {
      isShowBackTop: false
    }
  },
  methods: {
    backTop () {
      this.$refs.scroll.scrollTo(0,0,300)
    },
  },
  listenShowBackTop (position) {
    this.isShowBackTop = -position.y > BACK_POSITION
  }
}
