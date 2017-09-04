<template>
  <div class="star" :class="starType">
    <span v-for="itemClass in itemClasses" :class="itemClass" class="star-item"></span>
  </div>
</template>
<script type="text/ecmascript-6">
  const LENGTH = 5
  const CLS_ON = 'on'
  const CLS_HALF = 'half'
  const CLS_OFF = 'off'

  export default {
    props: {
      size: {
        type: Number
      },
      score: {
        type: Number
      }
    },
    computed: {
      starType () {
        return 'star-' + this.size
      },
      itemClasses () {
        let result = []
        let score = Math.floor(this.score * 2) / 2
        let hasDecimal = score % 1 !== 0
        let integer = Math.floor(score)
        for (let i = 0; i < integer; i++) {
          result.push(CLS_ON)
        }
        if (hasDecimal) {
          result.push(CLS_HALF)
        }
        while (result.length < LENGTH) {
          result.push(CLS_OFF)
        }
        return result
      }
    }
  }
</script>
<style type="text/css">
  .star {
    font-size: 0;
  }
  .star .star-item {
    display: inline-block;
    background-repeat: no-repeat
  }
  .star-item:last-child {
    margin: 0;
  }
  .star.star-48 .star-item {
    width: 20px;
    height: 20px;
    margin: 0 22px 0 0;
    background-size: 20px 20px;
  }
  .star-48 .star-item.on {
     background-image: url(../../common/images/star48_on@2x.png);
  }
  .star-48 .star-item.haif {
     background-image: url(../../common/images/star48_half@2x.png);
  }
  .star-48 .star-item.off {
     background-image: url(../../common/images/star48_off@2x.png);
  }
  .star.star-36 .star-item {
    width: 15px;
    height: 15px;
    margin: 0 6px 0 0;
    background-size: 15px 15px;
  }
  .star-36 .star-item.on {
     background-image: url(../../common/images/star36_on@2x.png);
  }
  .star-36 .star-item.haif {
     background-image: url(../../common/images/star36_half@2x.png);
  }
  .star-36 .star-item.off {
     background-image: url(../../common/images/star36_off@2x.png);
  }
  .star.star-24 .star-item {
    width: 10px;
    height: 10px;
    margin: 0 3px 0 0;
    background-size: 10px 10px;
  }
  .star-24 .star-item.on {
     background-image: url(../../common/images/star24_on@2x.png);
  }
  .star-24 .star-item.haif {
     background-image: url(../../common/images/star24_half@2x.png);
  }
  .star-24 .star-item.off {
     background-image: url(../../common/images/star24_off@2x.png);
  }
</style>

