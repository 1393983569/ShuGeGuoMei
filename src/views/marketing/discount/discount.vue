<template>
  <div>
    <breadcrumb>
      <el-button type="primary">新建</el-button>
    </breadcrumb>
    <div style="display:flex;flex-redirection:row;margin:10px;">
      <div>
        店铺：<el-select v-model="shopId" placeholder="请选择" size="mini">
          <el-option
            v-for="item in shopList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
        状态：<el-select v-model="state" placeholder="请选择" size="mini">
          <el-option
            v-for="item in stateList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </div>
      <div style="position:absolute;right:0px;">
        <el-button type="primaryX" size="mini">筛选</el-button>
        <el-button type="danger" size="mini">清除</el-button>
      </div>
    </div>
    <el-table :data="dataList">
      <el-table-column prop="" label="折扣包名称"/>
      <el-table-column prop="" label="使用店铺"/>
      <el-table-column prop="" label="折扣商品"/>
      <el-table-column prop="" label="状态"/>
      <el-table-column label="操作" :width="400">
        <template slot-scope="scope">
          <el-button size="mini" type="warning">查看详情</el-button>
          <el-button size="mini" type="up">停用</el-button>
          <el-button size="mini" type="primary">编辑</el-button>
          <el-button size="mini" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="margin-top:5px;"
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageNum"
      :page-sizes="[10, 15]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>
<script>
import breadcrumb from '@/components/Breadcrumb'
export default {
  components:{
    breadcrumb
  },
  data() {
    return {
      state: '',
      shopId:'',
      shopList: [],
      stateList:[],
      dataList:[{}],
      pageSize:10,
      pageNum:1,
      total:0,
    }
  },
  methods:{
    handleSizeChange(e){
      this.pageSize=  e
    },
    handleCurrentChange(e){
      this.pageNum = e
    }
  }
}
</script>
<style></style>
