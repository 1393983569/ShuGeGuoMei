<template>
  <div>
    <breadcrumb>
      <el-button @click="explainHandle">会员系统说明</el-button>
    </breadcrumb>
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
      <el-select v-model="level" placeholder="请选择" size="mini" style="width:140px;">
        <el-option
          v-for="item in rankList"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
      <div style="diplay:float;float:right;">
        <el-button size="mini" tpe="primary" @click="searchVip">筛选</el-button>
        <el-button size="mini" type="danger" @click="clearVip">清除</el-button>
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
      <el-table-column prop="id" label="会员ID"></el-table-column>
      <el-table-column prop="mobile" label="手机号"></el-table-column>
      <el-table-column prop="identity" label="身份">
        <template slot-scope="scope">
          <p v-if="scope.row.identity===1">家庭会员</p>
          <p v-else>VIP会员</p>
        </template>
      </el-table-column>
      <el-table-column prop="level" label="级别">
        <template slot-scope="scope">
          <p v-if="scope.row.level===1">普通会员</p>
          <p v-else-if="scope.row.level===2">银牌会员</p>
          <p v-else-if="scope.row.level===3">金牌会员</p>
          <p v-else>钻石会员</p>
        </template>
      </el-table-column>
      <el-table-column prop="shopName" label="注册店铺" ></el-table-column>
      <el-table-column prop="registerTime" label="注册时间"></el-table-column>
      <el-table-column prop="balance" label="余额（元）"></el-table-column>
      <el-table-column prop="score" label="积分"></el-table-column>
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
            @click="deleteVipHandle(scope.row)"
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
    <hint v-model="showDelete" title="删除会员" text="是否删除该会员？" @confirm="confirmDelete" />
  </div>
</template>

<script>
import hint from '@/components/Hint'
import Breadcrumb from '@/components/Breadcrumb'
import { getAllShop } from '@/api/shop.js'
import { deleteVip, getVipList, vipDetail} from '@/api/member.js'
export default {
  name: 'MemberList',
  components:{
    hint,Breadcrumb
  },
  props: {
    row: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      showDelete:false,
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
          id: 2,
          name:'银牌会员'
        },
        {
          id: 3,
          name:'金牌会员'
        },
        {
          id: 4,
          name:'钻石会员'
        },
      ],
      rankId: '',
      dataList: [],
      total: 0,
      pageSize: 10,
      pageNum: 1,
      input2: '',
      identityId:'',
      level: '',
      vipId:''
    }
  },
  mounted() {
    this.getAllShopList()
    this.getVipList()
  },
  methods: {
    // 查看详情
    viewDetails(index, row) {
      this.$router.push({
        name: 'membershipDetails',
        params: row
      })
    },
    searchVip(){
      this.getVipList()
    },
    clearVip(){
      this.identityId = ''
      this.level= ''
      this.getVipList()
    },
    // 确认删除会员
    confirmDelete(){
      deleteVip(this.vipId).then(res => {
        if(res.status === 1){
          this.getVipList()
          this.$message.success('删除成功！')
          this.showDelete = false
        }else{
          this.$message.error('删除失败')
        }
      }).catch(err => {
        this.$message.error('删除失败')
      })
    },
    // 删除会员
    deleteVipHandle(row) {
      this.vipId = row.id
      this.showDelete = true
    },
    // 查询会员列表
    getVipList(){
      getVipList(this.identityId, this.level, this.pageNum, this.pageSize).then(res => {
        if(res.status === 1){
          this.dataList = res.info.records
          this.total = res.info.totalrecord
        }
      }).catch(err => {
        this.$message.error(err)
      })
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
    // 会员系统说明
    explainHandle(){
      this.$router.push({
        name:'explain'
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
