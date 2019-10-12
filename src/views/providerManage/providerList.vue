<template>
  <div>
    <breadcrumb :stateShow ='false'>
      <el-button type="primary" size="mini" @click="addProvider" v-if="buttonList.includes('操作')">新建</el-button>
      <el-button type="primary" size="mini" v-else disabled>新建</el-button>
    </breadcrumb>
    <div style="display:flex;flex-direction:row;">
      <selector-address :province1id="provinceId" :city1id="cityId" :county1id="areaId" @getProvince="getProvince" @getCity="getCity" @getCounty="getCounty"/>
      <div style="position:absolute; right:10px;">
        <el-button size="mini" type="primaryX" @click="searchProvider" :loading="loadingSearch">筛选</el-button>
        <el-button size="mini" type="info" @click="clearSearch" :loading="loadingClear">清空</el-button>
      </div>
    </div>
    <div style="margin-top:5px;margin-bottom:20px;">
      <el-input
        placeholder="请输入供应商名称或手机号搜索"
        prefix-icon="el-icon-search"
        clearable
        v-model="param" style="width:400px;" size="mini">
      </el-input>
      <el-button size="mini" @click="inputSearch">搜索</el-button>
    </div>
    <el-table :data="tableData" stripe>
      <el-table-column prop="id" label="供应商ID"/>
      <el-table-column prop="name" label="供应商名称" />
      <el-table-column prop="mobile" label="手机号" />
      <el-table-column prop="average" label="评分">
        <!-- <template slot-scope="scope">
          {{scope.row.qualificationScore + scope.row.qualityScore + scope.row.serviceScore + scope.row.deliverShopScore + scope.row.priceScore}}
        </template> -->
      </el-table-column>
      <el-table-column prop="" label="操作" width= "260px">
        <template slot-scope="scope">
          <el-button size="mini" type="warning" @click="detailProvider(scope.row)" v-if="buttonList.includes('操作')||buttonList.includes('查看')">查看详情</el-button>
          <el-button size="mini" type="warning" v-else disabled>查看详情</el-button>
          <el-button size="mini" type="primary" @click="editProvider(scope.row)" v-if="buttonList.includes('操作')">编辑</el-button>
          <el-button size="mini" type="primary" v-else disabled>编辑</el-button>
          <el-button size="mini" type="danger" @click="deleteProviderHandle(scope.row)" v-if="buttonList.includes('操作')">删除</el-button>
          <el-button size="mini" type="danger" v-else disabled>删除</el-button>
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
      id: '',
      param:'',
      buttonList:[]
    }
  },
  beforeRouteEnter (to, form, next) {
   console.log(to)
    next(mv => {
      mv.getButton(mv.$store.getters.buttonRoleList, to.name)
  	})
  },
  watch: {
    'param'(e){
      if(!e){
        this.params = e
        this.getProviderList()
      }else{
        // 去除参数前后的空格
        this.param = this.Trim(e)
      }
    }
  },
  mounted() {
    this.getProviderList()
  },
  methods: {
    Trim(str){
      return str.replace(/(^\s*)|(\s*$)/g, "");
    },
    getButton(list, name){
      list.forEach(e => {
        if(e.name === name){
          this.buttonList = e.checkList
        }
      });
    },
    inputSearch(){
      this.getProviderList()
    },
    // 查询供应商列表
    getProviderList(){
      let data= {}
      data.pageSize = this.pagesize
      data.pageNum = this.pageNum
      data.provinceId = this.provinceId
      data.cityId = this.cityId
      data.areaId = this.areaId
      data.param = this.param
      getProvider(data).then(res => {
        if(res.info.records.length > 0){
          this.total = res.info.totalrecord
          // res.info.records.forEach(item => {
          //   let obj = {}
          //   obj = item
          //   obj.grade = item.qualificationScore + item.qualityScore + item.serviceScore + item.deliverShopScore + item.priceScore
          //   this.tableData.push(obj)
          // });
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
      // this.params
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
      // console.log(row,'888888888')
      this.$router.push({name: 'providerAddEdit', params: row })
      this.$store.state.user.providerObject = row
    },
    detailProvider(row) {
      this.$router.push({name: 'providerDetail', params: row })
      this.$store.state.user.providerObject = row
      console.log(this.$store, 'xiangqing ')
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
