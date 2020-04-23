<template>
    <div :class="className" :style="{height:height,width:width}" />

</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'

export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chart: null,
      sidebarElm: null
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    }
  },
  mounted() {
    this.initChart()
    if (this.autoResize) {
      this.__resizeHandler = debounce(() => {
        if (this.chart) {
          this.chart.resize()
        }
      }, 100)
      window.addEventListener('resize', this.__resizeHandler)
    }

    // 监听侧边栏的变化
    this.sidebarElm = document.getElementsByClassName('sidebar-container')[0]
    this.sidebarElm && this.sidebarElm.addEventListener('transitionend', this.sidebarResizeHandler)
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    if (this.autoResize) {
      window.removeEventListener('resize', this.__resizeHandler)
    }

    this.sidebarElm && this.sidebarElm.removeEventListener('transitionend', this.sidebarResizeHandler)

    this.chart.dispose()
    this.chart = null
  },
  methods: {
    sidebarResizeHandler(e) {
      if (e.propertyName === 'width') {
        this.__resizeHandler()
      }
    },
    setOptions({ xData, yData ,xName } = {}) {
      this.chart.setOption({
        // title: {
        //   text: '最近30天分润'
        // },
        tooltip: {
          trigger: 'axis',
          borderColor: '#1DC9BB'
        },

        legend: {
          data: ['访问数量'],
          borderColor: '#1DC9BB',
          borderWidth:'2px',
          textStyle:{
             color:'#1DC9BB'
          }
        },
        toolbox: {
          show: false,
          feature: {
            mark: { show: true },
            magicType: { show: true, type: ['line', 'bar', 'stack', 'tiled'] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        calculable: true,
        grid: [{
          left: 10,
          right: 40,
          bottom: 10,
          top: 10,
          containLabel: true
        }],
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: xData,
            axisLine:{
              lineStyle:{
                color:'#1DC9BB'
              }
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: '#666666'
              }
            },



          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLine:{
              lineStyle:{
                color:'#1DC9BB'
              }
            },
            axisLabel: {
              formatter: '{value} '+xName,
              textStyle: {
                color: '#666666'
              }
            }
          }
        ],
        series: [
          {
            name: '数量',
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 7,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                  offset: 0,
                  color: '#1DC9BB'
                }, {
                  offset: 1,
                  color: '#1DC9BB'
                }]),
                borderWidth: 2,
                borderColor: '#1DC9BB'
                // shadowBlur: 6,
                // shadowOffsetX: 0,
                // shadowOffsetY: 0,
                // shadowColor: '#add3fd',
              },
              emphasis: {
                borderWidth: 4,
                borderColor: '#1DC9BB'
              }
            },

            lineStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: '#1DC9BB'
              }, {
                offset: 1,
                color: '#1DC9BB'
              }])
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                offset: 0,
                color: '#CEEDF4'
              }, {
                offset: 1,
                color: '#CEEDF4'
              }])
            },
            data: yData,
            animationDuration: 2800,
            animationEasing: 'quadraticOut'
          }
        ]
      })
    },
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions(this.chartData)
    }
  }
}

</script>
