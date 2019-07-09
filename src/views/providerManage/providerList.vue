<template>
  <div>
    <breadcrumb>
      <el-button type="primary" size="mini">新建</el-button>
    </breadcrumb>
    <div style="display:flex;flex-direction:row;">
      <selector-address :province1id="provinceId" :city1id="cityId" :county1id="areaId" @getProvince="getProvince" @getCity="getCity" @getCounty="getCounty"/>
      <div style="position:absolute; right:10px;">
        <el-button size="mini" type="primary">筛选</el-button>
        <el-button size="mini" type="danger">清空</el-button>
      </div>
    </div>
    <div style="margin-top:5px;margin-bottom:20px;">
      <el-input
        placeholder="请输入关键词进行搜索"
        prefix-icon="el-icon-search"
        v-model="searchInput" style="width:400px;" size="mini">
      </el-input>
      <el-button size="mini">搜索</el-button>
    </div>
    <el-table :data="tableData" stripe>
      <el-table-column prop="id" label="供应商ID"/>
      <el-table-column prop="name" label="供应商名称" />
      <el-table-column prop="mobile" label="手机号" />
      <el-table-column prop="" label="评分" />
      <el-table-column prop="" label="操作" width= "260px">
        <template slot-scope="scope">
          <el-button size="mini" type="warning">查看详情</el-button>
          <el-button size="mini" type="primary">编辑</el-button>
          <el-button size="mini" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div>
      <el-pagination
        :page-sizes="[10, 15]"
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>
<script>
import selectorAddress from '@/components/selectorAddress/selectAll.vue'
import Breadcrumb from '@/components/Breadcrumb'
import { getProvider } from '@/api/provider.js'
export default {
  components: { selectorAddress, Breadcrumb },
  data() {
    return {
      searchInput: '',
      total: 0,
      pagesize: 10,
      pageNum: 1,
      cityId: '',
      provinceId: '',
      areaId: '',
      tableData:[]
    }
  },
  watch: {},
  mounted() {
    this.getProviderList()
  },
  methods: {
    getProviderList(){
      let data= {}
      data.pageSize = this.pagesize
      data.pageNum = this.pageNum
      data.provinceId = this.provinceId
      data.cityId = this.cityId
      data.areaId = this.areaId
      getProvider(data).then(res => {
        if(res.info.records.length > 0){
          this.tableData = res.info.records
        }
      }).catch(err => {

      })
    },
    getProvince(id) {
      this.provinceId = id
    },
    getCity(id) {
      this.cityId = id
    },
    getCounty(id) {
      this.areaId = id
    },
    handleSizeChange(e) {
      this.pageSize = e
    },
    handleCurrentChange(e) {
      this.pageNum = e
    }
  }
}
</script>
<style>

</style>
