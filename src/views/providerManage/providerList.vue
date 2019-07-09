<template>
  <div>
    <breadcrumb>
      <el-button>新建</el-button>
    </breadcrumb>
    <div style="display:flex;flex-direction:row;">
      <selector-address/>
      <div style="position:absolute; right:10px;">
        <el-button size="mini">筛选</el-button>
        <el-button size="mini">清空</el-button>
      </div>
    </div>
    <div style="margin-top:5px;margin-bottom:20px;">
      <el-input
        placeholder="请输入关键词进行搜索"
        prefix-icon="el-icon-search"
        v-model="input2" style="width:400px;" size="mini">
      </el-input>
      <el-button size="mini">搜索</el-button>
    </div>
    <el-table>
      <el-table-column prop="" label="供应商ID"/>
      <el-table-column prop="" label="供应商名称" />
      <el-table-column prop="" label="手机号" />
      <el-table-column prop="" label="评分" />
      <el-table-column prop="" label="操作">
        <template slot-scope="scope">
          <el-button>查看详情</el-button>
          <el-button>编辑</el-button>
          <el-button>删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import selectorAddress from '@/components/selectorAddress/selectAll.vue'
import Breadcrumb from '@/components/Breadcrumb'
import { getProvider } from '@/api/provider.js'
export default {
  components: { selectorAddress, Breadcrumb },
  data() {
    return {}
  },
  methods: {
    getProviderList(){
      getProvider().then(res => {

      }).catch(err => {

      })
    }
  }
}
</script>
<style>

</style>
