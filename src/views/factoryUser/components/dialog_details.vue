<template>
  <el-dialog custom-class="common-dialog" title="用户详情" :visible.sync="dialogDetails" width="50%">
    <div class="content">
      <div class="detail">
        <el-row>
          <el-col :md="12" :sm="24">
            <span>工厂编号：</span> 
            <span>{{Details.factoryCode}} </span>
          </el-col>
          <el-col :md="12" :sm="24">
            <span>工厂名称：</span>
            <span>{{Details.factoryName}}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :md="12" :sm="24">
            <span>联系人姓名：</span>
            <span>{{Details.contactName}}</span>
          </el-col>
          <el-col :md="12" :sm="24">
            <span>联系人手机号：</span>
            <span>{{Details.contactPhone}} </span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :md="12" :sm="24">
            <span>登陆账号：</span>
            <span>{{Details.username}}</span>
          </el-col>
          <el-col :md="12" :sm="24">
            <span>创建人：</span>
            <span>{{Details.createBy}} </span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :md="12" :sm="24">
            <span>状态：</span>
            <span>{{Details.state|ShowState}}</span>
          </el-col>
          <el-col :md="12" :sm="24">
            <span>更新时间:</span>
            <span>{{Details.updateTime}} </span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <span>状态描述：</span>
            <span>{{Details.stateDesc}} </span>
          </el-col>
        </el-row>
      </div>
    </div>
  </el-dialog>
</template>
<script>
  export default {
    name: "Details",
    props: {
      Details: {
        type: Object,
        default: null
      }
    },
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
    methods:{}
  }
</script>

<style scoped>
  .content{ width:80%; margin: 0 auto; line-height: 40px; margin-top: 0px;}
  .content .detail{ font-size: 14px;} 
</style>
