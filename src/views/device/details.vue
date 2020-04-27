<template>
  <div class="app-container">
     <div class="search_filter" v-if="testSwitch==1">
       <el-button type="primary" class="box1" @click="flush()" size="small">
         <svg-icon class="btn-icon" icon-class="flush_icon" />刷新</el-button>
       <el-button type="primary" class="box1" @click="broadcast()" size="small"><svg-icon class="btn-icon" icon-class="horn_icon" />播报测试</el-button>
       <!--<el-button type="primary" class="box2 " size="small"><svg-icon class="btn-icon" icon-class="flush_icon" />重启设备</el-button>-->
     </div>
    <div class="content">
       <h3>设备基本信息</h3>
       <div  class="detail">
         <el-row>
           <el-col :span="12"><div class="grid-content bg-purple">设备编号: {{details.sn}}</div></el-col>
           <el-col :span="12" v-if="userType!=3"><div class="grid-content bg-purple-light">最后签到时间:{{details.lastCheckInTime}}</div></el-col>
         </el-row>
         <el-row>
           <el-col :span="12"><div class="grid-content bg-purple">注册时间:{{details.createTime}}</div></el-col>
           <el-col :span="12"><div class="grid-content bg-purple-light">设备激活时间:{{details.activationTime}}</div></el-col>
         </el-row>
       </div>
      <h3>运行信息</h3>
      <div  class="detail bgbg">
        <json-viewer :value="terminalInfo"  :expand-depth=10 class="bgbg"></json-viewer>
      </div>
    </div>
  </div>
</template>
<script>
  import {Details ,Broadcast ,flushInfo,getInfo } from '@/api/equipment'
  import {mapGetters} from 'vuex'
  export default {
    name: "equipment_details",
    data(){
      return{
        time:false,
        dialogDetails:true,
        id:null,
        num:0,
        details:{

        },
        testSwitch:2,
        info:{},
        terminalInfo:{},
        dialogImport:false
      }
    },
    destroyed(){
      let that=this;
      clearInterval(that.time);
    },
    created(){
      this.id=this.$route.params && this.$route.params.id
      this.GetDetail();
    },
    computed: {
      ...mapGetters([
        'roles',
        'userType'
      ])
    },
    methods:{
       GetDetail(){
         console.log(this.id);
         Details({id:this.id}).then(response=>{
          this.details=response.data.data;
          this.testSwitch=response.data.data.testSwitch;
          if(response.data.data.terminalInfo==null){
            this.terminalInfo={};
          }else{
            this.terminalInfo= eval("(" + response.data.data.terminalInfo+")");
          }
          // console.log(this.details)
         })
       },
      broadcast(){
        this.$confirm('是否发送播报消息？消息内容：测试播报100元', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          Broadcast({id:this.id}).then(response=>{
            this.$notify({
              title: '成功',
              message:  '操作成功！',
              type: 'success',
              duration: 2000
            });
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      flush(){
        clearInterval(this.time);
        flushInfo({id:this.id}).then(response=>{
          this.time = setInterval(() => { this.GetInfo() }, 5000)
          this.num=0;
        })
        // this.$nextTick(() => {
        //   window.location.reload()
        // })
      },
      GetInfo(){
        getInfo({id:this.id}).then(response=>{
          if(this.num>3&&response.data.data==null){
            clearInterval(this.time);
            this.$notify({
              title: '提示',
              message:  '获取信息失败,请稍后重试！',
              type: 'error',
              duration: 2000
            });
          }
          if(response.data.data!=null){
            clearInterval(this.time);
            this.$notify({
              title: '成功',
              message:  '刷新成功！',
              type: 'success',
              duration: 2000
            });
            this.info=response.data.data;
            this.terminalInfo= eval("(" +  response.data.data.terminalInfo + ")");
          }else{
            this.num++;
          }
        })
      }

    }

  }
</script>

<style scoped>
 .search_filter{  width: 185px; float: right;}
  .search_filter .box1{ background: #1DC9BB; border-color: #1DC9BB;}
 .search_filter .box2{ background: #FCA84C; border-color: #FCA84C;}
  .content{ width: 600px; margin: 0 auto; line-height: 40px; margin-top: 100px;}
  .content h3{ color: #FCA84C; font-size: 16px; line-height: 25px; font-family: MicrosoftYaHei;}
  .content .detail{ font-size: 14px;}
  .detail .status{ color: #1DC9BB;}
  .bgbg{ background:#fdfdde !important; }
</style>
