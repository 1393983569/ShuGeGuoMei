<template>
  <div>
    <Breadcrumb :stateShow ='stateShow'>
      <el-button type="primary" size="mini" @click="addHandle">新建</el-button>
    </Breadcrumb>
    <div style="display:flex;flex-direction:row;align-items:center;">
      <selector-address :province1id="provinceId" :city1id="cityId" :county1id="areaId" @getProvince="getProvince" @getCity="getCity" @getCounty="getCounty"/>
      <span style="font-weight:bold;">市场类别：</span>
      <el-select v-model="priceMarketType" style="width:10%;" size="mini">
        <el-option v-for="item in shichangList" :key="item.id" :value="item.id" :label="item.name" />
      </el-select>
      <div style="position:absolute; right:10px;">
        <el-button size="mini" type="primaryX" @click="search" :loading="loadingSearch">筛选</el-button>
        <el-button size="mini" type="info" @click="clearSearch" :loading="loadingClear">清空</el-button>
      </div>
    </div>
    <div style="margin-top:5px;margin-bottom:20px;">
      <el-input
        placeholder="请输入用户名、手机号、市场名称搜索"
        prefix-icon="el-icon-search"
        clearable
        v-model="param" style="width:400px;" size="mini">
      </el-input>
      <el-button size="mini" @click="inputSearch" type="primary">搜索</el-button>
    </div>
    <div style="margin-top:5px;">
      <el-table :data="tableData">
        <el-table-column prop="name" label="用户名"/>
        <el-table-column prop="mobile" label="手机号"/>
        <el-table-column prop="password" label="密码"/>
        <el-table-column prop="priceMarketName" label="市场名称">
          <template slot-scope="scope">
            <p class="outer">
              <span v-for="item in scope.row.priceMarketMan">{{item.priceMarketName}}</span>,
            </p>
          </template>
        </el-table-column>
        <el-table-column prop="priceMarketType" label="市场类别">
          <template slot-scope="scope">
            <p v-if="scope.row.priceMarketType===1">批发市场</p>
            <p v-else-if="scope.row.priceMarketType===2">零售市场</p>
            <p v-else-if="scope.row.priceMarketType===3">早市</p>
          </template>
        </el-table-column>
        <el-table-column prop="" label="市场区域">
          <template slot-scope="scope">
            {{scope.row.provinceDomain.name}}{{scope.row.cityDomain.name}}{{scope.row.areaDomain.name}}-{{scope.row.priceMarketName}}
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间"/>
        <el-table-column prop="" label="操作" width="200">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="editCaijiaUser(scope.row)">编辑</el-button>
            <el-button type="danger" size="mini" @click="deleteCaijiaUser(scope.row)">删除</el-button>
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
     <hint title="删除供应商" v-model="showDelete" text="是否删除供应商？" @confirm="deleteAdConfirm" />
  </div>
</template>
<script>
import hint from '@/components/Hint'
import selectorAddress from '@/components/selectorAddress/selectorAddress.vue'
import Breadcrumb from '@/components/Breadcrumb'
import { getCaijiaUser, addCaijiaUser, editCaijiaUser, deleteCaijiaUser} from '@/api/admin/caijiaUser.js'
export default {
  components: { selectorAddress, Breadcrumb, hint },
  data(){
    return{
      stateShow:false,
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
      buttonList:[],
      priceMarketType:'',
      shichangList:[
        {
          id:1,
          name:'批发市场'
        },
        {
          id:2,
          name:'零售市场'
        },
        {
          id:3,
          name:'早市'
        },
      ],
      userId:'',
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
        this.getCaijiaUser()
      }else{
        // 去除参数前后的空格
        this.param = this.Trim(e)
        // this.getCaijiaUser()
      }
    }
  },
  mounted() {
    this.getCaijiaUser()
  },
  methods:{
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
      this.getCaijiaUser()
    },
    search() {
      this.loadingSearch = true
      this.getCaijiaUser()

    },
    // 清空查询条件
    clearSearch() {
      this.loadingClear = true
      this.provinceId = ''
      this.cityId = ''
      this.areaId = ''
      this.priceMarketType = ''
      // this.params
      this.getCaijiaUser()

    },
    // 查询用户列表
    getCaijiaUser(){
      let obj = {}
      obj.param = this.param
      obj.pagesize = this.pagesize
      obj.pageNum = this.pageNum
      obj.priceMarketType = this.priceMarketType
      obj.provinceId = this.provinceId
      obj.cityId = this.cityId
      obj.areaId = this.areaId
      getCaijiaUser(obj).then(res => {
        // console.log(res, 'res.....')
        this.tableData = res.info.records
        this.total = res.info.totalrecord
        this.loadingSearch = false
        this.loadingClear = false
      }).catch(err => {})
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
    addHandle(){
      this.$router.push({
        name:'caijiaUserAdd'
      })
    },
    deleteCaijiaUser(row){
      console.log('row:',row)
      this.userId = row.id
      this.showDelete = true
    },
    deleteAdConfirm(){
      deleteCaijiaUser(this.userId).then(res => {
        if(res.status === 1){
          this.$message.success('删除成功！')
          this.showDelete = false
          this.getCaijiaUser()
          this.getCaijiaUser()
        }
      }).catch(err => {
        this.$message.error('删除失败！')
      })
    },
    editCaijiaUser(row){
      row.state = '编辑'
      this.$router.push({
        name:'caijiaUserAdd',
        params:row
      })
    }
  }
}
</script>
<style>
.outer{
    /* 文本强制不换行；*/
    white-space: nowrap;
     /* 文本溢出显示省略号； */
    text-overflow:ellipsis;
    /* 溢出的部分隐藏； */
    overflow:hidden;
}
</style>
