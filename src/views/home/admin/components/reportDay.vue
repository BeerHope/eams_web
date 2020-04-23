<template>

  <div class="grid-content bg-purple">
    <h2>今日已播报 </h2>
    <div class="total" >
      <div class="box_icon reportImg">
        <svg-icon class="icon_horn"  icon-class="horn" />

      </div>

      <div class="box_total">
        <span>
          <countTo :startVal="ReportInfo.start" :endVal="ReportInfo.todayPlayAmount" :duration="ReportInfo.duration" > </countTo>

        </span> 笔





      </div>



    </div>

    <div class="lab_msg">
      <el-row>
        <el-col :span="12">昨天播报：{{ReportInfo.yesterdayPlayAmount}} 笔</el-col>
        <el-col :span="12">累计播报：{{ReportInfo.totalPlayAmount}} 笔</el-col>

      </el-row>


    </div>



  </div>

</template>

<script>
  import countTo from 'vue-count-to';
    export default {
        name: "reportDays",
      created(){
          // this.FlashTime();
      // this.endVal=this.ReportInfo.todayPlayAmount;
      },
      mounted(){

      },
      components:{ countTo },

      data() {
        return {
          chart: null,
          duration:5000,
          startVal:0,
          endVal:0
        }
      },
      props:['ReportInfo'],
      methods:{




      }
    }
</script>

<style scoped>
.icon_horn{}
  .reportImg{ margin-top:25px;}

.counter { background-color: #ffffff; padding: 20px 0; border-radius: 5px;}
.count-title { font-size: 40px; font-weight: normal;  margin-top: 10px; margin-bottom: 0; text-align: center; }
.count-text { font-size: 13px; font-weight: normal;  margin-top: 10px; margin-bottom: 0; text-align: center; }
.fa-2x { margin: 0 auto; float: none; display: table; color: #4ad1e5; }


</style>
