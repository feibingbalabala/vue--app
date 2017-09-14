<template>
    <div class="goods">
        <div class="menu-wrapper">
            <ul>
                <li v-for="item in goods">
                    <span class="text">
                        <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>
                    </span>{{item.name}}
                </li>
            </ul>
        </div>
        <div class="foods-wrapper"></div>
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
}
.goods .foods-wrapper {
    flex: 1;
}
</style>
