<template>
  <div>
    <div style="margin:10px;">
      店铺：
      <el-select v-model="shopId" placeholder="请选择" size="mini" style="width:140px;">
        <el-option
          v-for="item in shopList"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
      身份：
      <el-select v-model="identityId" placeholder="请选择" size="mini" style="width:140px;">
        <el-option
          v-for="item in identityList"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
      级别：
      <el-select v-model="rankId" placeholder="请选择" size="mini" style="width:140px;">
        <el-option
          v-for="item in rankList"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
      <div style="diplay:float;float:right;">
        <el-button size="mini" tpe="primary">筛选</el-button>
        <el-button size="mini" type="danger">清除</el-button>
      </div>
      <div style="margin-top:5px;margin-bottom:10px;">
        <el-input
          placeholder="请输入关键词进行搜索"
          prefix-icon="el-icon-search"
          v-model="input2" style="width:400px;" size="mini">
        </el-input>
        <el-button size="mini">搜索</el-button>
      </div>
    </div>
    <el-table
      :data="dataList"
      :header-cell-style="{   }"
      center
      stripe
    >
      <el-table-column prop="date" label="会员ID"></el-table-column>
      <el-table-column prop="name" label="手机号"></el-table-column>
      <el-table-column prop="name" label="身份"></el-table-column>
      <el-table-column prop="name" label="级别"></el-table-column>
      <el-table-column prop="name" label="注册店铺" ></el-table-column>
      <el-table-column prop="name" label="注册时间"></el-table-column>
      <el-table-column prop="name" label="余额（元）"></el-table-column>
      <el-table-column prop="name" label="积分"></el-table-column>
      <el-table-column
        label="操作"
        width="280"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="warning"
            @click="viewDetails(scope.$index, scope.row)"
          >查看详情</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="sendOrders(scope.$index, scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top:5px;">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[10, 15]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getAllShop } from '@/api/shop.js'
export default {
  name: 'MemberList',
  props: {
    row: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      shopList: [],
      shopId: '',
      identityList: [
        {
          id: 0,
          name:'家庭会员'
        },
        {
          id: 1,
          name:'VIP会员'
        }
      ],
      identityId: '',
      rankList: [
        {
          id: 0,
          name:'普通会员'
        },
        {
          id: 1,
          name:'普通会员'
        },
        {
          id: 2,
          name:'普通会员'
        },
        {
          id: 3,
          name:'普通会员'
        },
      ],
      rankId: '',
      dataList: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      total: 0,
      pageSize: 10,
      pageNum: 1,
      input2: '',
    }
  },
  mounted() {
    this.getAllShopList()
  },
  methods: {
    // 查看详情
    viewDetails(index, row) {
      this.$router.push({
        name: 'membershipDetails',
        params: {
          row: row
        }
      })
    },
    // 派单
    separateBill(index, row) {
      // this.$router.push({
      //   name: 'separateBill',
      //   params: {
      //     row: row
      //   }
      // })
    },
    // 删除
    removeOrder(index, row) {

    },
    // 查询所有店铺
    getAllShopList() {
      getAllShop().then(res => {
        this.shopList = res.info
      }).catch(err => {
        console.log(err)
        this.$message.error('查询店铺出错')
      })
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

<style scoped>

</style>
