<template>
  <div>
    <breadcrumb :stateShow ='false'>
      <el-button @click="explainHandle" type="primary" v-if="bottonList.includes('操作')">会员系统说明</el-button>
      <el-button type="primary" v-else disabled>会员系统说明</el-button>
    </breadcrumb>
    <div style="margin:10px;display:flex;flex-direction:row;align-items:center;">
      注册时间：<pickDate @getPickDate="getPickDate" :yearPro="yearPro" :monthPro="monthPro" :dayPro="dayPro"></pickDate>
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
      <el-select v-model="identity" placeholder="请选择" size="mini" style="width:140px;">
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
      <div style="position:absolute;right:4px;">
        <el-button size="mini" type="primaryX" @click="searchVip">筛选</el-button>
        <el-button size="mini" type="info" @click="clearVip">清除</el-button>
      </div>
    </div>
    <div style="margin-top:5px;margin-bottom:10px;">
      <el-input
        clearable
        placeholder="请输入会员ID、手机号、注册店铺搜索"
        prefix-icon="el-icon-search"
        v-model="param" style="width:400px;" size="mini">
      </el-input>
      <el-button size="mini" @click="handleFind">搜索</el-button>
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
      <el-table-column prop="balance" label="余额（元）">
        <template slot-scope="scope">
          {{scope.row.balance/100}}
        </template>
      </el-table-column>
      <el-table-column prop="score" label="积分">
        <template slot-scope="scope">
          <p v-if='scope.row.score'>{{scope.row.score}}</p>
          <p v-else>0</p>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="280"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="warning"
            @click="viewDetails(scope.$index, scope.row)"
            v-if="bottonList.includes('操作')"
          >查看详情</el-button>
          <el-button size="mini" type="warning" v-else disabled>查看详情</el-button>
          <el-button
            size="mini"
            type="danger"
            v-if="bottonList.includes('操作')"
            @click="deleteVipHandle(scope.row)"
          >删除</el-button>
          <el-button size="mini" type="danger" v-else disabled>删除</el-button>
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
    <hint v-model="showDelete" title="删除会员" text="确认删除该会员？" @confirm="confirmDelete" />
    <hint v-model="showScore" title="删除会员" text="该会员还有余额/积分，不可删除" @confirm="confirmScore" />
  </div>
</template>

<script>
import virtualList from 'vue-virtual-scroll-list'
import pickDate from '@/components/pickDate'
import hint from '@/components/Hint'
import Breadcrumb from '@/components/Breadcrumb'
import { getAllShop } from '@/api/shop.js'
import { deleteVip, getVipList, vipDetail} from '@/api/member.js'
export default {
  name: 'memberList',
  components:{
    hint,Breadcrumb,pickDate
  },
  props: {
    row: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      bottonList:[],
      yearPro:'',
      monthPro:'',
      dayPro:'',
      // 时间选择
      yearPro:'',
      monthPro:'',
      dayPro:'',
      showScore:false,
      showDelete:false,
      shopList: [],
      shopId: '',
      identityList: [
        {
          id: 1,
          name:'家庭会员'
        },
        {
          id: 2,
          name:'VIP会员'
        }
      ],
      identityId: '',
      rankList: [
        {
          id: 1,
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
      param: '',
      identity:'',
      level: '',
      vipId:'',
      condition:'',
    }
  },
  beforeRouteEnter (to, form, next) {
  //  console.log(to)
    next(mv => {
      mv.getButton(mv.$store.getters.buttonRoleList, to.name)
  	})
  },
  watch:{
    'param'(e){
      if(e){
        this.param = this.Trim(e)
      }else{
        this.param = ''
        this.getVipLists()
      }
    }
  },
  mounted() {
    this.getAllShopList()
    this.getVipLists()
  },
  methods: {
    getPickDate(date){
      date = date+'-'
      let dateArr = date.split('-')
      // console.log(dateArr, 'date')
      if(dateArr.length === 2){
        this.yearPro = dateArr[0]
      }else if(dateArr.length === 3) {
        this.yearPro = dateArr[0]
        this.monthPro = dateArr[1]
      }else if(dateArr.length === 4){
        this.yearPro = dateArr[0]
        this.monthPro = dateArr[1]
        this.dayPro = dateArr[2]
      }
    },
    Trim(str){
      return str.replace(/(^\s*)|(\s*$)/g, "");
    },
    getButton(list, name) {
      list.forEach(item => {
        if (item.name === name) {
          this.bottonList = item.checkList
        }
      })
      // console.log(this.bottonList)
    },
    getPickDate(date){
      date = date+'-'
      let dateArr = date.split('-')
      // console.log(dateArr, 'date')
      if(dateArr.length === 2){
        this.yearPro = dateArr[0]
      }else if(dateArr.length === 3) {
        this.yearPro = dateArr[0]
        this.monthPro = dateArr[1]
      }else if(dateArr.length === 4){
        this.yearPro = dateArr[0]
        this.monthPro = dateArr[1]
        this.dayPro = dateArr[2]
      }
    },
    // 查看详情
    viewDetails(index, row) {
      this.$router.push({
        name: 'membershipDetails',
        params: row
      })
      this.$store.state.user.vipObject = row
    },
    handleFind(){
      this.getVipLists()
    },
    searchVip(){
      this.getVipLists()
    },
    clearVip(){
      this.yearPro = ''
      this.monthPro = ''
      this.dayPro = ''
      this.identity = ''
      this.level= ''
      this.shopId=''
      this.getVipLists()
    },
    // 确认删除会员
    confirmDelete(){
      deleteVip(this.vipId).then(res => {
        if(res.status === 1){
          this.getVipLists()
          this.$message.success('删除成功！')
          this.showDelete = false
        }else{
          this.$message.error('删除失败')
        }
      }).catch(err => {
        this.$message.error('删除失败')
      })
    },
    confirmScore(){
      this.showDelete = true
      this.showScore = false
    },
    // 删除会员
    deleteVipHandle(row) {
      // console.log(row, 'row.....')
      this.vipId = row.id
      // this.showDelete = true
      if(row.score>0||row.balance>0){
        this.showScore = true
      }
    },
    // 查询会员列表
    getVipLists(){
      getVipList(this.yearPro, this.monthPro, this.dayPro,this.identity, this.level,this.shopId, this.pageNum, this.pageSize, this.param).then(res => {
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
