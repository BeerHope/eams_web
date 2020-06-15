<template>
  <el-dialog
    width="40%"
    title="上传资料包"
    @close="closeDialog"
    custom-class="common-dialog upload"
    :visible.sync="dialogVisible">
    <el-upload
      v-loading="loading"
      ref="upload"
      class="upload-demo t-c"
      drag
      :action="uploadUrl"
      :headers="headers"
      :on-exceed="handleExceed"
      :auto-upload="false"
      :on-change="uploadChange"
      :on-remove="removeFile"
      :limit="1">
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">只允许上传.rar,.zip文件</div>
    </el-upload>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" class="cancel" @click="dialogVisible=false">取消</el-button>
      <el-button type="primary" class="purple-btn" @click="handleUpload">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getToken } from '@/utils/auth'
import { uploadResource } from '@/api/order'
export default {
  name: 'Upload',
  components: {},
  props: {},
  directive: {},
  data() {
    return {
      dialogVisible: false,
      file: null,
      loading: false,
      orderId: '',
    }
  },
  computed: {
    uploadUrl() {
      return `${process.env.APP_BASE_API}/eams//order/uploadResource`
    },
    headers() {
      return {
        token: getToken()
      };
    }
  },
  watch: {},
  created() {
  },
  beforeMount() {},
  mounted() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    uploadChange(file, fileList) {
      const acceptTypes = ['rar', 'zip']
      const type = file.name.slice(file.name.lastIndexOf('.') + 1)
      const isAcceptedType = _.includes(acceptTypes, type)
      const isLt200M = file.size / 1024 / 1024 <= 200;
      if (!isAcceptedType) {
        this.$message.error('检测到当前文件格式不是.rar,.zip')
      }
      if (!isLt200M) {
        this.$message.error('上传文件不能超过200M')
      }
      if (!isAcceptedType || !isLt200M) {
        this.$refs.upload.clearFiles()
        return
      }
      // 保存文件
      this.file = file
    },
    handleExceed(files, fileList) {
      this.$message.warning('上传资料包数量超限, 只允许上传单个资料包')
    },
    handleUpload() {
      if (this.loading) {
        this.$message.warning('资料包正在上传，请耐心等待！')
        return
      }
      const upload = this.$refs.upload
      if (!upload.uploadFiles.length) {
        this.$message.warning('请先上传资料包')
        return
      }
      this.loading = true
      const formData = new FormData()
      formData.append('file', this.file.raw)
      uploadResource(this.orderId, formData).then(res => {
        this.loading = false
        this.$message.success('资料包上传成功!')
        this.dialogVisible = false
        this.$emit('refresh')
      }).catch(() => {
        this.loading = false
      })
    },
    removeFile() {
      this.$refs.upload.clearFiles()
      this.file = null
    },
    closeDialog() {
      this.$refs.upload.clearFiles()
    }
  }
}
</script>

<style lang='scss'>
</style>
