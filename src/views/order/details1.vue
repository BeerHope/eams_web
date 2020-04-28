<template>
  <div class="work-order-details">
    <el-card class="order-card">
      <h4 class="title">
        <span class="desc">订单详情</span>
        <span v-if="false" class="edit" @click="isEditable = true"><i class="el-icon-edit m-r-6"></i>编辑</span>
      </h4>
      <el-form label-width="130px" ref="form" :model="formData" :rules="rules">
        <el-row>
          <el-col :md="8" :sm="12">
            <el-form-item label="工单单号:" prop="workOrderNumber">
              <span v-if="!isEditable">{{formData.workOrderNumber}}</span>
              <el-input v-else v-model="formData.workOrderNumber" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="8" :sm="12">
            <el-form-item label="开单日期:" prop="orderCreateDate">
              <span v-if="!isEditable">{{formData.orderCreateDate}}</span>
              <el-date-picker
                v-else
                v-model="formData.orderCreateDate"
                type="datetime">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :md="8" :sm="12">
            <el-form-item label="工单状态:" prop="orderState">
              <span v-if="!isEditable">{{formData.orderState}}</span>
              <el-select v-else v-model="formData.orderState" clearable disabled>
                <el-option
                  v-for="item in orderStates" 
                  :key="item.value" :value="item.value" 
                  :label="item.label">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :md="8" :sm="12">
            <el-form-item label="出货单号:" prop="deliveryOrderNumber">
              <span v-if="!isEditable">{{formData.deliveryOrderNumber}}</span>
              <el-input v-else v-model="formData.deliveryOrderNumber" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="8" :sm="12">
            <el-form-item label="P0号:" prop="p0">
              <span v-if="!isEditable">{{formData.p0Number}}</span>
              <el-input v-else v-model="formData.p0Number" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="8" :sm="12">
            <el-form-item label="数量:" prop="quantity">
              <span v-if="!isEditable">{{formData.quantity}}</span>
              <el-input-number v-else v-model="formData.quantity" :min="1"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :md="8" :sm="12">
            <el-form-item label="产品代码:">
              <span v-if="!isEditable">{{formData.productCode}}</span>
              <el-input v-else v-model="formData.productCode" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="8" :sm="12">
            <el-form-item label="产品规格:">
              <span v-if="!isEditable">{{formData.productSpec}}</span>
              <el-input v-else v-model="formData.productSpec" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="8" :sm="12">
            <el-form-item label="配置码:">
              <span v-if="!isEditable">{{formData.configCode}}</span>
              <el-input v-else v-model="formData.configCode" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="8" :sm="12">
            <el-form-item label="标识:">
              <span v-if="!isEditable">{{formData.processIdentity}}</span>
              <el-input v-else v-model="formData.processIdentity" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="8" :sm="12">
            <el-form-item label="应用程序:" prop="appBom">
              <span v-if="!isEditable">{{formData.appBom}}</span>
              <el-input v-else v-model="formData.appBom" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="8" :sm="12">
            <el-form-item label="内核版本:">
              <span v-if="!isEditable">{{formData.kernelBom}}</span>
              <el-input v-else v-model="formData.kernelBom" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="8" :sm="12">
            <el-form-item label="客户名称:">
              <span v-if="!isEditable">{{formData.customerName}}</span>
              <el-input v-else v-model="formData.customerName" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="8" :sm="12">
            <el-form-item label="发货时间:">
              <span v-if="!isEditable">{{formData.deliveryDate}}</span>
              <el-input v-else v-model="formData.deliveryDate" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="8" :sm="12">
            <el-form-item label="收货方:">
              <span v-if="!isEditable">{{formData.consignee}}</span>
              <el-input v-else v-model="formData.consignee" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="8" :sm="12">
            <el-form-item label="发货地址:">
              <span v-if="!isEditable">{{formData.consigneeAddress}}</span>
              <el-input v-else v-model="formData.consigneeAddress" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="8" :sm="12">
            <el-form-item label="应用程序路径:">
              <span v-if="!isEditable">{{formData.appUrl}}</span>
              <el-input v-else v-model="formData.appUrl" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="8" :sm="12">
            <el-form-item label="外协厂标识:" prop="factoryId">
              <span v-if="!isEditable">{{formData.factoryId}}</span>
              <el-select v-else v-model="formData.factoryId" clearable>
                <el-option 
                  v-for="item in factoryList" :key="item.value" 
                  :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :md="8" :sm="12">
            <el-form-item label="产品SN 起:" prop="snBegin">
              <span v-if="!isEditable">{{formData.snBegin}}</span>
              <el-input v-else v-model="formData.snBegin" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="8" :sm="12">
            <el-form-item label="产品SN 止:" prop="snEnd">
              <span v-if="!isEditable">{{formData.snEnd}}</span>
              <el-input v-else v-model="formData.snEnd" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="8" :sm="12">
            <el-form-item label="SN格式:" prop="snFormat">
              <span v-if="!isEditable">{{formData.snFormat}}</span>
              <el-input v-else v-model="formData.snFormat" clearable></el-input>
            </el-form-item>
          </el-col>
        
          <!-- 工单生产时间 -->
          <el-col :md="8" :sm="12">
            <el-form-item label="投放时间:">
              <span v-if="!isEditable">{{formData.orderImportDate}}</span>
              <el-date-picker
                v-else
                v-model="formData.orderImportDate"
                type="datetime">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :md="8" :sm="12">
            <el-form-item label="生产时间:">
              <span v-if="!isEditable">{{formData.orderStartDate}}</span>
              <el-date-picker
                v-else
                v-model="formData.orderStartDate"
                type="datetime">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :md="8" :sm="12">
            <el-form-item label="结案时间:">
              <span v-if="!isEditable">{{formData.orderCompleteDate}}</span>
              <el-date-picker v-else v-model="formData.orderCompleteDate" type="datetime"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :md="8" :sm="12">
            <el-form-item label="国内外标识:" prop="foreignIdentity">
              <span v-if="!isEditable">{{formData.foreignIdentity}}</span>
              <el-select v-else v-model="formData.foreignIdentity" clearable>
                <el-option 
                  v-for="item in marksFor21" :key="item.value" 
                  :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :md="8" :sm="12">
            <el-form-item label="boot版本号:" prop="targetVersionBoot">
              <span v-if="!isEditable">{{formData.targetVersionBoot}}</span>
              <el-input v-else v-model="formData.targetVersionBoot" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="8" :sm="12">
            <el-form-item label="recovery版本号:" prop="targetVersionRecovery">
              <span v-if="!isEditable">{{formData.targetVersionRecovery}}</span>
              <el-input v-else v-model="formData.targetVersionRecovery" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="8" :sm="12">
            <el-form-item label="core版本号:" prop="targetVersionCore">
              <span v-if="!isEditable">{{formData.targetVersionCore}}</span>
              <el-input v-else v-model="formData.targetVersionCore" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="8" :sm="12">
            <el-form-item label="test版本号:" prop="targetVersionTest">
              <span v-if="!isEditable">{{formData.targetVersionTest}}</span>
              <el-input v-else v-model="formData.targetVersionTest" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="8" :sm="12">
            <el-form-item label="app版本号:" prop="targetVersionApp">
              <span v-if="!isEditable">{{formData.targetVersionApp}}</span>
              <el-input v-else v-model="formData.targetVersionApp" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item class="el-col el-col-24" label="工单备注:" prop="orderRemark">
            <span v-if="!isEditable">{{formData.orderRemark}}</span>
            <el-input v-else v-model="formData.orderRemark" clearable type="textarea" :autosize="{ minRows: 4, maxRows: 6}"></el-input>
          </el-form-item>
        </el-row>
        <div class="t-c" v-if="!isAssigned">
          <el-button class="cancel" @click="handleCancel">取消</el-button>
          <el-button type="primary" class="green-btn" @click="updateOrder">保存</el-button>
        </div>
      </el-form>
    </el-card>
  </div>
 
