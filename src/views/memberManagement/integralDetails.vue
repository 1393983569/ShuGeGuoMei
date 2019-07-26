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
        label="积分变动时间"
      >
        <template slot-scope="scope">
          <p>{{ scope.row.date }}</p>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="积分变动项目"
      >
        <template slot-scope="scope">
          <p>{{ scope.row.name }}</p>
        </template>
      </el-table-column>
      <el-table-column
        prop="address"
        label="积分值（+/-）"
      >
        <template slot-scope="scope">
          <div style="display: inline-block">{{ scope.row.address }}</div>
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
  name: 'MemberList',
  components: {Breadcrumb},
  props: {
    row: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      dataList: [
        {
          date: '2016-05-02',
          name: '消费商品',
          address: '+140'
        },
        {
          date: '2016-05-02',
          name: '消费商品',
          address: '+140'
        },
        {
          date: '2016-05-02',
          name: '消费商品',
          address: '+140'
        }
      ],
      total:0,
      pageNum:1,
      pageSize:10,
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
    },
  }
}
</script>

<style scoped>

</style>
