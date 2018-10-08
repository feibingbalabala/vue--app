# vue实践

## 功能

* [ ] header公共组件
* [ ] 商品列表
* [ ] 商品详情
* [ ] 商家详情
* [ ] ratings(评分组件)
* [ ] fooder公共组件

## 技术

系统框架：vue + vue-router

构建工具：webpack + babel + vue-cli

数据交互：vue-resource

辅助：npm + git

## 项目初始化

npm instal --goabal vue-cli 全局安装cli脚手架。

npm init webpack vue-app

建立一个项目文件（生成一个vue-app的文件夹）,之后跳出的都直接回车。

cd vue-app 后执行 npm install 下载依赖

## 数据交互

数据只是请求根目录下一个data.json的文件。

## 采坑

### 对dom的获取

1.0获取DOM结构v-el:对象名称，必须使用中华线， 2.0中使用ref获取DOM对象，在js中使用$refs获取dom数组

### 封装的header组件

``` js
components: {
  // 这里要注意不要用header,这个是html的关键字，所以使用v作为组件的开头
  'v-header': header
}
```

### 遍历数组中需要绑定一个:key

这里有:key的绑定，异步更新时，他会只更新需列表中需要更新的项目，