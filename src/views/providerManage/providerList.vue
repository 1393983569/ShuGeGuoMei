<template>
  <div>
    <breadcrumb>
      <el-button type="primary" size="mini" @click="addProvider">新建</el-button>
    </breadcrumb>
    <div style="display:flex;flex-direction:row;">
      <selector-address :province1id="provinceId" :city1id="cityId" :county1id="areaId" @getProvince="getProvince" @getCity="getCity" @getCounty="getCounty"/>
      <div style="position:absolute; right:10px;">
        <el-button size="mini" type="primary" @click="searchProvider" :loading="loadingSearch">筛选</el-button>
        <el-button size="mini" type="danger" @click="clearSearch" :loading="loadingClear">清空</el-button>
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
          <el-button size="mini" type="warning" @click="detailProvider(scope.row)">查看详情</el-button>
          <el-button size="mini" type="primary" @click="editProvider(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="deleteProviderHandle(scope.row)">删除</el-button>
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
    <!-- 删除 -->
    <!-- <el-dialog :visible.sync="showDelete" center width="380px" title="删除广告">
      <div width="100%" style="font-size: 17px;display: flex;justify-content:center;align-items: center;height:100px;border-radius: 10px;">是否删除该供应商？</div>
      <div slot="footer" style="boeder:1px solid black">
        <el-button style="width:160px;border:none;font-size:18px;" @click="showDelete = false">取消</el-button>
        <el-button style="width:160px;border:none;font-size:18px;" @click="deleteAdConfirm">确定</el-button>
      </div>
    </el-dialog> -->
    <hint title="删除供应商" v-model="showDelete" text="是否删除供应商？" @confirm="deleteAdConfirm" />
  </div>
</template>
<script>
import hint from '@/components/Hint'
import selectorAddress from '@/components/selectorAddress/selectAll.vue'
import Breadcrumb from '@/components/Breadcrumb'
import { getProvider, deleteProvider } from '@/api/provider.js'
export default {
  components: { selectorAddress, Breadcrumb, hint },
  data() {
    return {
      searchInput: '',
      total: 0,
      pagesize: 10,
      pageNum: 1,
      cityId: '',
      provinceId: '',
      areaId: '',
      tableData:[],
      loadingSearch: false,
      loadingClear: false,
      showDelete: false,
      id: ''
    }
  },
  watch: {},
  mounted() {
    // console.log(this.$router, '%%%%%%')
    this.getProviderList()
  },
  methods: {
    // 查询供应商列表
    getProviderList(){
      let data= {}
      data.pageSize = this.pagesize
      data.pageNum = this.pageNum
      data.provinceId = this.provinceId
      data.cityId = this.cityId
      data.areaId = this.areaId
      getProvider(data).then(res => {
        if(res.info.records.length > 0){
          this.total = res.info.totalrecord
          this.tableData = res.info.records
          this.loadingSearch = false
          this.loadingClear = false
        }else{
          this.$message.info('暂无数据')
          this.total = res.info.totalrecord
          this.tableData = res.info.records
          this.loadingSearch = false
          this.loadingClear = false
        }
      }).catch(err => {
        console.log(err)
        this.$message.error('查询供应商出错')
      })
    },
    // 条件查询
    searchProvider() {
      this.loadingSearch = true
      if(this.provinceId||this.cityId||this.areaId) {
        this.getProviderList()
      }else{
        this.$message.info('请选择筛选条件')
        this.loadingSearch = false
      }
    },
    // 清空查询条件
    clearSearch() {
      this.loadingClear = true
      this.provinceId = ''
      this.cityId = ''
      this.areaId = ''
      this.getProviderList()
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
    },
    addProvider() {
      this.$router.push({name: 'providerAddEdit'})
    },
    editProvider(row) {
      console.log(row,'888888888')
      this.$router.push({name: 'providerAddEdit', params: row })
    },
    detailProvider(row) {
      this.$router.push({name: 'providerDetail', params: row })
    },
    deleteProviderHandle(row) {
      this.showDelete = true
      console.log(row, '4444444')
      this.id = row.id
    },
    deleteAdConfirm() {
      deleteProvider(this.id).then(res => {
        if(res.status === 1){
          this.$message.success('删除供应商成功！')
          this.showDelete = false
          this.getProviderList()
        }else{
          this.$message.warning('删除供应商出错')
        }
      }).catch(err => {
        console.log(err)
        this.$message.error('删除供应商失败！')
      })
    }
  }
}
</script>
<style>

</style>
