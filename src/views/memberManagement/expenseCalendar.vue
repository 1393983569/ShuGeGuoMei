<template>
  <div>
    <breadcrumb>
      <div style="display:flex;flex-direction:row;">
        <div>会员ID：021AH135617926</div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <div>手机号：13619390363</div>
      </div>
      </breadcrumb>
      <el-table
        :data="dataList"
        :header-cell-style="{   }"
        center
        stripe
      >
        <el-table-column
          prop="date"
          label="消费时间"
        >
          <template slot-scope="scope">
            <p>{{ scope.row.date }}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="消费店铺"
        >
          <template slot-scope="scope">
            <p>{{ scope.row.name }}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="num"
          label="订单编号"
        >
          <template slot-scope="scope">
            <div style="display: inline-block">{{ scope.row.num }}</div>
            <el-button
              style="display: inline-block"
              size="mini"
              type="warning"
              @click="viewDetails(scope.$index, scope.row)"
            >查看详情</el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="money"
          label="支付金额"
        >
          <template slot-scope="scope">
            <p>{{ scope.row.money }}</p>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageNum"
          :page-sizes="[10,15]"
          :page-size="pageSize"
          :background="true"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </div>

</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'
export default {
  name: 'expenseCalendar',
  components: {
    Breadcrumb
  },
  props: {
    row: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      pageNum:1,
      pageSize:10,
      total:0,
      dataList: [
        {
          date: '2016-05-02',
          name: '王小虎',
          num: '620101200119022610001',
          money: '￥140.00'
        },
        {
          date: '2016-05-02',
          name: '王小虎',
          num: '620101200119022610001',
          money: '￥140.00'
        },
        {
          date: '2016-05-02',
          name: '王小虎',
          num: '620101200119022610001',
          money: '￥140.00'
        },
        {
          date: '2016-05-02',
          name: '王小虎',
          num: '620101200119022610001',
          money: '￥140.00'
        }
      ]
    }
  },
  mounted() {

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
    handleSizeChange(){},
    handleCurrentChange(){},
  }
}
</script>

<style scoped>

</style>
