# VUE项目的实践

> 自己的第一个VUE项目，VUE的版本为2.0，项目是根据网上的教学资料的，不过教学资料是1.0的，其中在2.0被删除或者替换的方法均已用2.0的方式来实现。
> 虽说还是很多不明白，但是只是是一个实践。

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

#搭建小型的服务器并把打包后的文件浏览出来(这里自行搭建了一个小型的服务器，配置在跟目录的prod.server.js)
node prod.server.js

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
