<template>
  <div class="app-container common-list">
    <div class="filter-box m-b-20 m-t-20">
      <el-select class="filter-item" v-model="listQuery.customerId" placeholder="请选择客户">
        <el-option key="" label="全部客户" value=""></el-option>
        <el-option v-for="item in customerList"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-input
        placeholder="请输入设备编号"
        v-model.trim="listQuery.sn"
        class="filter-item"
        style="width: 200px;"
        clearable />
      <el-input
        placeholder="请输入注册批次号"
        v-model.trim="listQuery.batchNumber"
        class="filter-item"
        style="width: 200px;"
        clearable />
      <el-select class="filter-item" v-model="listQuery.deviceState" placeholder="请选择状态">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button type="primary" class="green-btn" icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <el-button class="orange-btn" type="primary" icon="el-icon-plus">新增</el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      border fit
      highlight-current-row
      style="width: 100%;">
      <el-table-column label="序号" min-width="100px" align="center">
        <template slot-scope="scope">
          <span> {{ scope.$index +1}}</span>
        </template>
      </el-table-column>
      <el-table-column  label="设备编号" min-width="120px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.sn }}</span>
        </template>
      </el-table-column>
      <el-table-column  label="设备型号" min-width="80px"  align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.deviceType }}</span>
        </template>
      </el-table-column>
      <el-table-column  label="注册批次号" min-width="140px"  align="center">
        <template slot-scope="scope">
          {{scope.row.batchNumber}}
        </template>
      </el-table-column>
      <el-table-column  label="归属客户" min-width="150px"  align="center">
        <template slot-scope="scope">
          <span >{{scope.row.customerName}}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" min-width="80px" align="center">
        <template slot-scope="scope">
         <span>{{scope.row.deviceState|ShowState}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="140px" align="center">
        <template slot-scope="scope">
         <span>
           <router-link :to="'/equipment/details/'+scope.row.id" class="link-type">
             <el-button type="warning" class="reg details" size="mini">详情</el-button>
           </router-link>
           <router-link :to="'/report/search/'+scope.row.sn" class="link-type">
           <el-button type="primary" size="mini" class="cannel">今日播报</el-button>
             </router-link>
         </span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-show="total>0"
      class="common-pagination"
      @size-change="getEquipmentList"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      :page-sizes="[10, 20, 30, 50]"
      :page-size.sync="filter.pageSize"
      @current-change="getEquipmentList"
      :current-page.sync="filter.page">
    </el-pagination>
    <dialog-import :type="type" :customerList="customerList" ref="doimport"></dialog-import>
  </div>
</template>

<script>
  import {GetUserAll} from '@/api/account'
  import  DialogImport from "./components/dialog_import"; //注册弹出层
  import {fetchList } from '@/api/equipment'
  import {mapGetters} from 'vuex'

  export default {
    name: 'equipment',
    components:{
      DialogImport
    },
    computed: {
      ...mapGetters([
        'roles',
        'usertype'
      ])
    },
    activated() {
      // window.location.reload()
    },
    data() {
      return {
        filter: {
          sn: '',
          page: 1,
          pageSize: 20
        },
        listLoading:true,
        total:1,
        type:null,
        customerList:[],
        listQuery:{
          page:1,
          pageSize:20,
          batchNumber:'',
          deviceState:'',
          customerId:'',
          sn:''
        },
        list:[],
        options: [{
          value: '',
          label: '全部状态'
        }, {
          value: 1,
          label: '在线'
        },{
          value: 2,
          label: '离线'
        },{
          value: 3,
          label: '待激活'
        },{
          value: 4,
          label: '注销'
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
        const Arr={ 1:'在线',2:'离线',3:'待激活',4:'注销'};
        return Arr[state];
      }
    },
    created(){
      this.GetUserAll();
      this.fetchList();
    },
    methods: {
      // 设备列表
      getEquipmentList() {

      },
      GetUserAll(){
        GetUserAll().then(response=>{
          this.customerList=response.data.data;
        })
      },
      Import(){
        this.type=1; //导入
        this.$refs['doimport'].fileList=[];
        this.$refs['doimport'].dialogImport=true;
        this.$refs['doimport'].reset();
      },
      Cancel(){  //批量注销
        this.type=2; //注销
        this.$refs['doimport'].fileList=[];
        this.$refs['doimport'].dialogImport=true;
        this.$refs['doimport'].reset();
      },
      fetchList(){
        fetchList(this.listQuery).then(response=>{
          this.listLoading=false;
          this.list=response.data.data.rows;
          this.totalRecord = response.data.data.totalRecord
        })
      },
      handleSizeChange(val) {
        this.listQuery.pageSize = val
        this.fetchList()
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.fetchList()
      },
      handleFilter() {
        this.listQuery.page = 1
        this.fetchList()
      }
    }
  }
</script>
<style scoped>
  .eq_search{
  }
 .reg{ background: #FCA84C !important; border-color:#FCA84C !important;   }
 .details{ margin-right: 8px;}
 .cannel{  background: #1DC9BB !important; border-color:  #1DC9BB !important; }
 .search1{ background: #1DC9BB !important;border-color:  #1DC9BB !important; }
</style>
