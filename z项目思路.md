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

    直接把 tabbar 的东西拿过来，配置 App 中的路有映射关系，点击能正常切换组件
    详情见 router/index.js 
