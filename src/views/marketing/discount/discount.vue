<template>
  <div>
    <breadcrumb :stateShow ='false'>
      <el-button size="mini" type="primary" @click="addDiscount" v-if="buttonList.includes('操作')">新建</el-button>
      <el-button size="mini" type="primary" v-else disabled>新建</el-button>
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
        状态：<el-select v-model="status" placeholder="请选择" size="mini">
          <el-option
            v-for="item in stateList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </div>
      <div style="position:absolute;right:0px;">
        <el-button type="primaryX" size="mini" @click="handleSearch" v-if="buttonList.includes('查看'||'操作')">筛选</el-button>
        <el-button type="primaryX" size="mini" v-else disabled>筛选</el-button>
        <el-button type="danger" size="mini" @click="handleClear" v-if="buttonList.includes('查看'||'操作')">清除</el-button>
        <el-button type="danger" size="mini" v-else disabled>清除</el-button>
      </div>
    </div>
    <el-table v-loading="loadingTable" :data="dataList">
      <el-table-column prop="name" label="折扣包名称"/>
      <el-table-column prop="shopName" label="使用店铺"/>
      <el-table-column prop="" label="折扣商品" :width="200">
        <template slot-scope="scope">
          <span class="outer" v-for="item in scope.row.goods">{{item.goodsName}},</span>
        </template>
      </el-table-column>
      <el-table-column prop="" label="状态">
        <template slot-scope="scope">
          <p v-if="scope.row.status === 0">停用</p>
          <p v-if="scope.row.status === 1">启用</p>
        </template>
      </el-table-column>
      <el-table-column label="操作" :width="400">
        <template slot-scope="scope">
          <el-button size="mini" type="warning" @click="discountDetail(scope.row)" v-if="buttonList.includes('操作')">查看详情</el-button>
          <el-button size="mini" type="warning" @click="discountDetail(scope.row)" v-else disabled>查看详情</el-button>
          <!-- 启用、停用 -->
          <el-button size="mini" type="up" @click="discountStop(scope.row)" v-if="scope.row.status === 0&&buttonList.includes('操作')">启用</el-button>
          <el-button  size="mini" type="down" @click="discountStop(scope.row)" v-else-if="scope.row.status === 1&&buttonList.includes('操作')">停用</el-button>
          <el-button  size="mini" type="down" v-else disabled>停用</el-button>
          <!-- 编辑 -->
          <el-button size="mini" type="primary" v-if="buttonList.includes('操作')" @click="discountEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="primary" v-else disabled>编辑</el-button>
          <!-- 删除 -->
          <el-button size="mini" type="danger"  v-if="buttonList.includes('操作')&&scope.row.status === 0" @click="discountDelete(scope.row)">删除</el-button>
          <el-button size="mini" type="danger"  v-else disabled>删除</el-button>
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
    <hint title="删除折扣包" v-model="showDelete" text="是否删除该折扣包？" @confirm="deleteAdConfirm" />
    <hint :title="title" v-model="showUpdate" :text="text" @confirm="updateConfirm" />
  </div>
</template>
<script>
import virtualList from 'vue-virtual-scroll-list'
import hint from '@/components/Hint'
import breadcrumb from '@/components/Breadcrumb'
import { getAllShop } from '@/api/shop.js'
import {queryDiscount,deleteDiscount, editStatus} from '@/api/marketing/discount.js'
export default {
  components:{
    breadcrumb, hint
  },
  data() {
    return {
      loadingTable: false,
      showDelete:false,
      title:'',
      text:'',
      showUpdate:false,
      status:'',

      shopId:'',
      shopList: [],
      stateList:[
        {
          id:'',
          name:'全部'
        },
        {
          id:0,
          name:'停用'
        },
        {
          id:1,
          name:'启用'
        }
      ],
      dataList:[{}],
      pageSize:10,
      pageNum:1,
      total:0,
      id:'',
      discountPackageId:'',
      buttonList:[],
    }
  },
  beforeRouteEnter(to, from, next) {
    next(mv => {
      mv.getButton(mv.$store.getters.buttonRoleList, to.name)
    })
  },
  mounted(){
    this.getDiscount()
    this.getAllShop()
  },
  methods:{
    getButton(list, name) {
      list.forEach(item => {
        if(item.name === name){
          this.buttonList = item.checkList
        }
      })
    },
    handleSizeChange(e){
      this.pageSize=  e
    },
    handleCurrentChange(e){
      this.pageNum = e
    },
    // 查询所有商铺
    getAllShop() {
      getAllShop().then(res => {
        if (res.status === 1) {
          this.shopList[0] = {
            id:'',
            name:'全部'
          }
          res.info.map(item =>{
            this.shopList.push(item)
          })
        } else {
          this.$message.error('查询店铺失败')
        }
      }).catch(err => {
        console.log(err)
        this.$message.error('查询店铺失败')
      })
    },
    handleSearch(){
      this.getDiscount()
    },
    handleClear(){
      this.shopId = ''
      this.status = ''
      this.getDiscount()
    },
    // 查询折扣列表
    getDiscount(){
      this.loadingTable = true
      queryDiscount(this.pageNum, this.pageSize, this.shopId, this.status).then(res => {
        this.loadingTable = false
        if(res.status === 1){
          this.dataList = res.info.records
          this.total = res.info.totalrecord
        }
      }).catch(err => {
        this.loadingTable = false
        this.$message.error('查询折扣列表失败！')
      })
    },
    // 添加折扣
    addDiscount(){
      let row = {}
      row.addEdit = '添加'
      this.$router.push({name:'discountEditAdd', params:row})
    },
    discountEdit(row){
      row.addEdit = '编辑'
      this.$router.push({name:'discountEditAdd', params: row})
      this.$store.state.user.discountObject = row
    },
    // 查看折扣详情
    discountDetail(row){
      this.$router.push({name:'discountDetail', params: row})
      this.$store.state.user.discountObject = row
    },
    // 删除折扣包
    discountDelete(row){
      this.showDelete = true
      this.id = row.id
      this.discountPackageId = row.goods[0].discountPackageId
    },
    // 确认删除
    deleteAdConfirm(){
      deleteDiscount(this.id, this.discountPackageId).then(res => {
        if(res.status === 1){
          this.$message.success('删除折扣包成功！')
          this.showDelete = false
          this.getDiscount()
        }
      }).catch(err => {
        this.$message.error('删除折扣包失败！')
      })
    },
    // 停用启用
    discountStop(row){
      if(row.status === 0){
        this.id = row.id
        this.status = 1
        this.showUpdate = true
        this.title = '启用折扣包'
        this.text = '是否启用该折扣包？'
      }else if(row.status ===1){
        this.id = row.id
        this.status = 0
        this.showUpdate = true
        this.title = '停用折扣包'
        this.text = '是否停用该折扣包？'
      }
    },
    // 确认启用、停用折扣包
    updateConfirm(){
      editStatus(this.id, this.status).then(res=>{
        if(res.status === 1){
          this.$message.success(this.title+'成功！')
          this.showUpdate = false
          this.status = ''
          this.getDiscount()
        }
      }).catch(err => {
        this.$message.error(this.title+'失败！')
        this.showUpdate = false
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
