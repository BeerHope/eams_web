<template>

  <div :class="className" :style="{height:height,width:width}"/>


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
        default: '95%'
      },
      height: {
        type: String,
        default: '200px'
      },
      chartData: {
        type: Object,
        required: true
      },
      autoResize: {
        type: Boolean,
        default: true
      },
    },
    data() {
      return {
        chart: null
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
      this.initChart();
      if (this.autoResize) {
        this.__resizeHandler = debounce(() => {
          if (this.chart) {
            this.chart.resize()
          }
        }, 100);

      }

      window.addEventListener('resize', this.__resizeHandler);
    },
    beforeDestroy() {
      if (!this.chart) {
        return
      }
      window.removeEventListener('resize', this.__resizeHandler);
      this.chart.dispose();
      this.chart = null;
    },
    methods: {
      setOptions({ xData, yData } = {}) {
        this.chart.setOption({
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            right: '0',
            top: '0',
            orient: 'vertical',
            data: xData
          },
          calculable: true,
          series: [
            {
              name: 'WEEKLY WRITE ARTICLES',
              type: 'pie',
              roseType: 'radius',
              radius: [15, 65],
              center: ['45%', '45%'],
              data: yData,
              animationEasing: 'cubicInOut',
              animationDuration: 2600
            }
          ]
        });
      },
      initChart() {
        this.chart = echarts.init(this.$el, 'macarons');
        this.setOptions(this.chartData);
      }
    }
  }
</script>
