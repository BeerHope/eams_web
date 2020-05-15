<template>
  <div class="app-container common-list">
    <div class="filter-box m-t-20 m-b-20">
      <el-input
        placeholder="工厂名称"
        v-model.trim="filter.factoryName"
        class="filter-item"
        style="width: 200px;"
        clearable />
      <el-input
        placeholder="联系手机号"
        v-model.trim="filter.contactPhone"
        class="filter-item"
        style="width: 200px;"
        clearable />
      <el-select v-model="filter.state" placeholder="请选择状态"  class="filter-item" clearable>
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button type="primary" class="green-btn" icon="el-icon-search" @click="getUserList">搜索</el-button>
      <el-button type="primary" class="orange-btn" icon="el-icon-plus"  @click="addUser()">新增</el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      :header-cell-style="getRowClass"
      border
      fit
      highlight-current-row
      style="width: 100%;">
      <el-table-column prop="username" label="用户名" min-width="120px" align="center"></el-table-column>
      <el-table-column prop="contactPhone" label="联系手机号" min-width="120px" align="center"></el-table-column>
<!--      <el-table-column prop="factoryName" label="工厂名称" min-width="120px"  align="center"></el-table-column>-->
      <el-table-column prop="state" label="状态" width="120px"  align="center">
        <template slot-scope="scope">
          <span>{{scope.row.state|ShowState }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" min-width="120px" align="center"></el-table-column>
      <el-table-column label="操作" min-width="240px" align="center">
        <template slot-scope="scope">
          <span>
            <el-button type="primary" class="orange-btn" @click="details(scope.row)" size="mini">详情</el-button>
            <el-button type="danger" v-if="scope.row.state==1" @click="freeze(scope.row)" size="mini">冻结</el-button>
            <el-button type="primary" v-else class="green-btn"  @click="freeze(scope.row)" size="mini">激活</el-button>
            <!-- 管理员权限——重设密码权限 -->
            <el-button type="danger" @click="openResetPassDialog(true, scope.row.id)"  size="mini">重置密码</el-button>
          </span>
        </template>
      </el-table-column>
    </el-table>
    <!---分页--->
    <el-pagination
      v-show="total>0"
      class="common-pagination"
      @size-change="getUserList"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      :page-sizes="[10, 20, 30, 50]"
      :page-size.sync="filter.pageSize"
      @current-change="getUserList"
      :current-page.sync="filter.page"
    ></el-pagination>
    <DialogAddUser ref="addUser" @refresh="getUserList"></DialogAddUser>
    <DialogDetails ref="Details" :Details="Details"></DialogDetails>
    <DialogFreeze ref="Freeze" :cause="cause" @refresh="getUserList"></DialogFreeze>
    <reset-password ref="resetPass" @refresh="getUserList"></reset-password>
  </div>
</template>
<script>
  import DialogAddUser from './components/dialog_addUser' //新建用户模块
  import DialogDetails from './components/dialog_details' //详情
  import DialogFreeze from './components/dialog_freeze' // 冻结、激活
  import ResetPassword from './components/reset_password' //重置密码
  import {  SysUserDetails ,sysUserlist } from '@/api/user'
  import { mapGetters } from 'vuex'
  export default {
    name: 'report',
    components:{
      DialogAddUser,
      DialogDetails,
      DialogFreeze,
      ResetPassword
    },
    data() {
      return {
        value4:'',
        cause:{},
        Details:{},
        listLoading:true,
        totalRecord:1,
        filter:{
          page: 1,
          factoryCode:'',
          factoryName:'',
          contactPhone:'',
          state:'',
          pageSize: 20
        },
        total: 0,
        list:[],
        options: [
          {
            value: null,
            label: '全部状态'
          }, {
            value: '1',
            label: '激活'
          },{
            value: '2',
            label: '禁用'
          }
        ]
      }
    },
    filters:{
      ShowState(state){
        const Arr={1:'激活',2:'禁用'};
        return Arr[state];
      }
    },
    computed: {},
    created(){
      this.getUserList();
    },
    methods: {
      getRowClass({ row, column, rowIndex, columnIndex }) {
        if (rowIndex == 0) {
          return 'background:#EFEFEF'
        } else {
          return ''
        }
      },
      openResetPassDialog(dialogVisible, userId) {
        const resetPass = this.$refs.resetPass
        _.assign(resetPass, {
          dialogVisible,
          userId
        })
      },
      addUser(){
       this.$refs.addUser.dialogVisible=true
      },
      getUserList(){
        this.listLoading = true
        sysUserlist(this.filter).then(res=>{
          const resData = res.data.data
          this.list = resData.rows
          this.total = resData.totalRecord
          this.listLoading = false
        }).catch(err => {
          console.log(err, '用户列表')
          this.listLoading = false
        })
      },
      details(row){
        this.$refs.Details.dialogDetails=true;
        SysUserDetails(row.id).then(response=>{
          this.Details=response.data.data;
        })
      },
      freeze(row){ //冻结
        this.cause=row;
        this.$refs.Freeze.dialogFreeze=true;
        // this.flag = row.state

      }
    }
  }
</script>
