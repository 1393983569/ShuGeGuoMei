<template>
  <div class="components-container">
    <!-- <div class="title-size-color">消息发布</div> -->
    <div style="display:flex;flex-direction:row;justify-content:flex-end;">
      <el-button style="margin-right:20px;">取消</el-button>
      <el-button>确定</el-button>
    </div>
    <div class="size-color" style="margin:10px;">
      标题：<el-input style="width:500px;" placeholder="单行输入" />
    </div>
    <div class="size-color" style="margin:10px;">
      对象：
      <el-select v-model="object" clearable multiple style="width:300px;">
        <el-option v-for="(item, index) in objectList" :key="index" :value="item.id" :label="item.name" />
      </el-select>
    </div>
    <div class="size-color" style="margin:10px;">
      类别：
      <el-select v-model="newsType" style="width:300px;">
        <el-option v-for="item in newsTypeList" :key="item.id" :value="item.id" :label="item.name" />
      </el-select>
    </div>
    <div style="margin:10px;display:flex;align-items:flex-start;font-weight:bold;">
      内容：<tinymce v-model="content" :height="300" :width="700" />
    </div>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'

export default {
  // name: 'TinymceDemo',
  components: { Tinymce },
  data() {
    return {
      content: '',
      newsType: '',
      newsTypeList: [],
      object: '',
      objectList: [
        {
          id: 1,
          name: '高俅'
        },
        {
          id: 2,
          name: '林冲'
        }
      ]
    }
  },
  watch: {
    'content'(e) {
      console.log(e, 'eeeee')
    }
  }
}
</script>

<style scoped>
.a{

}
</style>

