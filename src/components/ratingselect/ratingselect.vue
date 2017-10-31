<template>
  <div class="ratingselect">
    <div class="rating-type">
      <span @click="select(2, $event)" class="block positive" :class="{'active':raSelectType===2}">{{desc.all}}<span class="count">{{ ratings.length }}</span></span>
      <span @click="select(0, $event)" class="block positive" :class="{'active':raSelectType===0}">{{desc.positive}}<span class="count">{{ positives.length }}</span></span>
      <span @click="select(1, $event)" class="block negative" :class="{'active':raSelectType===1}">{{desc.negative}}<span class="count">{{ negatives.length }}</span></span>
    </div>
    <div @click="toggleContent" class="switch" :class="{'on':raOnlyContent}">
      <span class="icon-check_circle"></span>
      <span class="text">只看有评论的内容</span>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  const POSITIIVE = 0
  const NEGATIVE = 1
  const ALL = 2

  export default {
    props: {
      ratings: {
        type: Array,
        default () {
          return []
        }
      },
      selectType: {
        type: Number,
        default: ALL
      },
      onlyContent: {
        type: Boolean,
        default: false
      },
      desc: {
        type: Object,
        default () {
          return {
            all: '全部',
            positive: '满意',
            negative: '不满意'
          }
        }
      }
    },
    data () {
      return {
        raSelectType: this.selectType,
        raOnlyContent: this.onlyContent
      }
    },
    computed: {
      positives () {
        return this.ratings.filter((rating) => {
          return rating.rateType === POSITIIVE
        })
      },
      negatives () {
        return this.ratings.filter((rating) => {
          return rating.rateType === NEGATIVE
        })
      }
    },
    methods: {
      select (type, event) {
        if (!event._constructed) {
          return
        }
        // this.selectType = type
        // 原先使用上面这个方案，但是vue组件传递，担心污染父组件代码，所以使用本组建的一个DATA再次赋值，并且修改本组建的。
        this.raSelectType = type
        // emit是像父亲组件传值，在父组件中的子组件模版以自定义事件来定义@ratingtype-select="父组件需要执行的method方法"
        this.$emit('ratingtype-select', this.raSelectType)
      },
      toggleContent (event) {
        if (!event._constructed) {
          return
        }
        this.raOnlyContent = !this.raOnlyContent
        this.$emit('content-toggle', this.raOnlyContent)
      }
    }
  }
</script>
<style>
  .ratingselect {

  }
  .ratingselect .rating-type {
    padding: 18px 0;
    margin: 0 18px;
    border-bottom: 1px solid rgba(7, 17,27,0.1);
    font-size: 0;
  }
  .ratingselect .rating-type .block {
    display: inline-block;
    padding: 8px 12px;
    margin-right: 8px;
    border-radius: 1px;
    color: rgb(77,85,93);
    font-size: 12px; 
  }
  .ratingselect .rating-type .block.active {
    color: #fff;
  }
  .ratingselect .rating-type .block .count {
    font-size: 8px;
    margin-left: 2px;
    line-height: 16px;
  }
  .ratingselect .rating-type .block.positive {
    background-color: rgba(0,160,220,0.2);
  }
  .ratingselect .rating-type .block.positive.active {
    background-color: rgba(0, 160, 220, 1) 
  }
  .ratingselect .rating-type .block.negative {
    background-color: rgba(77,85,93,0.2);
  }
  .ratingselect .rating-type .block.negative.active {
    background-color: rgba(77,85,93,0, 1) 
  }
  .ratingselect .switch {
    padding: 12px 18px;
    line-height: 24px;
    border-bottom: 1px solid rgba(7,17,27,0.1);
    color: rgb(147,153,159);
  }
  .ratingselect .switch.on .icon-check_circle {
    background-color: #00c850;
  }
  .ratingselect .switch .icon-check_circle {
    display: inline-block;
    width: 10px;
    height: 10px;
    background-color: #333;
    margin-right: 4px;
    font-size: 24px;
  }
  .ratingselect .switch .text {
    display: inline-block;
    font-size: 12px;
  }
</style>
