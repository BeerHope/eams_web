<template>
  <div class="grid-content bg-purple">
    <h2>实时播报 </h2>
    <div class="total currentTime">
      <vue-seamless-scroll :data="listData" :class-option="classOption" class="warp">
        <ul class="item">

          <li v-for="item in listData">
            <div v-if="item.template != null" class="news">{{ item.sn }} {{ item.template }}</div>
            <div v-if="item.template == null" class="news">{{ item.sn }} 交易 {{ item.amount }} 元</div>
            <!--<div class="news"> {{item.sn}}</div>-->
            <!--<div class="news">{{item.playTime.substr(11)}}</div>-->

          </li>
        </ul>
      </vue-seamless-scroll>


    </div>

    <div class="lab_msg">
      <!--<el-row>-->
      <!--<el-col :span="12">昨日活跃设备:500台</el-col>-->
      <!--<el-col :span="12">设备总是：1000台</el-col>-->

      <!--</el-row>-->


    </div>


  </div>

</template>

<script>
  export default {
    name: 'currentTime',
    data() {
      return {
        // listData: [{
        //   'title': '无缝滚动第一行无缝滚动第一行',
        //   'date': '2017-12-16'
        // }, {
        //   'title': '无缝滚动第二行无缝滚动第二行',
        //   'date': '2017-12-16'
        // }, {
        //   'title': '无缝滚动第三行无缝滚动第三行',
        //   'date': '2017-12-16'
        // }, {
        //   'title': '无缝滚动第四行无缝滚动第四行',
        //   'date': '2017-12-16'
        // }, {
        //   'title': '无缝滚动第五行无缝滚动第五行',
        //   'date': '2017-12-16'
        // }, {
        //   'title': '无缝滚动第六行无缝滚动第六行',
        //   'date': '2017-12-16'
        // }, {
        //   'title': '无缝滚动第七行无缝滚动第七行',
        //   'date': '2017-12-16'
        // }, {
        //   'title': '无缝滚动第八行无缝滚动第八行',
        //   'date': '2017-12-16'
        // }, {
        //   'title': '无缝滚动第九行无缝滚动第九行',
        //   'date': '2017-12-16'
        // }]

      }

    },
    props: ['listData'],
    computed: {
      classOption: function() {
        return {
          step: 0.5,
          limitMoveNum: 5
        }
      }
    }
  }
</script>

<style scoped>
  .currentTime {
    height: 145px !important;
  }

  .warp {
    height: 200px;
    width: 100%;
    overflow: hidden;
  }

  .warp ul {
    list-style: none;
    padding: 0;
    margin: 0 auto;
  }

  .warp li {
    /*height: 30px;*/
    line-height: 30px;
    display: flex;
    justify-content: space-between;
    font-size: 15px;
  }

  .news:nth-child(1) {
    width: 95%;
    margin: 0 auto;
    text-align: left;
  }

  /*.news:nth-child(2){ width: 30%; float: left; text-align: left;}*/
  /*.news:nth-child(3){ width: 20%; float: left; text-align: left;}*/
</style>
