<template>
  <div class="wrapper" ref="wrapper">
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import { setTimeout } from 'timers';

  export default {
    name: 'Scroll',
    data () {
      return {
        scroll: null,
        
      }
    },
    props: {
      probeType: {
        type: Number,
        default: 1
       },
       pullUpLoad: {
         type: Boolean,
         default: false
       },
    },
    mounted () {
      this.scroll = new BScroll(this.$refs.wrapper,{
        probeType: this.probeType,
        click: true,
        pullUpLoad: this.pullUpLoad
      })

      // 监听滚动位置
      if (this.probeType === 2 || this.probeType === 3) {
        this.scroll.on('scroll',(position) => {
          this.$emit('scroll',position)
        })
      } 
      // 监听 scroll 滚动到底部
      if (this.pullUpLoad) {
        this.scroll.on('pullingUp',() => {
          this.$emit('pullingUp')
        })
      }

    },
    methods: {
      scrollTo (x, y, time=300) {
        this.scroll && this.scroll.scrollTo(x, y, time)
      },
      finishPullUp () {
        this.scroll.finishPullUp()
      },
      refresh () {
        this.scroll && this.scroll.refresh()
      },
      finishPullUp () {
        this.scroll && this.scroll.finishPullUp()
      }
    }
  }

</script>

<style scoped>

</style>