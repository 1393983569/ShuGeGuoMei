<template>
  <div class="body-margin">
    <breadcrumb :stateShow ='false'>
      <el-button size="mini" type="primary" v-if="buttonList.includes('操作')" @click="handleAdd">新建</el-button>
      <el-button size="mini" type="primary" v-else disabled @click="handleAdd">新建</el-button>
    </breadcrumb>
    <div style="display:float;flex-direction: row;align-items: center;">
      <selectorAddress :province1id="provinceId" :city1id="cityId" :county1id="countyId" @getProvince="getProvince" @getCity="getCity" @getCounty="getCounty" />
      <span >经营模式:</span>
      <el-select v-model="management" style="width:100px;" size="mini" clearable>
        <el-option v-for="item in managementList" :key="item.id" :value="item.id" :label="item.name" />
      </el-select>
      <span>排序:</span>
      <el-select v-model="orderId" style="width:100px;" size="mini" clearable>
        <el-option v-for="item in orderList" :key="item.id" :value="item.id" :label="item.name" />
      </el-select>
      <div style="float:right;">
        <el-button type="primaryX" v-if="buttonList.includes('操作')||buttonList.includes('查看')" @click="handleSearch" size="mini">筛选</el-button>
        <el-button type="primaryX" v-else disabled size="mini">筛选</el-button>
        <el-button type="info" v-if="buttonList.includes('操作')||buttonList.includes('查看')" @click="handleClearCondition"  size="mini">清空</el-button>
        <el-button type="info" v-else disabled size="mini">清空</el-button>
      </div>
    </div>
    <div>
      <el-table
        v-loading="loadingTable"
        ref="singleTable"
        :row-style="tableRowStyle"
        :data="shopTable"
        center
        stripe
        :default-sort="tableAttribute"
        class="table-margin-top"
      >
        <el-table-column prop="id" label="店铺ID" width="200px" />
        <el-table-column prop="simpleName" label="店铺简称" />
        <el-table-column prop="name" label="店铺名称" />
        <el-table-column prop="members" label="会员数" />
        <el-table-column prop="management" label="经营模式" />
        <!-- <el-table-column prop="sellNum" label="销售额" /> -->
        <el-table-column prop="adminName" label="掌柜姓名" />
        <el-table-column prop="staffMember" label="职员人数" />
        <el-table-column prop="operate" label="操作" width="400px">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" v-if="buttonList.includes('操作')" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="primary" size="mini" v-else disabled >编辑</el-button>
            <span v-if="buttonList.includes('操作')">
              <el-button type="up" size="mini" v-if="scope.row.status=== 1" @click="handleStart(scope.row)">启用</el-button>
              <el-button type="down" size="mini" v-else @click="handleStart(scope.row)">停用</el-button>
            </span>
            <span v-else-if="!buttonList.includes('操作')">
              <el-button type="up" size="mini" v-if="scope.row.status=== 1" disabled>启用</el-button>
              <el-button type="down" size="mini" v-else disabled>停用</el-button>
            </span>
            <el-button type="danger" size="mini" v-if="buttonList.includes('操作')&&scope.row.status=== 1" @click="handleDelete(scope.row)">删除</el-button>
            <el-button type="danger" size="mini" v-else disabled >删除</el-button>
            <el-button type="warning" size="mini" v-if="buttonList.includes('查看')" @click="handleDetail(scope.row)">详情</el-button>
            <el-button type="warning" size="mini" v-else disabled>详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin:10px;">
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
    <!-- 店铺编辑 -->
    <!-- <shop-edit :show-edit="showEdit" @closeHandle="closeEdit" :show-state="showState" :dialog-title="dialogTitle" :edit-object="editObject" @isClose="isClose" /> -->

    <hint v-model="showDelete" title="删除店铺" text="是否删除该店铺？" @confirm="confirmDelete" />

    <hint v-model="showStart" :title="`${startShopTitle}店铺`" :text="`是否${startShopTitle}该店铺？`" @confirm="confirmStart" />
  </div>
