<template>
  <div>
    <breadcrumb>
     <el-button type="primary">保存</el-button>
    </breadcrumb>
    <h3>会员系统说明：</h3>
    <div class="components-container">
      <tinymce v-model="content" />
    </div>
  </div>
</template>

<script>
import tinymce from '@/components/Tinymce'
import Breadcrumb from '@/components/Breadcrumb'
export default {
  name: 'explain',
  components: {
    tinymce,
    Breadcrumb
  },
  data() {
    return {
      content: ''
    }
  }
}
</script>

<style scoped>

</style>
