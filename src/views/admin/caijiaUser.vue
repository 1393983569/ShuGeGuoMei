<template>
  <div>
    <Breadcrumb :stateShow ='stateShow'>
      <el-button type="primary" size="mini" @click="addHandle" v-if="buttonList.includes('操作')">新建</el-button>
      <el-button type="primary" size="mini"  v-else disabled>新建</el-button>
    </Breadcrumb>
    <div style="display:flex;flex-direction:row;align-items:center;">
      <selector-address :province1id="provinceId" :city1id="cityId" :county1id="areaId" @getProvince="getProvince" @getCity="getCity" @getCounty="getCounty"/>
      <span style="font-weight:bold;">市场类别：</span>
      <el-select v-model="priceMarketType" style="width:10%;" size="mini">
        <el-option v-for="item in shichangList" :key="item.id" :value="item.id" :label="item.name" />
      </el-select>
      <div style="position:absolute; right:10px;">
        <el-button size="mini" type="primaryX" @click="search" :loading="loadingSearch" v-if="buttonList.includes('操作'||'查看')">筛选</el-button>
        <el-button size="mini" type="primaryX" v-else disabled>筛选</el-button>
        <el-button size="mini" type="info" @click="clearSearch" :loading="loadingClear" v-if="buttonList.includes('操作'||'查看')">清空</el-button>
        <el-button size="mini" type="info" v-else disabled>清空</el-button>
      </div>
    </div>
    <div style="margin-top:5px;margin-bottom:20px;">
      <el-input
        placeholder="请输入用户名、手机号、市场名称搜索"
        prefix-icon="el-icon-search"
        clearable
        v-model="param" style="width:400px;" size="mini">
      </el-input>
      <el-button size="mini" @click="inputSearch" type="primary" v-if="buttonList.includes('操作'||'查看')">搜索</el-button>
      <el-button size="mini" type="primary" v-else>搜索</el-button>
    </div>
    <div style="margin-top:5px;">
      <el-table :data="tableData">
        <el-table-column prop="name" label="用户名"/>
        <el-table-column prop="mobile" label="手机号"/>
        <el-table-column prop="password" label="密码"/>
        <el-table-column prop="priceMarketName" label="市场名称">
          <template slot-scope="scope">
            <p class="outer">
              <span v-for="(item, index) in scope.row.priceMarketMan" v-if="index<3">
                <span>{{item.priceMarketName}}</span><br/>
              </span>
              <span v-else>...</span>
            </p>
          </template>
        </el-table-column>
        <el-table-column prop="priceMarketType" label="市场类别">
          <template slot-scope="scope">
            <p v-if="scope.row.priceMarketType&&scope.row.priceMarketType===1">批发市场</p>
            <p v-else-if="scope.row.priceMarketType&&scope.row.priceMarketType===2">零售市场</p>
            <p v-else-if="scope.row.priceMarketType&&scope.row.priceMarketType===3">早市</p>
          </template>
        </el-table-column>
        <el-table-column prop="" label="市场区域">
          <template slot-scope="scope">
            <p class="outer">
              <span v-for="(item, index) in scope.row.priceMarketMan" v-if="index<3">
                <span>{{scope.row.province.name}}{{scope.row.city.name}}{{scope.row.area.name}}-{{item.priceMarketName}}</span><br/>
              </span>
              <span v-else>...</span>
            </p>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间"/>
        <el-table-column prop="" label="操作" width="200">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="editCaijiaUser(scope.row)" v-if="buttonList.includes('操作')">编辑</el-button>
            <el-button type="primary" size="mini" v-else disabled>编辑</el-button>
            <el-button type="danger" size="mini" @click="deleteCaijiaUser(scope.row)" v-if="buttonList.includes('操作')">删除</el-button>
            <el-button type="danger" size="mini" v-else disabled>删除</el-button>
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
     <hint title="删除采价用户" v-model="showDelete" text="是否删除采价用户？" @confirm="deleteAdConfirm" />
  </div>
</template>
<script>
import virtualList from 'vue-virtual-scroll-list'
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
      pageSize: 10,
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
          id:'',
          name:'全部'
        },
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
      obj.pageSize = this.pageSize
      obj.pageNum = this.pageNum
      obj.priceMarketType = this.priceMarketType
      obj.provinceId = this.provinceId
      obj.cityId = this.cityId
      obj.areaId = this.areaId
      obj.type=3
      getCaijiaUser(obj).then(res => {
        this.tableData = []
        res.info.records.forEach(item => {
          let obj  = {}
          obj = item
          if(item.priceMarketMan[0]){
            obj.province = item.priceMarketMan[0].priceMarketDomain.provinceDomain
            obj.city = item.priceMarketMan[0].priceMarketDomain.cityDomain
            obj.area = item.priceMarketMan[0].priceMarketDomain.areaDomain
            obj.priceMarketType = item.priceMarketMan[0].priceMarketType
            this.tableData.push(obj)
          }else{
            obj.province = {}
            obj.city = {}
            obj.area = {}
            obj.priceMarketType =''
            this.tableData.push(obj)
          }
        })
        this.total = res.info.totalrecord
        this.loadingSearch = false
        this.loadingClear = false
      }).catch(err => {
        console.log(err)
         this.loadingSearch = false
        this.loadingClear = false
        this.$message.error('采价端用户查询出错！')
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
      this.getCaijiaUser()
    },
    handleCurrentChange(e) {
      this.pageNum = e
      this.getCaijiaUser()
    },
    addHandle(){
      this.$router.push({
        name:'caijiaUserAdd'
      })
    },
    deleteCaijiaUser(row){
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
      // let obj = {}
      // obj.name= row.name
      // obj.mobile= row.mobile
      // obj.password= row.password
      // obj.priceMarketType= row.priceMarketType
      // // 省市区
      // obj.province = row.province
      // obj.city = row.city
      // obj.area = row.area
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
