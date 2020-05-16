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
        placeholder="用户名"
        v-model.trim="filter.username"
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
      <el-button v-if="$checkBtnPermission('user.factotry.add')" type="primary" class="orange-btn" icon="el-icon-plus"  @click="openUserDialog(true, -1)">新增</el-button>
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
      <el-table-column prop="roles" label="归属角色" min-width="120px" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.roles.join('、')}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="factoryName" label="归属工厂" min-width="120px"  align="center">
      </el-table-column>
      <el-table-column prop="state" label="状态" width="120px"  align="center">
        <template slot-scope="scope">
          <span>{{scope.row.state|ShowState }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" min-width="120px" align="center"></el-table-column>
      <el-table-column label="操作" min-width="240px" align="center">
        <template slot-scope="scope">
          <el-button v-if="$checkBtnPermission('user.factotry.edit')" type="primary" class="green-btn" @click="openUserDialog(true, scope.row.id)" size="mini">编辑</el-button>
          <el-button v-if="$checkBtnPermission('user.factotry.details')" type="primary" class="orange-btn" @click="details(scope.row)" size="mini">详情</el-button>
          <el-button v-if="scope.row.state==1 && $checkBtnPermission('user.factotry.activate_freeze')" type="danger" @click="freeze(scope.row)" size="mini">冻结</el-button>
          <el-button v-if="scope.row.state==2 && $checkBtnPermission('user.factotry.activate_freeze')" type="primary"  class="green-btn"  @click="freeze(scope.row)" size="mini">激活</el-button>
          <el-button v-if="$checkBtnPermission('user.factotry.resetpassword')" type="danger" @click="openResetPassDialog(true, scope.row.id)"  size="mini">重置密码</el-button>
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
    <!-- <DialogAddUser ref="addUser" @refresh="getUserList"></DialogAddUser> -->
    <user-dialog ref="userDialog" @refresh="getUserList"></user-dialog>
    <DialogDetails ref="Details" :Details="Details"></DialogDetails>
    <DialogFreeze ref="Freeze" :cause="cause" @refresh="getUserList"></DialogFreeze>
    <reset-password ref="resetPass" @refresh="getUserList"></reset-password>
  </div>
</template>
<script>
  import UserDialog from './components/UserDialog' //新建用户模块
  import DialogDetails from './components/dialog_details' //详情
  import DialogFreeze from './components/dialog_freeze' // 冻结、激活
  import ResetPassword from './components/reset_password' //重置密码
  import { getUserList, getUserDetails, updateUser } from '@/api/user'
  import { getFactoryRoles } from '@/api/role'
  import { mapGetters } from 'vuex'
  export default {
    name: 'report',
    components:{
      UserDialog,
      DialogDetails,
      DialogFreeze,
      ResetPassword
    },
    data() {
      return {
        cause:{},
        Details:{},
        listLoading:true,
        totalRecord:1,
        factoryRoles: [],
        filter:{
          factoryName:'',
          username:'',
          state:'',
          page: 1,
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
      this.getFactoryRoles();
      this.getUserList();
    },
    methods: {
      getFactoryRoles() {
        getFactoryRoles().then(res => {
          this.factoryRoles = res.data.data
        })
      },
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
      /* flagId:标识(-1:新增, !-1: 编辑) */
      openUserDialog(dialogVisible, userId){
        const userDialog = this.$refs.userDialog
        _.assign(userDialog, {
          dialogVisible,
          userId
        })
      },
      getUserList(){
        this.listLoading = true
        getUserList(this.filter).then(res=>{
          const resData = res.data.data
          this.list = resData.rows
          this.total = resData.totalRecord
          this.listLoading = false
        }).catch(err => {
          this.listLoading = false
        })
      },
      details(row){
        this.$refs.Details.dialogDetails=true;
        getUserDetails(row.id).then(response=>{
          this.Details=response.data.data;
          this.Details.roles = this.convertRolesName(this.Details.roles)
          console.log(this.Details.roles, 'this.Details.roles!!!')
        })
      },
      freeze(row){ //冻结
        this.cause=row;
        this.$refs.Freeze.dialogFreeze=true;
      },
      /* 转换角色 */
      convertRolesName(roleIds) {
        let roleNames = ''
         _.forEach(this.factoryRoles, (item, index) => {
          if (_.includes(roleIds, item.id)) {
            if (index === this.factoryRoles.length -1) {
              roleNames += item.name
            } else {
              roleNames += `${item.name}|`
            }
          }
        })
        return roleNames
      }
    }
  }
</script>
