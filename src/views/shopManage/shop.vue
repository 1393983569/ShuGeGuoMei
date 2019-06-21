<template>
  <div class="body-margin">
    <div style="display:float;flex-direction: row;align-items: center;">
      <selectorAddress :province1id="provinceId" :city1id="cityId" :county1id="countyId" @getProvince="getProvince" @getCity="getCity" @getCounty="getCounty" />
      <span class="item">经营模式:</span>
      <el-select v-model="management" style="width:100px;">
        <el-option v-for="item in managementList" :key="item.id" :value="item.id" :label="item.name" />
      </el-select>
      <span class="item">排序:</span>
      <el-select v-model="orderId" style="width:100px;">
        <el-option v-for="item in orderList" :key="item.id" :value="item.id" :label="item.name" />
      </el-select>
      <div style="float:right;">
        <el-button @click="handleSearch">筛选</el-button>
        <el-button @click="handleClearCondition">清空</el-button>
        <el-button @click="handleAdd">新建</el-button>
      </div>
    </div>
    <div>
      <el-table
        :row-style="tableRowStyle"
        :header-cell-style="tableHeaderColor"
        :data="shopTable"
        center
        stripe
        class="table-margin-top table-font-color"
      >
        <el-table-column prop="id" label="店铺ID" width="200px" />
        <el-table-column prop="simpleName" label="店铺简称" />
        <el-table-column prop="name" label="店铺名称" />
        <el-table-column prop="vipNum" label="会员数" />
        <el-table-column prop="management" label="经营模式" />
        <el-table-column prop="shopownerName" label="掌柜姓名" />
        <!-- <el-table-column prop="employeeNum" label="职员人数" /> -->
        <el-table-column prop="operate" label="操作" width="300px">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button v-if="scope.row.status === 1" size="mini" @click="handleStart(scope.row)">启用</el-button>
            <el-button v-else size="mini" @click="handleStart(scope.row)">停用</el-button>
            <el-button size="mini" @click="handleDelete(scope.row)">删除</el-button>
            <el-button size="mini" @click="handleDetail(scope.row)">详情</el-button>
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
    <shop-edit :show-edit="showEdit" :show-state="showState" :dialog-title="dialogTitle" :edit-object="editObject" @isClose="isClose" />
    <!-- 店铺详情 -->
    <shop-detail :show-detail="showDetail" :shop-object="shopObject" @isCloseDetail="isCloseDetail" />
    <el-dialog :visible.sync="showDelete" center width="380px" title="删除商品" style="border-ra">
      <div width="100%" style="font-size: 17px;display: flex;justify-content:center;align-items: center;height:100px;border-radius: 10px;">是否删除该商品？</div>
      <div slot="footer" style="boeder:1px solid black">
        <el-button style="width:160px;border:none;font-size:18px;" @click="showDelete = false">取消</el-button>
        <el-button style="width:160px;border:none;font-size:18px;">确定</el-button>
      </div>
    </el-dialog>
    <!-- 删除弹框 -->
    <el-dialog :visible.sync="showDelete" center width="380px" title="删除商品" style="border-ra">
      <div width="100%" style="font-size: 17px;display: flex;justify-content:center;align-items: center;height:100px;border-radius: 10px;">是否删除该商品？</div>
      <div slot="footer" style="boeder:1px solid black">
        <el-button style="width:160px;border:none;font-size:18px;" @click="showDelete = false">取消</el-button>
        <el-button style="width:160px;border:none;font-size:18px;" @click="confirmDelete">确定</el-button>
      </div>
    </el-dialog>
    <!-- 启用弹框 -->
    <el-dialog :visible.sync="showStart" center width="380px" title="启用店铺" style="border-ra">
      <div width="100%" style="font-size: 17px;display: flex;justify-content:center;align-items: center;height:100px;border-radius: 10px;">是否启用该店铺？</div>
      <div slot="footer" style="boeder:1px solid black">
        <el-button style="width:160px;border:none;font-size:18px;" @click="showStart = false">取消</el-button>
        <el-button style="width:160px;border:none;font-size:18px;" @click="confirmStart">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
// import { Message } from 'element-ui'
import selectorAddress from '@/components/selectorAddress/selectorAddress.vue'
import shopEdit from './shopEidt.vue'
import shopDetail from './shopDetail.vue'
import { getShopList, deleteShop, startShop } from '@/api/shop.js'
// import { sync } from 'glob'
export default {
  components: {
    selectorAddress, shopEdit, shopDetail
  },
  data() {
    return {
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
      // 排序
      orderList: [
        {
          id: 1,
          name: '销售额'
        },
        {
          id: 2,
          name: '会员数'
        }
      ],
      // 经营模式
      managementList: [
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
      countyId: ''
    }
  },
  watch: {},
  mounted() {
    this.getShopList()
  },
  methods: {
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
      this.shopTable = []
      const obj = {}
      obj.pageNum = this.pageNum
      obj.pageSize = this.pageSize
      obj.provinceId = this.provinceId
      obj.cityId = this.cityId
      obj.countyId = this.countyId
      obj.management = this.management
      getShopList(obj).then(res => {
        console.log(res, 'jjjjjjjjjj')
        if (res.status === 1) {
          this.total = res.info.totalrecord
          // this.$message.success('启用成功！')
          res.info.records.map(e => {
            // console.log(e, 'gggggg')
            if (e.management === 1) {
              e.management = '直营'
            } else {
              e.management = '加盟'
            }
            this.shopTable.push(e)
          })
        }
      })
    },
    // 修改table tr行的背景色
    tableRowStyle({ row, rowIndex }) {
      // return 'background-color: pink'
    },
    // 修改table header的背景色
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'background-color:#f0f2f3;font-size:18px;color:#6e7b99;font-family:Microsoft YaHei;'
      }
    },
    handleAdd() {
      this.showEdit = true
      this.showState = true
      this.dialogTitle = '新建'
    },
    // 删除店铺
    handleDelete(row) {
      this.showDelete = true
      this.id = row.id
    },
    confirmDelete() {
      deleteShop(this.id).then(res => {
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
      console.log(row, 'row,,,,,,')
      this.showStart = true
      this.id = row.id
      this.name = row.name
    },
    // 确定启用店铺
    async confirmStart() {
      this.status = 0
      const res = await startShop(this.id, this.status)
      if (res.status === 1) {
        this.$message.success('启用成功！')
        this.showStart = false
        this.getShopList()
      } else {
        this.$message.error(res.info)
      }
    },
    handleEdit(row) {
      console.log(row, 'row,,,,,,')
      this.showEdit = true
      this.showState = false
      this.dialogTitle = '编辑'
      this.editObject = row
      // this.$router.push({ path:'/'})
    },
    handleDetail(row) {
      this.showDetail = true
      console.log(row, 'row...')
      this.shopObject = row
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