</template>
<script>
import virtualList from 'vue-virtual-scroll-list'
// import { Message } from 'element-ui'
import hint from '@/components/Hint'
import Breadcrumb from '@/components/Breadcrumb'
import selectorAddress from '@/components/selectorAddress/selectorAddress.vue'
import shopEdit from './shopEidt.vue'
// import shopDetail from './shopDetail.vue'
import { getShopList, deleteShop, startShop } from '@/api/shop.js'
import costTable from './costTable.vue'
// import { sync } from 'glob'
export default {
  name: 'shop',
  components: {
    selectorAddress, shopEdit, Breadcrumb, hint,costTable
  },
  data() {
    return {
      loadingTable:false,
      pageNum: 1,
      pageSize: 10,
      total: 0,
      // 店铺属性
      id: 0,
      name: '',
      showEdit: false,
      showState: false,
      showDelete: false,
      showStart: false,
      showDetail: false,
      shopTable: [],
      management: '',
      orderId: '',
      // 启动
      status: 1,
      startShopTitle: '',
      // 排序
      orderList: [
        {
          id: 'sellNum',
          name: '销售额'
        },
        {
          id: 'vipNum',
          name: '会员数'
        }
      ],
      // 经营模式
      managementList: [
        {
          id: 3,
          name: '全部'
        },
        {
          id: 1,
          name: '直营'
        },
        {
          id: 2,
          name: '加盟'
        }
      ],
      dialogTitle: '',
      shopObject: {},
      // 店铺编辑对象
      editObject: {},
      provinceId: '',
      cityId: '',
      countyId: '',
      tableAttribute: {},
      buttonList: [],
      shopId:'',
    }
  },
  beforeRouteEnter(to, from, next){
    next(mv => {
      // console.log(mv, '&&&&&&&')
      // console.log(to,'*****')
      mv.getButton(mv.$store.getters.buttonRoleList, to.name)
    })
  },
  watch: {
    orderId(newValue, oldValue) {
      if (oldValue) {
        this.tableAttribute.order = 'descending'
        this.tableAttribute.prop = newValue
        this.getTableData()
      }
    }
    // }
  },
  mounted() {
    this.getShopList()
  },
  methods: {
    // 按钮权限控制
    getButton(list, name) {
      list.forEach(item => {
        if (item.name === name) {
          this.buttonList = item.checkList
        }
      })
      // console.log(this.bottonList)
    },
    // 分页查询
    handleSizeChange(e) {
      this.pageSize = e
      this.getShopList()
    },
    handleCurrentChange(e) {
      this.pageNum = e
      this.getShopList()
    },
    // 查询店铺列表
    getShopList() {
      this.loadingTable = true
      this.shopTable = []
      const obj = {}
      obj.pageNum = this.pageNum
      obj.pageSize = this.pageSize
      // if (this.provinceId && this.cityId && this.countyId) {
        obj.provinceId = this.provinceId
        obj.cityId = this.cityId
        obj.countyId = this.countyId
      // }
      if(this.management === 3){
        obj.management = ''
      }else{
        obj.management = this.management
      }
      getShopList(obj).then(res => {
        this.loadingTable = false
        if (res.info.records.length > 0) {
          this.total = res.info.totalrecord
          res.info.records.map(e => {
            // console.log(e, 'gggggg')
            if (e.management === 1) {
              e.management = '直营'
            } else {
              e.management = '加盟'
            }
            this.shopTable.push(e)
          })
        } else {
          this.$message.warning('暂无店铺！')
        }
      }).catch(err => {
        this.loadingTable = false
        console.log(err)
        this.$message.error('商铺查询出错！')
      })
    },
    // table排序
    getTableData() {
      var _this = this
      // 清空排序 重新赋值
      _this.$refs.singleTable.clearSort()
      for (const i of _this.$refs.singleTable.columns) {
        if (i.property === _this.tableAttribute.prop) {
          i.order = _this.tableAttribute.order
        } else {
          i.order = ''
        }
      }
    },
    // 修改table tr行的背景色
    tableRowStyle({ row, rowIndex }) {
      // return 'background-color: pink'
    },
    // 修改table header的背景色
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return ' font-size:18px;color:#6e7b99;font-family:Microsoft YaHei;'
      }
    },
    handleAdd() {
      this.$router.push({
        name:'shopEidt',
      })
      // this.showEdit = true
      // this.showState = true
      // this.dialogTitle = '新建'
      // this.editObject = {
      //   provinceId: '',
      //   cityId: '',
      //   countyId: ''
      // }
    },
    // 删除店铺
    handleDelete(row) {
      this.showDelete = true
      this.id = row.id
      this.shopId = row.id
    },
    confirmDelete() {
      deleteShop(this.id, this.shopId).then(res => {
        if (res.status === 1) {
          this.$message.success('删除成功！')
          this.getShopList()
          this.showDelete = false
        } else {
          this.$message.error(res.info)
        }
      }).catch(err => {
        this.$message.error(err)
      })
    },
    // 启用店铺
    handleStart(row) {
      this.showStart = true
      this.id = row.id
      this.name = row.name
      this.status = row.status === 1 ? 0 : 1
      if (this.status === 1) {
        this.startShopTitle = '停用'
      } else {
        this.startShopTitle = '启用'
      }
    },
    // 确定启用店铺
    confirmStart() {
      startShop(this.id, this.status).then(res => {
        this.$message.success(this.startShopTitle + '成功！')
        this.showStart = false
        this.getShopList()
      }).catch(err => {
        console.log(err)
        this.$message.error(this.startShopTitle + '失败！')
      })
    },
    handleEdit(row) {
      // console.log(row, 'kkkkkkkk')
      row.showState = false
      this.$router.push({
        name:'shopEidt',
        params:row,
      })
      // this.$router.push({ path:'/'})
    },
    handleDetail(row) {
      this.$router.push({name: 'shopDetail', params: row})
    },
    isCloseDetail() {
      this.showDetail = false
    },
    getProvince(e) {
      // console.log(e, 'llll')
      this.provinceId = e
    },
    getCity(e) {
      this.cityId = e
    },
    getCounty(e) {
      this.countyId = e
    },
    isClose(e) {
      this.showEdit = e
    },
    // 清空筛选条件
    handleClearCondition() {
      this.provinceId = ''
      this.cityId = ''
      this.countyId = ''
      this.management = ''
      this.orderId = ''
      this.getShopList()
    },
    // 条件查询
    handleSearch() {
      this.getShopList()
    },
    closeEdit(e){
      this.showEdit = e
    }
  }
}
</script>
<style>
.d{
  display: inline;
  flex-direction: row;
}
.item{
  font-size:18px;
  color:#6e7b99;
  font-weight:bold;
}
</style>
