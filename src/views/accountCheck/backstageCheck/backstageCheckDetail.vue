<template>
  <div>
    <el-form label-width="100px">
      <el-form-item label="订单编号:">

      </el-form-item>
      <el-form-item label="订单时间:">

      </el-form-item>
      <el-form-item label="订单店铺:">

      </el-form-item>
      <el-form-item label="类型:"></el-form-item>
      <el-form-item label="商品数量:"></el-form-item>
      <el-form-item label="订单明细:">
        一级品类
        <el-table :data="orderDetail" style="width:80%;">
          <el-table-column prop="orderNum" label="商品名称"/>
          <el-table-column prop="orderTime" label="商品ID"/>
          <el-table-column prop="amount" label="规格"/>
          <el-table-column prop="orderType" label="单价"/>
          <el-table-column prop="orderState" label="下单数量"/>
          <el-table-column prop="orderState" label="金额"/>
        </el-table>
        二级品类
        <el-table :data="orderDetail" style="width:80%;">
          <el-table-column prop="orderNum" label="商品名称"/>
          <el-table-column prop="orderTime" label="商品ID"/>
          <el-table-column prop="amount" label="规格"/>
          <el-table-column prop="orderType" label="单价"/>
          <el-table-column prop="orderState" label="下单数量"/>
          <el-table-column prop="orderState" label="金额"/>
        </el-table>
      </el-form-item>
      <el-form-item label="订单状态:"></el-form-item>
      <el-form-item label="子订单列表:">
        <el-table :data="sunOrderDetail" style="width:80%;">
          <el-table-column prop="orderTime" label="订单时间"/>
          <el-table-column prop="orderNum" label="订单编号"/>
          <el-table-column prop="amount" label="商品数量"/>
          <el-table-column prop="orderMoney" label="订单金额（元）"/>
          <el-table-column prop="orderType" label="订单类型"/>
          <el-table-column prop="orderState" label="订单状态"/>
          <el-table-column prop="sunOrderAmount" label="子订单数"/>
          <el-table-column prop="sunOrderAmount" label="订单成本（元）"/>
          <el-table-column prop="sunOrderAmount" label="订单利润（元）"/>
          <el-table-column prop="operate" label="操作">
            <template slot-scope="scope">
              <el-button type="warning" size="mini" @click="handleDetail(scope.row)">查询详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
    </el-form>
    <el-dialog
      title="子订单详情"
      :visible.sync="sunOrderDialog"
      width="60%"
      >
        <el-form label-width="100px">
          <el-form-item label="子订单编号:"></el-form-item>
          <el-form-item label="子订单时间:"></el-form-item>
          <el-form-item label="订单店铺:"></el-form-item>
          <el-form-item label="子订单供应商:"></el-form-item>
          <el-form-item label="子订单明细:">
            一级品类
            <el-table :data="orderDetail" style="width:80%;">
              <el-table-column prop="orderNum" label="商品名称"/>
              <el-table-column prop="orderTime" label="商品ID"/>
              <el-table-column prop="amount" label="规格"/>
              <el-table-column prop="orderType" label="单价"/>
              <el-table-column prop="orderState" label="下单数量"/>
              <el-table-column prop="orderState" label="金额"/>
            </el-table>
            二级品类
            <el-table :data="orderDetail" style="width:80%;">
              <el-table-column prop="orderNum" label="商品名称"/>
              <el-table-column prop="orderTime" label="商品ID"/>
              <el-table-column prop="amount" label="规格"/>
              <el-table-column prop="orderType" label="单价"/>
              <el-table-column prop="orderState" label="下单数量"/>
              <el-table-column prop="orderState" label="金额"/>
            </el-table>
          </el-form-item>
          <el-form-item label="子订单状态:"></el-form-item>
        </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="sunOrderDialog = false">取 消</el-button>
        <el-button type="primary" @click="sunOrderDialog = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'backstageCheckDetail',
  data(){
    return{
      orderDetail:[],
      sunOrderDetail:[],
      sunOrderDetail:[
        {
          orderTime:'2019-7-29',
          orderNum: '123456',
          amount:'50',
          orderMoney:'3000.00',
          orderType:'采购',
          orderState:'已收货',
          sunOrderAmount:'15',
        },
        {
          orderTime:'2019-7-29',
          orderNum: '123456',
          amount:'50',
          orderMoney:'3000.00',
          orderType:'采购',
          orderState:'已收货',
          sunOrderAmount:'15',
        },
        {
          orderTime:'2019-7-29',
          orderNum: '123456',
          amount:'50',
          orderMoney:'3000.00',
          orderType:'采购',
          orderState:'已收货',
          sunOrderAmount:'15',
        }
      ],
      sunOrderDialog:false,
    }
  },
  mounted(){},
  methods:{
    handleSunDetail(){
      this.sunOrderDialog = true
    },
    handleDetail(){
      this.sunOrderDialog = true
    }
  }
}
</script>
