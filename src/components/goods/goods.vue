<template>
    <div class="goods">
        <div class="menu-wrapper">
            <ul>
                <li v-for="item in goods" class="menu-item">
                    <span class="text">
                        <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
                    </span>
                </li>
            </ul>
        </div>
        <div class="foods-wrapper">
          <ul>
            <li v-for="item in goods" class="item-list">
              <h1 class="title">{{item.name}}</h1>
              <ul>
                <li v-for="food in item.foods" class="food-item">
                  <div class="icon">
                    <img width="57" height="57" :src="food.icon" alt="">
                  </div>
                  <div class="content">
                    <h2 class="name">{{food.name}}</h2>
                    <p class="desc">{{food.description}}</p>
                    <div class="extra">
                      <span>月售{{food.sellCount}}份</span>
                      <span>好评率{{food.rating}}%</span>
                    </div>
                    <div class="price">
                      <span>￥{{food.price}}</span>
                      <span v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                    </div>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
  const ERR_OK = 0
  export default {
    prop: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        goods: []
      }
    },
    created () {
      this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special']
      this.$http.get('/api/goods').then((response) => {
        response = response.body
        if (response.errno === ERR_OK) {
          this.goods = response.data
        //   console.log(this.goods)
        }
      })
    }
  }
</script>
<style>
.goods {
    display: flex;
    overflow: hidden;
    position: absolute;
    top: 176px;
    bottom: 46px;
    width: 100%;
}
.goods .menu-wrapper {
  flex: 0 0 80px;
  width: 80px;
  background-color: #f3f5f7;
  overflow-y: auto;
  overflow-x: hidden;
}
.menu-wrapper .menu-item {
  display: table;
  height: 54px;
  width: 56px;
  line-height: 14px;
  padding: 0 12px;
  border-bottom: 1px solid rgba(7,17,27,0.1);
}
.menu-item .icon {
  display: inline-block;
  width: 12px;
  height: 12px;
  margin-right: 2px;
  background-size: 12px 12px;
  background-repeat: no-repeat;
  vertical-align: top;
}
.menu-item .icon.decrease {
  background-image: url(../../common/images/decrease_3@2x.png);
}
.menu-item .icon.discount {
  background-image: url(../../common/images/discount_3@2x.png);
}
.menu-item .icon.guarantee {
  background-image: url(../../common/images/guarantee_3@2x.png);
}
.menu-item .icon.invoice {
  background-image: url(../../common/images/invoice_3@2x.png);
}
.menu-item .icon.special {
  background-image: url(../../common/images/special_3@2x.png);
}
.menu-item .text {
  font-size: 12px;
  width: 56px;
  display: table-cell;
  vertical-align: middle;
}
.goods .foods-wrapper {
    flex: 1;
    overflow: auto;
}
.foods-wrapper .title {
  padding-left: 14px;
  height: 26px;
  line-height: 26px;
  border-left: 2px solid #d9dde1;
  font-size: 12px;
  color: rgb(147,154,159);
  background: #f3f5f7;
  margin: 0;
}
.foods-wrapper .food-item{
  display: flex;
  margin: 0 18px;
  padding: 18px 0;
  border-bottom: 1px solid rgba(7,17,27,0.1);
}
.foods-wrapper .food-item:last-child {
  border: 0;
}
.food-item .icon {
  flex: 0 0 57px;
  margin-right: 10px;
}
.food-item .content {
  flex: 1;
}
.content .name {
  margin: 2px 0 8px 0;
  height: 14px;
  line-height: 14px;
  font-size: 14px;
  color: rgb(7,17,27);
}
</style>
