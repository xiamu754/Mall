# 网上商城项目构思

## 1. 划分目录

    主要是划分 src 的目录
    src            源代码目录
        assets         静态资源 
            css            css 文件
                base.css        本项目公共的 css 文件
                normalize.css   这是一个规范，很多公司都用，可以去 github 下载
            img            img 文件
        common         公共的 js 文件，比如一些常量
            const.js       保存常量的文件
            utils.js       公共的方法
            mixin.js       混入方法相关
        components     公共组件
            common        完全公共组件
            content       项目公共组件
        network        网络相关
        router         路由相关
        store          vuex 状态管理相关
        views          大的视图
        App.vue        
        main.js
        .vue.config.js  配置路径别名文件
        .editorconfig   统一代码风格

## 2. css 文件的引入

做任何项目的时候，都先把公共的 css 文件搞定
    新建 base.css 和 下载 normalize.css 文件
    在 base.css 中引入 normalize.css，即```@import "./normalize.css";```
    在 App.vue 的 style 中 引入 base.css，即```@import "./assets/css/base.css"```

## 3. 项目配置路径别名和缩进风格

    在 src 下新建文件 vue.config.js
    详情配置见 vue.config.js 中的 configuerWebpack
    新建 .editorconfig 文件，配置文件
    详情见 .editorconfig

## 4. 引入 tabbar 和项目模块划分

    直接把 tabbar 的东西拿过来，配置 App 中的路由映射关系，点击能正常切换组件
    详情见 router/index.js 

## 5. 首页相关

### 封装独立的导航组件

    导航是完全公共组件，所以在 components 中的 common 新建 navbar 文件夹，新建 NavBar.vue

### 首页轮播图

    1. 做轮播图要请求数据，请求数据之前要进行网络模块的封装
        + 先安装 axios
        + 在 network 中新建 request.js 文件
        + 在 network 中新建 home.js 文件
            把首页所有的网络请求都封装到这个文件中，统一管理整个首页
            把小的网络请求封装函数，需要拿那个数据直接去调函数就可以了
    2. 在主页发送网络请求，发送网络请求一般在组件一创建就要发，所以写在 created() 里面
        + 分别把要用到的数据取出来，分别保存到 data 中
    3. 拿到轮播图的组件并且做相应展示
        v-for、v-bind

### 首页推荐

    和轮播图差不多

### TabControl 的制作

    本周流行是一个图片，图片下边有一个 TabContral
    在 components 文件夹下的 content 下新建 tabControl 文件夹，在这个文件夹下新建 TabControl.vue 组件
    这个组件的外观要点击显示对应的粉色，需要动态绑定一个类样式
    这个组件中的数据是父组件动态传入一个数组，这个数组的长度可变，通过遍历数组决定里边有几个元素
    在本组件的数据 data 中事前存储一个变量 currentIndex，
    遍历的时候可以拿到每一个 item 的 Index，当这个 Index 和 currentIndex 相等时，通过点击事件把动态绑定的类样式加上
    父组件往 TabControl 传了三个 item：流行、新款、精选 

#### 保存商品的数据结构设计

    goods 这个变量中保存了所有的商品数据，这个数据应该包括三类数据：流行[]、新款[]、精选[]
    这一块的逻辑复杂，分别要请求三种不同的数据，分别是 pop 、new 、sell 的数据
    这里把原来定义在 created 中发送网络请求的函数抽取出来，抽到 methords 中，定义发送网络请求的函数，然后在 created 中调用即可，当组件被创建，created() 函数以及里面的函数立即执行，拿到数据并且保存到 data 中的变量中
    这里，封装了一个函数，这样在 created() 中调用这个 getHomeGoods() 函数的时候传入一个参数(type)即可
    ```
    调用三次 getHomeGoods() 函数，分别请求到这三种类型的数据
    this.getHomeGoods ('pop') 
    this.getHomeGoods ('new')
    this.getHomeGoods ('sell')
    ```
    page 和 list 也是两个变量，page 用来用来记录当前加载到第几页，list 用于记录当前已经加载到的数据
    ```python
        goods: {
          'pop': {
            page: 1,list: []
          },
          'new': {
            page: 1,list: []
          },
          'sell': {
            page: 1,list: []
          }
        }
    ```
    ```
    定义这个函数是为了思维更清晰，这样每次请求数据只需要传一个类型(type)即可
    getHomeGoods (type) {
        // 定义一个 page，取出来原来的 page，每次让 page 加一
        // push() 方法有个特殊的用法，它可以将一个数组解构，然后一个一个加入到另一个数组中
        const page = this.goods[type].page + 1
        getHomeGoods(type,page).then(res => {
            // this.goods[type].list.push 即我们 data 中的数组，这一步的操作是将获取到的 res...list 数据 push() 到 data 中的数组中，最后让原来的页码加一，每执行一次这个方法都会加一
            this.goods[type].list.push(...res.data.data.list)
            this.goods[type].page += 1
        })
      }
    ```

#### 展示商品列表的数据

    定义 GoodsList 组件，通过 props 拿到父组件 Home 的 goods['type'].list 中的数据
    定义 GoodsListItem 组件，通过 props 拿到父组件 GoodsList 的 goods-item
