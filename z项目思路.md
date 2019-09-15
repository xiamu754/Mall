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

## 使用 better-scroll 重构项目

### better-scroll 的基本使用

    1. 安装 npm i better-scroll --save
    2. 在 script 标签中 new 一个  better-scroll 实例，
    注意：
          默认情况下 BScroll 是不可以实时监听滚动位置的，如果想监听，必须在 new 这个对象的时候，在第二个参数这里传参数，有两个很重要的参数：
            + 参数一：probeType : 侦测，默认值为 0
                      0 和 1 都是不侦测实时的位置，
                      2 是滚动的过程中侦测，惯性滚动过程中不侦测
                      3 只要是滚动都侦测
            + 参数二：click
                      只有当 click 的值为 true 时，才能监听里面的按钮点击事件
            + 参数三：pullUpLoad
                      当值为 true 时，上拉加载更多
          要滚动的区域必须有一个默认的高度
      ```
      // 这个方法第一个参数是要控制的元素
      // 可以给被控制的元素加一个 ref="refname"，再通过 this.$refs.refname 拿到这个元素本身
      const bscroll = new BScroll(document.querySelect('要控制的类名'),{
        probeType: 3 
      })

      bscroll.on('scroll',(position) => {
        position.
      })

      bscroll.on('pullingUp', () => {
        console.log('上拉加载更多')
        // 发送网络请求，请求更多页的数据

        // 等数据请求完，并且将新的数据展示出来后，必须调用以下方法，表示可以再一次加载更多
        // 定时器的意义是必须两秒过后才可以再次上拉加载更多 
        setTimeOut(() => {
          bscroll.finishPullUp()
        },2000)
      })
      ```

### 使用 better-scroll 基本构建

    注意：在 components 和 vue 实例中，better-scroll 实例必须写在 mounted() 函数中，因为 created() 调用的时候，拿不到 dom 元素，必须在挂载完 dom 元素之后才能使用这个

### 封装 better-scroll

    注意：ref 如果是绑定在组件中的，那么通过 this.$refs.refname 获取到的是一个对象
          ref 如果是绑定在普通元素中的，那么通过 this.$refs.refname 获取到的是一个元素对象
    把 better-scroll 独立封装成一个单独的组件，多个页面都可以复用

### 返回顶部功能的实现

    - 先在布局上显示这个小组件
    - better-scroll 实例给我们提供了一个方法，scrollTo(),这个方法可以让回到指定位置。有三个参数，分别是指定位置的 x 坐标、y 坐标和到达指定位置要用的时间(单位毫秒)。
    - 在 Scroll 这个组件中定义一个方法 scrollTo(x, y, time=300)),这个方法是对上一层的 scrollTo() 的进一步封装。依然传入三个参数。
    - 在需要返回顶部的组件中定义方法
        ```
        backTop () {
          this.$refs.scroll.scrollTo(0,0)
        }
        ```
    - 在 back-top 组件上绑定点击事件。
    注意：组件是不能直接监听点击事件的，加上 .native 属性，才能监听原生时间
    做到这里，返回顶部按钮基本功能实现，但是还不能随着滑轮的滚动来隐藏
    - 当滚动的值大于 1000 时，显示 backTop 组件
        在这里，必须实时监听滑动的位置。需要在 Scroll.vue 中监听滑动事件，并且向外发送一个自定义事件，这个事件需要把 position 传出去
        在 Home.vue 中的 back-top 标签中，接受这个自定义事件，并且定义事件处理函数，这个函数需要拿到自定义事件传过来的 position。同时在这个标签中绑定 v-show 的值，这个值需要事先在 data 中存储，这里我使用 isBackShow 来作为 v-show 的值，默认数 false。只有滑动大于 1000 时，这个值才为 true。因为向下滑动都是负值，所以需要先将 position.y 转成正值。
        ```
        Scroll.vue：
        this.scroll.on('scroll',(position) => {
          this.$emit('scroll',position)
        })
        Home.vue：
        contentScroll (position) {
          this.isBackShow = (-position.y) > 1000
        }
        ```

