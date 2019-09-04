<template>
<div>
  <div style="display: flex; flex-direction: row">
    <pickDate @getPickDate="getPickDate"></pickDate>&nbsp;
    <div>

      类型：<el-select v-model="type" style="width:100px;" placeholder="请选择" size="mini">
        <el-option
          v-for="item in type"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
      订单状态：<el-select v-model="type" style="width:100px;" placeholder="请选择" size="mini">
        <el-option
          v-for="item in status"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
    </div>
    <div style="position: absolute; right: 5px;">
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
  <el-table
    :data="tableData"
    :header-cell-style="{   }"
    center
    stripe
  >
    <el-table-column label="订单时间"  prop="createTime" ></el-table-column>
    <el-table-column label="订单编号" prop="orderNo"> </el-table-column>
    <el-table-column label="订单店铺" prop="name"></el-table-column>
    <el-table-column label="订单金额(元)" prop="total_money"> </el-table-column>
    <el-table-column label="订单类型" prop="type">
      <template slot-scope="scope">
        <p v-if="scope.row.type ===1">销售</p>
        <p v-else-if="scope.row.type===2">退货</p>
        <p v-else-if="scope.row.type===3">采购</p>
        <p v-else>调拨</p>
      </template>
    </el-table-column>
    <el-table-column label="订单状态" prop="states">
      <template slot-scope="scope">
        <p v-if="scope.row.status ===0">未拆单</p>
        <p v-else-if="scope.row.status===1">已拆单</p>
        <p v-else-if="scope.row.status===2">已派单</p>
        <p v-else>已入库</p>
      </template>
    </el-table-column>
    <el-table-column label="子订单数" prop=""></el-table-column>
    <el-table-column
      label="操作"
      width="180"
    >
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="warning"
          @click="viewDetails(scope.$index, scope.row)"
        >查看详情</el-button>
        <el-button
          size="mini"
          type="primary"
          @click="separateBill(scope.$index, scope.row)"
        >拆单</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
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
import pickDate from '@/components/pickDate'
import {getOrder, orderDetail} from '@/api/collectShop/order.js'
import { get } from 'http';
export default {
  name: 'orderFormList',
  components:{pickDate},
  data() {
    return {
      tableData: [],
      optionsType:[
        {
          id: 1,
          name:'销售'
        },
        {
          id: 2,
          name:'退货'
        },
        {
          id: 3,
          name:'采购'
        },
        {
          id: 4,
          name:'调拨'
        }
      ],
      optionsStatus:[
        {
          id: 2,
          name:'已派单'
        },
        {
          id: 3,
          name:'已入库'
        }
      ],
      input2: '',
      total: 0,
      pageSize:10,
      pageNum: 1,
      orderNo:'',
      status: '',
      type: ''
    }
  },
  mounted() {
    this.getOrderList()
  },
  methods: {
    getPickDate(){},
    handleSizeChange(e){
      this.pageSize = e
      this.getOrderList()
    },
    handleCurrentChange(e) {
      this.pageNum = e
      this.getOrderList()
    },
    // 查询订单列表
    getOrderList() {
      let data = {}
      data.orderNo = this.orderNo
      data.pageNum = this.pageNum
      data.pageSize = this.pageSize
      data.states = this.states
      data.type = this.type
      getOrder(data).then(res => {
        if(res.status === 1){
          this.tableData = res.info.records
          this.total = res.info.totalrecord
        }
      }).catch(err => {
        console.log(err)
        this.$message.error('查询订单出错！')
      })
    },
    // 查看详情
    viewDetails(index, row) {
      this.$router.push({
        name: 'orderDetails',
        params: row
      })
    },
    // 拆单
    separateBill(index, row) {
      this.$router.push({
        name: 'separateBill',
        params: row
      })
    }
  }
}
</script>

<style scoped>

</style>
