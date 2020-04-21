<template>
  <div>
    <el-dialog title="详情" :visible.sync="dialogDetails" class="contents">

      <div class="content">

        <div  class="detail">
          <el-row>
            <el-col :span="12"><div class="grid-content bg-purple">客户编号： <span>{{Details.customerCode}} </span></div></el-col>
            <el-col :span="12"><div class="grid-content bg-purple-light">客户名称：<span>{{Details.customerName}}</span></div></el-col>
          </el-row>
          <el-row>
            <el-col :span="12"><div class="grid-content bg-purple">联系人姓名：<span>{{Details.contactName}} </span></div></el-col>
            <el-col :span="12"><div class="grid-content bg-purple-light">联系人手机号：<span>{{Details.contactPhone}} </span></div></el-col>
          </el-row>
          <el-row>
            <el-col :span="12"><div class="grid-content bg-purple">登录账号：<span>{{Details.username}} </span></div></el-col>
            <el-col :span="12"><div class="grid-content bg-purple-light">创建人：<span>{{Details.createBy}} </span></div></el-col>
          </el-row>

          <el-row>
            <el-col :span="12"><div class="grid-content bg-purple">状态：<span>{{Details.state|ShowState}} </span></div></el-col>
            <el-col :span="12"><div class="grid-content bg-purple-light">状态更新时间：<span>{{Details.updateTime}}</span></div></el-col>
          </el-row>
          <el-row>
            <el-col :span="24"><div class="grid-content bg-purple">状态描述：<span>{{Details.stateDesc}} </span></div></el-col>
          </el-row>
        </div>


      </div>

    </el-dialog>


  </div>


</template>

<script>
  export default {
    name: "Details",
    props:['Details'],
    data(){
      return{
        dialogDetails:false
      }
    },
    filters:{
      ShowState(state){
        const Arr={1:'激活',2:'禁用'};
         return Arr[state];

      }


    },
    methods:{



    }

  }
</script>

<style scoped>
  .contents{ width: 80%; margin: 0 auto;}
  .content{ width:80%; margin: 0 auto; line-height: 40px; margin-top: 0px;}
  .content h3{ color: #FCA84C; font-size: 16px; line-height: 25px; font-family: MicrosoftYaHei;}
  .content .detail{ font-size: 14px;}
</style>