### 解决 Better-Scroll 滚动区域的问题

    Better-Scroll 在决定有多少区域可以滚动时，根据 scrollHeight 属性决定
        scrollHeight 属性时根据 Better-Scroll 中的 content 中的子组件高度
        但是在首页中，刚开始计算 scrollHeight 属性时，没有将图片计算在内的
        所以，计算出来的是错误的
        后来，图片加载进来之后有了新的高度，但是 ScrollHeight 属性并没有更新
    如何解决这个问题？
        监听每一张图片是否加载完成，只要有一张图片加载完成了，执行一次 refresh() 
        如何监听图片加载完成了？
        Vue 中监听：@load= '方法'
        监听之后，再调用
    事假总线的概念
        要在 scroll 中拿到 goodListItem 图片什么时候加载完可不是容易的事情，因为它们是不同的组件，又没有直接的关联。
            在展示 img 的地方，绑定一个 @load 事件，这个事件的处理函数通过事件总线发送一个自定义事件
            事件总线 $bus 默认为空，我们在 main.js 中把 Vue 的原型中的 $bus 赋值为一个 Vue 实例，通过这个实例，在 scroll 中可以拿到发送的自定义事件，就可以监听 goodListItem 中图片加载
            在 goodListItem 组件本身可以通过 @load 监听图片什么时候加载
            在 Scroll 封装一个 refresh() 方法，在需要用的地方通过 $ref.scroll.refresh()

### 防抖函数的应用

    需要封装一个函数，这个桉树有两个参数，第一个参数是一个函数，这个函数就是需要做防抖函数的函数本身，第二个参数是时间
    debounce (function，delay) {
      let timer = null
      return function (...args) {
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
          func.apply(this,args)
        },delay)
      }
    }

### 上拉加载更多数据

    监听上拉事件，向外发送这个事件
    在 Home.vue 中监听这个事件，定义事件处理函数
    拿到需要具体加载哪一块的数据，调用 getHomeGoods(this.currentType) 函数
    在 getHomeGoods() 函数中拿到 this.$refs.scroll.finishPullUp() 这个方法，进行加载

### tabControl 的吸顶效果

1. 获取tabControl 的 offsetTop 属性值
    必须知道滚动多少时，开始有吸顶效果，通过 tabControl 的 offsetTop 属性我们可以获取到需要滚动多高
    所有的组件都有一个属性是 $el,这个属性用于获取组件中的元素
    如果直接在 mounted 中获取 tabControl 的 offsetTop 值是不正确的
    如何获取正确的值？
        监听 HomeSwiper 中 img 的加载完成，加载完成后发出事件，在 Home.vue 中获取正确的值
        为了不让 HomeSwiper 多次发出事件，可以使用 isLoad 进行状态记录
2. 监听滚动，改变 tabControl 的样式
    在最上面，多复制一个 PlaceHolderTabControl 组件对象，利用它来实现停留效果
    当用户滚动到一定的位置时，PlaceHolderTabControl 显示出来
    当用户没有滚动到一定位置时，PlaceHolderTabControl 隐藏起来

### 让 Hmoe 中内容保持原来的位置

    离开时，保存一个位置信息 saveY
    进来时，将位置设置为原来的位置 saveY 信息即可，最好回来时进行一次 refresh()

## 6. 详情页

### 根据 id 跳转详情页

    配置路由映射关系，这里需要用到动态路由，需要把 iid 传
    在 network 里封装有关详情页的网络请求方法
    拿到之前封装好的 NavBar 组件进一步使用在详情页
    拿到之前封装好的轮播图组件进一步使用在详情页
    之前为了保持状态使用了 keepalive，在keepalive 中 exclude="Detail"
我累了，一个头两个大。思维混乱，要学的东西很多，我还要继续学，

## 7. 购物车相关

封装详情页底部导航栏，给添加购物车组件定义一个自定义事件，发送给父组件，父组件监听

### vuex

    在 store 文件夹下新建 index.js 文件
    
