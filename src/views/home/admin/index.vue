<template>
  <div class="dashboard-editor-container app-container Mains">
    首页
    <div v-if="false" class="header">
      <el-row>
        <el-col :span="8">
          <ReportDay :ReportInfo="ReportInfo"></ReportDay>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple" style="padding-bottom: 0px;">
            <h2>今日活跃设备 </h2>
            <div class="area">
              <ActiveDay :chart-data="pieChartData"></ActiveDay>
              <div class="lab_msg activeMsg">
                <el-row>
                  <el-col :span="8">昨天活跃：{{yesterdayActiveAmount}}</el-col>
                  <el-col :span="8">今日活跃：{{todayActiveAmount}}</el-col>
                  <el-col :span="8">设备总数：{{totalDeviceAmount}}</el-col>
                </el-row>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <CurrentTime :listData="listData"></CurrentTime>
        </el-col>
      </el-row>


    </div>
    <div v-if="false" class="DataLine">
      <div class="Line">
        <h2 class="Line_title"> 统计</h2>
        <div class="Line_right">
          <el-button type="primary" @click="SwitchStatics(1)" v-waves :class="active==1?'active':'normal'">最近14天播报情况
          </el-button>
          <el-button type="primary" @click="SwitchStatics(2)" v-waves :class="active==2?'active':'normal'">最近14天活跃设备情况
          </el-button>
        </div>
      </div>
      <LineChart :chart-data="lineChartData"></LineChart>
    </div>
  </div>
</template>

<script>
  import ActiveDay from './components/activeDay'
  import ReportDay from './components/reportDay'
  import CurrentTime from './components/currentTime'
  import LineChart from './components/LineChart'
  import { statistics, LineStatistics, carousel } from '@/api/account'

  import waves from '@/directive/waves' // 水波纹指令
  export default {
    name: 'DashboardEditor',
    directives: {
      waves
    },
    data() {
      return {
        active: 1,
        listData: [],
        broadcastDayCountVO: {},
        yesterdayActiveAmount: 0,
        totalDeviceAmount: 0,
        todayActiveAmount: 0,
        activeMachineDayCountVO: {},
        time: false,
        record: {},
        ReportInfo: {},
        ActiceData: {},
        lineChartData: {},
        pieChartData: {
          xData: ['今日不活跃设备', '今日活跃设备'],
          yData: []
        }

      }
    },
    filters: {},
    activated() {
      window.location.reload()
    },
    components: {
      ReportDay,
      LineChart,
      CurrentTime,
      ActiveDay
    },
    computed: {},
    methods: {
      fetchHomePageData(flag) {
        statistics().then(response => {
          const data = response.data.data
          if (flag == 'start') {
            this.ReportInfo = {
              start: this.ReportInfo.todayPlayAmount,
              duration: 2000,
              todayPlayAmount: data.todayPlayAmount,
              yesterdayPlayAmount: data.yesterdayPlayAmount,
              totalPlayAmount: data.totalPlayAmount
            }
          } else {
            this.ReportInfo = {
              start: 0,
              duration: 5000,
              todayPlayAmount: data.todayPlayAmount,
              yesterdayPlayAmount: data.yesterdayPlayAmount,
              totalPlayAmount: data.totalPlayAmount
            }
          }
          // this.ActiceData={totalDeviceAmount:data.totalDeviceAmount,todayActiveAmount:data.todayActiveAmount};
          //  this.pieChartData.yData=[  {value: 100, name: '设备总数'},  {value: 20, name: '今日活跃设备'}];
          // this.$forceUpdate()
          this.todayActiveAmount = data.todayActiveAmount
          this.yesterdayActiveAmount = data.yesterdayActiveAmount
          this.totalDeviceAmount = data.totalDeviceAmount
          this.$set(this.pieChartData, 'yData', [{
            value: data.totalDeviceAmount - data.todayActiveAmount,
            name: '今日不活跃设备'
          }, { value: data.todayActiveAmount, name: '今日活跃设备' }])
          //this.$delete(this.pieChartData, yData)
        })
      },
      SwitchStatics(flag) { //切换统计
        this.active = flag
        if (flag == 1) {
          this.$set(this.lineChartData, 'yData', this.broadcastDayCountVO.ydata)
          this.$set(this.lineChartData, 'xData', this.broadcastDayCountVO.xdata)
          this.$set(this.lineChartData, 'xName', '条')
        } else {
          this.$set(this.lineChartData, 'yData', this.activeMachineDayCountVO.ydata)
          this.$set(this.lineChartData, 'xData', this.activeMachineDayCountVO.xdata)
          this.$set(this.lineChartData, 'xName', '台')
        }
      },
      Statistics() {
        LineStatistics().then(response => {
          this.broadcastDayCountVO = response.data.data.broadcastDayCountVO
          this.activeMachineDayCountVO = response.data.data.activeMachineDayCountVO
          this.$set(this.lineChartData, 'yData', response.data.data.broadcastDayCountVO.ydata)
          this.$set(this.lineChartData, 'xData', response.data.data.broadcastDayCountVO.xdata)
          this.$set(this.lineChartData, 'xName', '条')
        })
      },
      Getcarousel() {
        carousel().then(response => {
          // this.listData=response.data.data;
          if (response.data.data == null) {
            this.listData = []
            this.listData.push({ 'template': '暂无播报记录！' })
          } else {
            this.listData = response.data.data
          }
        })
      }
    },
    destroyed() {
      let that = this
      clearInterval(that.time)
    },
    created() {
      this.Getcarousel()
      this.time = setInterval(() => {
        this.Getcarousel()
        this.fetchHomePageData('start')
      }, 8000)
      this.fetchHomePageData()
      this.Statistics()
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  .Mains {
    background: #F0F1F4;
  }

  .icon_horn {
    font-size: 130px;
  }

  .box_icon {
    width: 50%;
    float: left;
    text-align: center;
  }

  .box_total span {
    font-weight: bold;
    font-size: 30px;
  }

  .box_total {
    width: 50%;
    float: right;
    padding-top: 50px;
  }

  .header h2 {
    font-size: 18px;
    font-weight: normal;
    border-left: 7px solid #FCA94D;
    padding-left: 5px;
  }

  .header .lab_msg {
    clear: both;
    margin-top: 77px;
    text-align: center;
  }

  .header .total {
    height: 127px;
  }

  /*.app-container{ background: white;}*/
  .grid-content {
    background: white !important;
    padding: 15px;
    margin-right: 25px;
  }

  .DataLine {
    margin-top: 20px;
    background: white;
    padding: 15px;
  }

  .DataLine h2 {
    font-size: 18px;
    font-weight: normal;
    border-left: 7px solid #FCA94D;
    padding-left: 5px;
  }

  .Line_title {
    width: 200px;
    float: left;
  }

  .Line {
    height: 50px;
  }

  .Line_right {
    width: 400px;
    float: right;
  }

  .Line_right .active {
    background: #1DC9BB;
    border-color: #1DC9BB;
  }

  .Line_right .normal {
    background: white;
    border-color: #1DC9BB;
    color: #1DC9BB;
  }

  .activeMsg {
    margin-top: 2px !important;
    height: 35px;
  }
</style>
