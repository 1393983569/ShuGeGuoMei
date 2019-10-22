<template>
  <div>
    <breadcrumb :stateShow ='stateShow'>
      <div style="display:flex;flex-direction:row;">
        <div>会员ID：{{vipId}}</div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <div>手机号：{{mobile}}</div>
      </div>
      </breadcrumb>
      <el-table
        :data="dataList"
        :header-cell-style="{   }"
        center
        stripe
      >
        <el-table-column prop="createTime" label="消费时间" ></el-table-column>
        <el-table-column prop="shopName" label="消费店铺" ></el-table-column>
        <el-table-column
          prop="orderNo"
          label="订单编号"
          width="300"
        >
          <template slot-scope="scope">
            <div style="display: inline-block">{{ scope.row.orderNo }}</div>
            <el-button
              style="display: inline-block"
              size="mini"
              type="warning"
              @click="viewDetails(scope.$index, scope.row)"
            >查看详情</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="finalMoney" label="支付金额">
          <template slot-scope="scope">
            ￥{{scope.row.finalMoney/100}}
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
import { getVipRecords } from '@/api/member.js'
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
      stateShow:false,
      pageNum:1,
      pageSize:10,
      total:0,
      dataList: [],
      mobile:'',
      vipId: '',
      vipObject:{},
      // historyObj:{}
    }
  },
  mounted() {
    this.stateShow = true
    console.log(this.$store, 'store..')
    if(JSON.stringify(this.$route.params) === '{}') {
      this.vipObject = this.$store.state.user.vipObject
      this.mobile = this.vipObject.mobile
      this.vipId = this.vipObject.id
      this.getVipRecords()
    }else{
      this.vipObject = this.$route.params
      this.mobile = this.$route.params.mobile
      this.vipId = this.$route.params.id
      this.getVipRecords()
    }

  },
  methods: {
    // 查看详情
    viewDetails(index, row) {
      this.$router.push({
        name: 'expenseCalendarDetail',
        params: row
      })
    },
    getVipRecords() {
      getVipRecords(this.vipId,this.pageNum, this.pageSize).then(res => {
        if(res.status === 1){
          this.dataList = res.info.records
          this.total = res.info.totalrecord
        }
      }).catch(err => {
        console.log(err)
        this.$message.error('记录查询出错！')
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
