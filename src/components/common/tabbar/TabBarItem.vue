<template>
  <div class="tab-bar-item" @click="itemclick">
    <div v-if="!isActive"><slot name="item-icon"></slot></div> 
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :style="activeStyle"><slot name="item-text" ></slot></div>
  </div>
</template>

<script>
  export default {
    name: 'TabBarItem',
    props: {
      path: String,
      activeColor: {
        type: String,
        default: 'red'
      }
    },
    data() {
      return {
        
      }
    },
    methods: {
      itemclick () {
        this.$router.push(this.path)
      }
    },
    computed: {
      isActive () {
        // 动态决定 isActive 的值
        // $route 是当前活跃路由对象，$route.path 是当前活跃路由对象路径
        // 判断这个 $route.path 中是否包含父组件(也就是 props) 中的 path
        // this.$route.path.indexOf(this.path) 不等于 -1 的时候，说明  $route.path 包含 props 中的 path
        return this.$route.path.indexOf(this.path) !== -1
      },
      activeStyle () {
        // this.isActive 是否处于活跃？ 
        return this.isActive ? {color: this.activeColor} : {}
      }
    }
  }
</script>

<style>
    .tab-bar-item {
    flex: 1;
    text-align: center;
    height: 49px;
  }
  .tab-bar-item img {
    width: 24px;
    height: 24px;
    margin-top: 3px;
    vertical-align: middle;
  }

</style>
