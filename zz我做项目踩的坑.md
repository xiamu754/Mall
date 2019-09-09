# 踩坑爬坑

## 1. 第一坑 配置路径别名

    今天是我第一天开始做项目，我兴致勃勃开始，然后，在配置完 vue.config.js 的时候，发现这个文件怎么都不起效果，经过了两个小时的删删改改，原来是 vue.config.js 这个文件必须放在根目录下，千万不要放到 src 下啊！！！
    vue-cli3 在创建项目的时候，是不创建这个文件的，需要手动创建，所以，创建的时候一定要看清目录啊！！！

## 2. 第二坑

    在首页请求数据的时候，使用 getHomeMultidata() 函数发送网络请求的时候，拿到 banners 的数据存储到 data 中时，我老是拿不到，在 Vue-devtoos 中一直 undefined，查看数据，发现
    this.banners = res.data.data.banner
    this.recommends = res.data.data.recommend
    得写两层 data 才能拿到数据

## 3. 第三坑

    在遍历轮播图的时候，一直报错：
    Custom elements in iteration require 'v-bind:key' directives.
    于是把 Eslint 语法检查关掉了
    ```文件 -> 首选项 -> 设置，搜索vetur.validation.template```
