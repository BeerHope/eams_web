<template>
  <div class="work-order-details">
    <el-form label-width="120px">
      <el-row>
        <el-col :md="8" :sm="12">
          <el-form-item label="工单单号:">
            <el-input v-model="formData.order" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="12">
          <el-form-item label="开单日期:">
            <el-input v-model="formData.billingDate" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="12">
          <el-form-item label="工单状态:">
            <el-input v-model="formData.orderState" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="12">
          <el-form-item label="出货单号:">
            <el-input v-model="formData.deliveryNo"></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="12">
          <el-form-item label="PO号:">
            <el-input v-model="formData.poNo"></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="12">
          <el-form-item label="数量:">
            <el-input v-model="formData.num"></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="12">
          <el-form-item label="产品代码:">
            <el-input v-model="formData.productCode"></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="12">
          <el-form-item label="产品名称:">
            <el-input v-model="formData.productName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="12">
          <el-form-item label="产品名称:">
            <el-input v-model="formData.productName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="12">
          <el-form-item label="产品规格:">
            <el-input v-model="formData.productStandard"></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="12">
          <el-form-item label="产品类型:">
            <el-input v-model="formData.productType"></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="12">
          <el-form-item label="途程:">
            <el-input v-model="formData.route"></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="12">
          <el-form-item label="配置码:">
            <el-input v-model="formData.configurationCode"></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="12">
          <el-form-item label="标识:">
            <el-input v-model="formData.mark"></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="12">
          <el-form-item label="应用程序:">
            <el-input v-model="formData.app"></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="12">
          <el-form-item label="内核版本:">
            <el-input v-model="formData.kernelVersion"></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="12">
          <el-form-item label="客户名称:">
            <el-input v-model="formData.customerName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="12">
          <el-form-item label="手机备案:">
            <el-input v-model="formData.workOrderBak"></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="12">
          <el-form-item label="发货时间:">
            <el-input v-model="formData.deliveryTime"></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="12">
          <el-form-item label="收货方:">
            <el-input v-model="formData.receiver"></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="12">
          <el-form-item label="发货地址:">
            <el-input v-model="formData.deliveryAddr"></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="12">
          <el-form-item label="发货城市:">
            <el-input v-model="formData.deliveryCity"></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="12">
          <el-form-item label="产品ID 起:">
            <el-input v-model="formData.startId"></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="12">
          <el-form-item label="ID格式:">
            <el-input v-model="formData.idFormat"></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="12">
          <el-form-item label="产品SN 起:">
            <el-input v-model="formData.startSN"></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="12">
          <el-form-item label="止:">
            <el-input v-model="formData.endSN"></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="12">
          <el-form-item label="SN格式:">
            <el-input v-model="formData.snFormat"></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="12">
          <el-form-item label="箱号 起:">
            <el-input v-model="formData.snFormat"></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="12">
          <el-form-item label="止:">
            <el-input v-model="formData.endCTN"></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="12">
          <el-form-item label="银联认证:">
            <el-input v-model="formData.unionpayCert"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :md="8" :sm="12">
          <el-form-item label="预计生产:">
            <el-input v-model="formData.predictStartTime"></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="12">
          <el-form-item label="预计完工:">
            <el-input v-model="formData.predictEndTime"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :md="8" :sm="12">
          <el-form-item label="投放时间:">
            <el-input v-model="formData.putTime"></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="12">
          <el-form-item label="生产时间:">
            <el-input v-model="formData.produceTime"></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="12">
          <el-form-item label="结案时间:">
            <el-input v-model="formData.closeTime"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item class="el-col el-col-24" label="工单备注:">
          <el-input v-model="formData.remark" type="textarea" :autosize="{ minRows: 4, maxRows: 6}"></el-input>
        </el-form-item>
      </el-row>
      <div class="t-c" v-if="!isAssigned">
        <el-button class="cancel" @click="toListPage">取消</el-button>
        <el-button type="primary" class="green-btn" @click="handleSave">保存</el-button>
      </div>
    </el-form>
  </div>
</template>
<script>
export default {
  name: '',
  components: {},
  props: {},
  directive: {},
  data() {
    return {
      isAssigned: false, // 分配标志
      formData: {
        order: '工单单号',
        billingDate: '开单日期',
        orderState: '未分配', // 如果只分配一个外协厂，那都是未分配
        deliveryNo: '出货单号12321390090',
        poNo: 'PO232132321',
        num: '数量1232',
        productCode: '产品代码',
        productName: '产品名称',
        productStandard: '产品规格',
        productType: '产品类型',
        route: '途程',
        configurationCode: '配置码',
        mark: '标识',
        app: '应用程序',
        kernelVersion: '内核版本',
        customerName: '客户名称',
        workOrderBak: '手机备案', // 备货工单
        deliveryTime: '发货时间',
        receiver: '收货方',
        deliveryAddr: '发货地址',
        deliveryCity: '发货城市',
        startId: '产品起始ID',
        endId: '产品终止ID',
        idFormat: 'ID格式',
        startSN: '起始SN',
        endSN: '终止SN',
        snFormat: 'SN格式',
        startCTN: '起始箱号',
        endCTN: '终止箱号',
        unionpayCert: '银联认证',
        predictStartTime: '预计生产时间',
        predictEndTime: '预计完成',
        putTime: '投放时间',
        produceTime: '生产时间',
        closeTime: '结案时间',
        remark: ''
      }
    }
  },
  computed: {},
  watch: {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    toListPage() {
      this.$store.dispatch('delView', this.$route)
      this.$router.push('../list')
    },
    handleSave() {
      // 调用上传接口
      // 
    }
  }
}
</script>

<style lang='scss' scoped>
.work-order-details{
  padding: 40px 20px;
  .el-form{
    width: 80%;
    margin: auto;
    padding: 30px 50px;
    background: #f7f7f7;
  }
}
</style>
