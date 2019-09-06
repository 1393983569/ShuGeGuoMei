<template>
  <div>
    <breadcrumb>
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
      <el-table-column
        prop="changeTime"
        label="积分变动时间"
      >
        <template slot-scope="scope">
          <p>{{ scope.row.changeTime }}</p>
        </template>
      </el-table-column>
      <el-table-column
        prop="changeItem"
        label="积分变动项目"
      >
        <template slot-scope="scope">
          <p>{{ scope.row.changeItem }}</p>
        </template>
      </el-table-column>
      <el-table-column
        prop="integral"
        label="积分值（+/-）"
      >
        <template slot-scope="scope">
          <div style="display: inline-block">{{ scope.row.integral }}</div>
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
import { getScoreDetail } from '@/api/member.js'
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
      dataList: [],
      total:0,
      pageNum:1,
      pageSize:10,
      vipObject:{},
      vipId:'',
      mobile:''
    }
  },
  mounted() {
    console.log(this.$route.params, 'kkkkkkk')
    if(JSON.stringify(this.$route.params)!=='{}'){
      this.vipObject = this.$route.params
      this.vipId = this.vipObject.id
      this.mobile = this.vipObject.mobile
    }
    this.getScoreDetail()
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
    getScoreDetail(){
      getScoreDetail(this.vipId).then(res => {
        // this.$message.success('查询积分详情成功！')
        console.log(res, 'info.....')
        this.dataList = res.info.records
      }).catch(res => {
        this.$message.error('查询积分详情失败！')
      })
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