</template>
<script>
import {marksFor21, orderStates, targetVersions} from '@/utils/dictionary'
import { getOrderDetails, updateOrder } from '@/api/order'
import { getAllFactory } from '@/api/factory'
export default {
  name: '',
  components: {},
  props: {},
  directive: {},
  data() {
    return {
      marksFor21,
      orderStates,
      targetVersions,
      factoryList: [],
      isEditable: true,
      formData: {
        workOrderNumber: '', // 工单单号
        orderCreateDate: '', // 开单日期
        orderState: '', // 工单状态
        deliveryOrderNumber: '', // 出货单号
        p0Number: '', // p0号
        quantity: '', // 数量
        productCode: '', // 产品代码
        productSpec: '', // 产品规格
        configCode: '', // 配置码
        processIdentity: 0, // 标识
        appBom: '', // 应用程序物料编号
        kernelBom: 0, // 内核版本物料编号
        customerName: '', // 客户名称
        deliveryDate: '', // 发货时间
        consignee: '', // 收货方
        consigneeAddress: '', // 收货地址
        snBegin: '', // 产品SN起
        snEnd: '', // 产品SN止
        snFormat: '', // SN格式
        orderRemark: '', // 工单备注
        orderImportDate: '', // 投入时间
        orderStartDate: '', // 生产时间
        orderCompleteDate: '', // 结案时间
        factoryId: '', // 外协工厂, id为空表示未分配
        foreignIdentity: '', // 国内外标识，21号文下载标识
        targetVersionBoot: '', // 目标boot版本号
        targetVersionRecovery: '', // 目标recovery版本号
        targetVersionCore: '', // 目标core版本号
        targetVersionTest: '', // 目标test版本号
        targetVersionApp: '', // 目标app版本号
        appUrl: '', // app程序包下载流程
        updateTime: '', // 更新时间
        updateBy: '', // 操作人
        id: '', // 工单id
      },
      rules: {
        workOrderNumber: [
          { required: true, message: '请填写工单号', trigger: 'blur' }
        ],
        orderCreateDate: [
          { required: true, message: '请设置开单日期', trigger: 'blur' }
        ],
        orderState: [
          { required: true, message: '请选择工单状态', trigger: 'blur' }
        ],
        quantity: [
          { required: true, message: '请填写数量', trigger: 'blur' }
        ],
        appBom: [
          { required: true, message: '请填写应用程序', trigger: 'blur' }
        ],
        kernelBom: [
          { required: true, message: '请填写内核版本', trigger: 'blur' }
        ],
        factoryId: [
          { required: true, message: '请选择要分配的外协厂标识', trigger: 'blur' }
        ],
        snBegin: [
          { required: true, message: '请填写订单起始SN', trigger: 'blur' }
        ],
        snEnd: [
          { required: true, message: '请填写订单终止SN', trigger: 'blur' }
        ],
        snFormat: [
          { required: true, message: '请设置SN格式', trigger: 'blur' }
        ],
        foreignIdentity: [
          { required: true, message: '请选择国内外标识', trigger: 'blur' }
        ],
        targetVersionBoot: [
          { required: true, message: '请填写目标boot版本', trigger: 'blur' }
        ],
        targetVersionRecovery: [
          { required: true, message: '请填写目标recovery版本', trigger: 'blur' }
        ],
        targetVersionCore: [
          { required: true, message: '请填写目标core版本', trigger: 'blur' }
        ],
        targetVersionTest: [
          { required: true, message: '请填写目标test版本', trigger: 'blur' }
        ],
        targetVersionApp: [
          { required: true, message: '请填写目标app版本', trigger: 'blur' }
        ],
        orderRemark: [
          { required: true, message: '请填写工单备注', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    orderId() {
      return this.$route.params.orderId
    }
  },
  watch: {},
  created() {
    this.getOrderDetails()
    this.getAllFactory()
  },
  beforeMount() {},
  mounted() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    getAllFactory() {
      getAllFactory().then(res => {
        this.factoryList = res.data.data
      })
    },  
    getOrderDetails() {
      getOrderDetails(this.orderId).then(res => {
        const resData = res.data.data
        this.formData = resData
      })
    },
    handleCancel() {
      this.$store.dispatch('delView', this.$route)
      this.$router.push('../list')
    },
    updateOrder() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          updateOrder(_.omit(this.formData, ['updateBy', 'uodateTime']))
          .then(res => {
            this.$message.success('更新订单成功！')
            this.handleCancel()
          })
        }
      })
    }
  }
}
</script>

<style lang='scss' scoped>
$color_497cd4:#497cd4;
$color_f8f8f8: #f8f8f8;
$color_1DC9BB: #1DC9BB;
.work-order-details{
  // padding: 40px 20px;
  background-color: $color_f8f8f8;
  .order-card{
    box-shadow: none;
    width: 80%;
    margin: auto;
    .el-card__body{
      padding: 20px 50px;
    }
  }
  .el-form{
    width: 96%;
    margin: auto;
    padding: 30px 50px;
    &.isEditable{
      background: $color_f8f8f8;
    }
  }
  .title{
    .desc{
      padding-left: 10px;
      border-left: 4px solid $color_1DC9BB;
    }
    .edit{
      cursor: pointer;
      color: $color_497cd4;
      font-size: 14px;
      float: right;
    }
  }
}
</style>
