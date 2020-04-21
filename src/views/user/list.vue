<template>
  <div class="app-container common-list">
    <div class="filter-box m-t-20 m-b-20">
      <el-input
        placeholder="请输入客户编号"
        v-model.trim="filter.customerCode"
        class="filter-item"
        style="width: 200px;"
        clearable />
      <el-input
        placeholder="请输入客户名称"
        v-model.trim="filter.customerName"
        class="filter-item"
        style="width: 200px;"
        clearable />
      <el-input
        placeholder="请输入联系人手机号"
        v-model.trim="filter.contactPhone"
        class="filter-item"
        style="width: 200px;"
        clearable />
      <el-select v-model="filter.state" placeholder="请选择状态"  class="filter-item">
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
      <el-table-column  label="序号" min-width="50px" align="center">
        <template slot-scope="scope">
          <span> {{scope.$index + 1}} </span>
        </template>
      </el-table-column>
      <el-table-column  label="创建时间" min-width="120px" align="center">
        <template slot-scope="scope">
         {{ scope.row.createTime }}
        </template>
      </el-table-column>
      <el-table-column  label="客户编号" min-width="120px"  align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.customerCode }}</span>
        </template>
      </el-table-column>

      <el-table-column  label="客户名称" min-width="120px"  align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.customerName }}</span>
        </template>
      </el-table-column>
      <el-table-column  label="联系人手机号码" min-width="120px"  align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.contactPhone }}</span>
        </template>
      </el-table-column>

      <el-table-column  label="状态" width="100px"  align="center">
        <template slot-scope="scope">
          <span>{{scope.row.state|ShowState }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="240px" align="center">
        <template slot-scope="scope">
          <span>
            <el-button type="warning" class="reg" @click="details(scope.row)" size="mini">详情</el-button>
            <el-button type="danger" v-if="scope.row.state==1" @click="freeze(scope.row)" size="mini">冻结</el-button>
            <el-button type="danger" v-else class="activate"  @click="freeze(scope.row)" size="mini">激活</el-button>
            <el-button type="danger" @click="updatePass(scope.row)"  size="mini">重置密码</el-button>
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
    <DialogAddUser ref="addUser"></DialogAddUser>
    <DialogDetails ref="Details" :Details="Details"></DialogDetails>
    <DialogFreeze ref="Freeze" :cause="cause"></DialogFreeze>
  </div>
</template>

<script>
  import DialogAddUser from './components/dialog_addUser' //新建用户模块
  import DialogDetails from './components/dialog_details' //详情
  import DialogFreeze from './components/dialog_freeze'
  import {fetchList ,Details ,updatePass } from '@/api/account'
  export default {
    name: 'report',
    components:{
      DialogAddUser,
      DialogDetails,
      DialogFreeze
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
          customerCode:null,
          customerName:null,
          contactPhone:null,
          state:null,
          pageSize: 20
        },
        total: 32,
        list:[],
        options: [{
          value: null,
          label: '全部状态'
        }, {
          value: '1',
          label: '激活'
        },{
          value: '2',
          label: '禁用'
        }
        ],
        rules:{
          username: [
            { required: true, message: '请输入登录账号', trigger: 'blur' }
          ]
        },
      }
    },
    filters:{
      ShowState(state){
        const Arr={1:'激活',2:'禁用'};
        return Arr[state];
      }


    },
    created(){
      this.fetchList();
    },
    methods: {
      getUserList() {
        console.log('用户列表 ')
      },
      getRowClass({ row, column, rowIndex, columnIndex }) {
        if (rowIndex == 0) {
          return 'background:#EFEFEF'
        } else {
          return ''
        }
      },
      updatePass(row){ //重置密码

        this.$confirm('确定重置客户:'+row.customerName+' 登陆密码, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          updatePass({id:row.id}).then(response=>{

            this.$message({
              type: 'success',
              message: '重置密码成功!'
            });

          })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消重置密码！'
          });
        });



      },
      addUser(){
       this.$refs['addUser'].dialogAdduser=true
        this.$refs['addUser'].form={};
      },
      fetchList(){
        fetchList(this.filter).then(response=>{
          this.list = response.data.data.rows
          this.totalRecord = response.data.data.totalRecord
          this.listLoading = false
        })
      },
      handleSizeChange(val) {
        this.filter.pageSize = val
        this.fetchList()
      },
      handleCurrentChange(val) {
        this.filter.page = val
        this.fetchList()
      },
      handleFilter() {
        this.filter.page = 1
        this.fetchList()
      },
      details(row){
        this.$refs['Details'].dialogDetails=true;
        Details({id:row.id}).then(response=>{
          this.Details=response.data.data;

        })



      },
      freeze(row){ //冻结
        this.cause=row;
        this.$refs['Freeze'].dialogFreeze=true;
        this.$refs['Freeze'].form.stateDesc="";
      }
    }
  }
</script>

<style scoped>
  .eq_search{

  }
  .reg{ background: #FCA84C !important; border-color:#FCA84C !important;  }
  .cannel{  background: #1DC9BB !important; border-color:  #1DC9BB !important; }
  .search1{ background: #1DC9BB !important;border-color:  #1DC9BB !important; }
  .activate{      background: #1DC9BB !important; border-color: #1DC9BB !important;}
  .dateTime{ top:-4px;}
  .addBg{ background: #FCA84C !important; border-color: #FCA84C;}



</style>
