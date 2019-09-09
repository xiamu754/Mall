<template>
  <div class="tab-control">
    <div v-for="(item,index) in titles" 
         class="tab-control-item" 
         :class="{active: index === currentIndex}"
         @click="itemClick(index)"
         >
      <span>{{item}}</span>
    </div>
  </div>
</template>


<script>
export default {
  name: 'TabControl',
  props: {
    titles: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      currentIndex: 0
    }
  },
  methods: {
    itemClick (index) {
      this.currentIndex = index
      this.$emit('tabClick',index)
    }
  }
}
</script>


<style scoped>
  .tab-control {
    display: flex;
    text-align: center;
    font-size: 14px;
    background-color: #fff;
  }
  .tab-control-item {
    flex: 1;
    height: 40px;
    line-height: 40px;
    padding: 3px;
    background-color: #fff;
  }
  .active {
    color: #FF8198;
    
  }
  .active span {
    border-bottom:3px solid #FF8198 
  }

</style>