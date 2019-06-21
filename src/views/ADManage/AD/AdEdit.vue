<template>
  <div class="body-margin">
    <el-dialog :visible.sync="showAdEdit" :before-close="hadleClose" width="840">
      <div class="size-color" style="margin:10px;">
        标题：<el-input placeholder="请输入标题" style="width:500px;" />
      </div>
      <div class="size-color" style="margin:10px;">
        轮播图：<el-input placeholder="请输入标题" style="width:500px;" />
      </div>
      <div style="margin:10px;display:flex;align-items:flex-start;font-weight:bold;font-size:18px;color:#6e7b99;">
        内容：&nbsp;&nbsp;&nbsp;&nbsp;<tinymce v-model="content" :height="300" :width="700" />
      </div>
      <div slot="footer">
        <el-button @click="hadleClose">取消</el-button>
        <el-button>确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Tinymce from '@/components/Tinymce'
export default {
  components: { Tinymce },
  props: {
    showAdEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      content: ''
    }
  },
  methods: {
    hadleClose() {
      this.$emit('closeEdit', false)
    }
  }
}
</script>
