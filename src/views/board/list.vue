<template>
  <div class="app-container common-list">
    <div class="graph m-t-20">
      <div id="echart" :style="{width: '100%', height: '100%'}"></div>
    </div>
    <div class="table">
      <el-table
        v-loading="listLoading"
        :data="productionList"
        border
        fit
        highlight-current-row
        style="width: 100%;">
        <el-table-column prop="workOrderNumber" label="生产订单号" align="center"></el-table-column>
        <el-table-column prop="configCode" label="产品品名" align="center"></el-table-column>
        <el-table-column prop="quantity" label="预计产量" align="center"></el-table-column>
        <el-table-column prop="finishQuantity" label="产出量" align="center"></el-table-column>
        <el-table-column prop="onceSuccesses" label="一次合格数" align="center"></el-table-column>
        <el-table-column prop="throughRate" label="直通率" align="center"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import $echarts from 'echarts'
import {getProductionBoard} from '@/api/board'
export default {
  name: 'BoardList',
  components: {},
  props: {},
  directive: {},
  data() {
    return {
      listLoading: false,
      productionList: [],
      graphData: [],
      myChart: null,
      xAxis: [], // x轴
      series: [], // 多序列考虑存为数组
    }
  },
  computed: {},
  watch: {},
  created() {
  },
  beforeMount() {},
  mounted() {
    this.getProductionBoardData()
  },
  beforeDestroy() {},
  destroyed() {},
  methods: {
    getProductionBoardData() {
      getProductionBoard().then(res => {
        const resData = res.data.data
        this.productionList = resData.voList
        const seriesData = []
        const markPointData = []
        let index = -1
        _.forEach(resData.reportVO, (item, key) => {
          index = index + 1
          this.xAxis.push(key)
         /*  const temp = (item+1)*100*Math.random()
          seriesData.push(temp)
          markPointData.push({
            value: _.round(temp),
            xAxis: index,
            yAxis: _.ceil(temp)
          }) */
          seriesData.push(item)
          markPointData.push({
            value: _.round(item),
            xAxis: index,
            yAxis: _.ceil(item)
          })
        })
        this.series.push({
          name: '组装段',
          type: 'bar',
          data: seriesData,
          markPoint: {
            symbol: 'pin',
            data: markPointData
          }
        })
        this.drawGraph()
      }).catch(err => {
        console.log(err)
      })
    },
    drawGraph() {
      const echart = document.getElementById('echart')
      this.myChart = $echarts.init(echart)
      const option = {
        title: {
          text: '光明A01线今日产出参考图'
        },
        tooltip: {},
        legend: {
          right: 0,
          top: 40,
          data: ['组装段']
        },
        xAxis: {
          axisTick: {
            alignWithLabel: true
          },
          type:'category',
          data: this.xAxis
        },
        color: ['#6570E3'],
        yAxis: {},
        series: this.series
      }
      this.$nextTick(() => {
        this.myChart.setOption(option)
      })
    }
  }
}
</script>

<style lang='scss'>
.graph{
  width: 100%;
  height: 400px;
}
#echart{
  >div:first-child{
    position: relative;
    width: 100% !important;
    height: 100% !important;
    canvas{
      position: relative;
      width: 100% !important;
      height: 100% !important;
    }
  }
}
</style>
