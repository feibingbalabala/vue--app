<template>
    <div class="goods">
        <div class="menu-wrapper" ref="menuWrapper">
            <ul>
                <li v-for="(item, index) in goods" class="menu-item" :class="{'current': currentIndex === index}" @click="selectMenu(index, $event)" :key="item.index">
                    <span class="text">
                        <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
                    </span>
                </li>
            </ul>
        </div>
        <div class="foods-wrapper" ref="foodsWrapper">
          <!-- 1.0获取DOM结构v-el:对象名称，必须使用中华线， 2.0中使用ref获取DOM对象，在js中使用$refs获取dom数组-->
          <ul>
              <!-- 这里有:key的绑定，异步更新时，他会只更新需列表中需要更新的项目， -->
            <li v-for="item in goods" class="item-list food-list-hook" :key="item.index">
              <h1 class="title">{{item.name}}</h1>
              <ul>
                <li v-for="food in item.foods" class="food-item" :key="food.index">
                  <div class="icon">
                    <img width="57" height="57" :src="food.icon" alt="">
                  </div>
                  <div class="content">
                    <h2 class="name">{{food.name}}</h2>
                    <p class="desc">{{food.description}}</p>
                    <div class="extra">
                      <span class="count">月售{{food.sellCount}}份</span>
                      <span>好评率{{food.rating}}%</span>
                    </div>
                    <div class="price">
                      <span class="now">￥{{food.price}}</span>
                      <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                    </div>
                    <div class="cartcontrol-wrapper">
                      <cartconcontrol :food="food"></cartconcontrol>
                    </div>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <shopcart :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>
    </div>
</template>
<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import shopcart from '../shopcart/shopcart'
  import cartconcontrol from '../cartconcontrol/cartconcontrol'

  const ERR_OK = 0
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        goods: [],
        listHeight: [],
        scrollY: 0
      }
    },
    computed: {
      currentIndex () {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i]
          let height2 = this.listHeight[i + 1]
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i
          }
        }
        return 0
      },
      selectFoods () {
        let foods = []
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              foods.push(food)
            }
          })
        })
        return foods
      }
    },
    created () {
      this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special']
      this.$http.get('/api/goods').then((response) => {
        response = response.body
        if (response.errno === ERR_OK) {
          this.goods = response.data
          this.$nextTick(() => {
            this._initScoll()
            this._calculateHeight()
          })
        //   console.log(this.goods)
        }
      })
    },
    methods: {
      selectMenu (index, event) {
        if (!event._constructed) {
          return
        }
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
        let el = foodList[index]
        this.foodScroll.scrollToElement(el, 300)
      },
      _initScoll () {
        this.menuScroll = new BScroll(this.$refs.menuWrapper, {
          click: true
        })
        this.foodScroll = new BScroll(this.$refs.foodsWrapper, {
          click: true,
          probeType: 3
        })
        this.foodScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y))
        })
      },
      _calculateHeight () {
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
        let height = 0
        this.listHeight.push(height)
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i]
          height += item.clientHeight
          this.listHeight.push(height)
        }
      }
    },
    components: {
      shopcart,
      cartconcontrol
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
  /* overflow-y: auto;
  overflow-x: hidden; */
}
.menu-wrapper .menu-item {
  display: table;
  height: 54px;
  width: 56px;
  line-height: 14px;
  padding: 0 12px;
  border-bottom: 1px solid rgba(7,17,27,0.1);
}
.menu-wrapper .menu-item.current {
  position: relative;
  z-index: 10;
  margin-top: -1px;
  background-color: #fff;
  font-weight: bold;
}
.menu-wrapper .menu-item.current .text {
  border: 0;
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
    /* overflow: auto; */
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
  position: relative;
}
.food-item .content .name {
  margin: 2px 0 8px 0;
  height: 14px;
  line-height: 14px;
  font-size: 14px;
  color: rgb(7,17,27);
}
.food-item .content .desc {
  margin-bottom: 8px;
  line-height: 12px;
  font-size: 10px;
  color: rgb(147,154,159);
}
.food-item .content .extra {
  line-height: 10px;
  font-size: 10px;
  color: rgb(147,154,159);
}
.food-item .content .extra .count {
  margin-right: 12px;
}
.food-item .content .price {
  font-weight: 700;
  line-height: 24px;
  font-size: 0;
}
.food-item .content .price .now {
  margin-right: 8px;
  font-size: 14px;
  color: rgb(240, 20, 20);
}
.food-item .content .price .old {
  text-decoration: line-through;
  font-size: 10px;
  color: rgb(147, 153, 159);
}
.food-item .content .cartcontrol-wrapper {
  position: absolute;
  right: 0;
  bottom: 12px;
}
</style>
