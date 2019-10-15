<template>
  <div>
    <breadcrumb :stateShow ='stateShow'>
     <el-button type="primary" @click="addSystemMsg">保存</el-button>
    </breadcrumb>
    <h3>会员系统说明：</h3>
    <div class="components-container">
      <tinymce v-model="content" />
    </div>
  </div>
</template>

<script>
import { addSystemMsg } from '@/api/member.js'
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
      content: '',
      stateShow:false
    }
  },
  mounted(){
    this.stateShow = true
  },
  methods:{
    addSystemMsg(){
      addSystemMsg(this.content).then(res => {
        if(res.status === 1){
          this.$message.success('保存成功！')
          this.$router.back()
        }else{
          this.$message.error('保存失败！')
        }
      }).catch(err => {
        console.log(err)
        this.$message.error('保存出错！')
      })
    }
  }
}
</script>

<style scoped>

</style>
