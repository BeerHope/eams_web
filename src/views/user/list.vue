<template>
  <div class="app-container common-list">
    <div class="filter-box m-t-20 m-b-20">
      <el-input
        placeholder="用户名/手机号/联系人"
        v-model.trim="filter.keyword"
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
      <el-button type="primary" class="purple-btn" icon="el-icon-search" @click="getUserList">搜索</el-button>
      <el-button type="primary" v-if="$checkBtnPermission('user.system.add')" class="blue-btn" icon="el-icon-plus"  @click="addUser()">新增</el-button>
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
      <el-table-column prop="contactName" label="联系人" min-width="120px" align="center"></el-table-column>
      <el-table-column prop="contactPhone" label="联系手机号" min-width="120px" align="center"></el-table-column>
      <el-table-column prop="roles" label="归属角色" min-width="120px" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.roles|ShowRoles}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="state" label="状态" width="120px"  align="center">
        <template slot-scope="scope">
          <span>{{scope.row.state|ShowState }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" min-width="150px" align="center"></el-table-column>
      <el-table-column label="操作" width="340px" align="center">
        <template slot-scope="scope">
          <span>
            <el-button type="primary" v-if="$checkBtnPermission('user.system.edit')" class="purple-btn" @click="updateUser(scope.row)" size="mini">编辑</el-button>
            <el-button type="primary" v-if="$checkBtnPermission('user.system.details')" class="orange-btn" @click="details(scope.row)" size="mini">详情</el-button>
            <template v-if="$checkBtnPermission('user.system.activate_freeze')">
              <el-button type="danger" v-if="scope.row.state==1" @click="freeze(scope.row)" size="mini">冻结</el-button>
              <el-button type="primary"  v-else class="purple-btn"  @click="freeze(scope.row)" size="mini">激活</el-button>
            </template>
            <el-button v-if="$checkBtnPermission('user.system.resetpassword')"  type="danger" @click="openResetPassDialog(true, scope.row.id)"  size="mini">重置密码</el-button>
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
    <DialogAddUser ref="addUser" @refresh="getUserList" :rolelist="rolelist"></DialogAddUser>
    <DialogDetails ref="Details" :Details="Details" :rolelist="rolelist"></DialogDetails>
    <DialogFreeze ref="Freeze" :cause="cause" @refresh="getUserList"></DialogFreeze>
    <reset-password ref="resetPass" @refresh="getUserList"></reset-password>
  </div>
</template>
<script>
  import DialogAddUser from './components/dialog_addUser' //新建用户模块
  import DialogDetails from './components/dialog_details' //详情
  import DialogFreeze from './components/dialog_freeze' // 冻结、激活
  import ResetPassword from './components/reset_password' //重置密码
  import {  SysUserDetails ,sysUserlist ,select4System } from '@/api/user'
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
          keyword:'',
          state:'',
          pageSize: 20
        },
        total: 0,
        list:[],
        rolelist:[],
        options: [
          {
            value: '',
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
      },
      ShowRoles(roles){
        var role=""
         roles.forEach(item=>{
            role=role+item+" 、"

         })

        return role.substring(0,role.length-1);
      }
    },
    computed: {},
    created(){
      this.select4System();
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
      //修改操作
      updateUser(row){
        this.$refs.addUser.dialogVisible=true
        this.$refs.addUser.action='update'
        SysUserDetails(row.id).then(response=>{
          const addUser = this.$refs.addUser
          const form=response.data.data;
           form.roles=response.data.data.roleIds;
          _.assign(addUser,{
            form:form
          })
        })
      },
      openResetPassDialog(dialogVisible, userId) {
        const resetPass = this.$refs.resetPass
        _.assign(resetPass, {
          dialogVisible,
          userId
        })
      },
      addUser(){
        const addUser=this.$refs.addUser
        _.assign(addUser,{
          dialogVisible:true,
          action:'add',
          form:{
            contactName:'',
            contactPhone:'',
            username:'',
            password: '',
            roles:[],
            username: '',
          }
        })
      },
      select4System(){
        select4System().then(response=>{
          this.rolelist=response.data.data;
        }).catch(() => {
          console.log('接口异常 select4System')
        })
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
          this.Details.roleName=""
          if(this.Details.roleIds.length>0){
            this.rolelist.forEach(item=>{
              if(_.indexOf( this.Details.roleIds, item.id)>-1){
                this.Details.roleName= this.Details.roleName+item.name+"、"
              }
            })
          }
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
