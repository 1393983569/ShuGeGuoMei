<template>
  <div>
    <breadcrumb :stateShow ='false'>
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
        label="充值时间"
      >
        <template slot-scope="scope">
          <p>{{ scope.row.date }}</p>
        </template>
      </el-table-column>
      <el-table-column
        prop="money"
        label="充值金额（元）"
      >
        <template slot-scope="scope">
          <p>{{ scope.row.money }}</p>
        </template>
      </el-table-column>
      <el-table-column
        prop="operatePerson"
        label="经办人"
      >
        <template slot-scope="scope">
          <p>{{ scope.row.operatePerson }}</p>
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
import virtualList from 'vue-virtual-scroll-list'
import Breadcrumb from '@/components/Breadcrumb'
export default {
  name: 'rechargeRecord',
  components:{Breadcrumb},
  props: {
    row: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      pageSize:10,
      pageNum:1,
      total:0,
      dataList: [
        {
          date: '2016-05-02',
          money: '￥140.00',
          operatePerson: '三三'
        },
        {
          date: '2016-05-02',
          money: '￥140.00',
         operatePerson: '三三'
        },
        {
          date: '2016-05-02',
          money: '￥140.00',
          operatePerson: '三三'
        },
        {
          date: '2016-05-02',
          money: '￥140.00',
          operatePerson: '三三'
        },
        {
          date: '2016-05-02',
          money: '￥140.00',
          operatePerson: '三三'
        },
        {
          date: '2016-05-02',
          money: '￥140.00',
          operatePerson: '三三'
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
    handleSizeChange(e){
      this.pageSize = e
    },
    handleCurrentChange(e){
      this.pageNum = e
    }
  }
}
</script>

<style scoped>

</style>
