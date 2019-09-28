<template>
  <div>
    <breadcrumb :stateShow ='false'>
      <span>会员ID：{{memberId}}</span>
      <span>手机号：{{mobile}}</span>
    </breadcrumb>
    <div class="records-container border">
      <div style="margin:10px;">订单号：{{orderNo}}</div>
      <div class="member flex-row">
        <div class="member-msg" style="border-right: 1px solid rgba(187,187,187,1);">手机号：{{mobile}}</div>
        <div class="member-msg">会员ID：{{memberId}}</div>
      </div>
      <el-table :data="dataList">
        <el-table-column prop="goodsName" label="商品名称"/>
        <el-table-column prop="id" label="商品ID"/>
        <el-table-column prop="unit" label="单位"/>
        <el-table-column prop="price" label="单价">
          <template slot-scope="scope">
            {{scope.row.price/100}}
          </template>
        </el-table-column>
        <el-table-column prop="account" label="折扣">
          <template slot-scope="scope">
            {{discountAbility/100}}
          </template>
        </el-table-column>
        <el-table-column prop="detailAmount" label="数量"/>
        <el-table-column prop="money" label="金额">
          <template slot-scope="scope">
            {{scope.row.money/100}}
          </template>
        </el-table-column>
      </el-table>
      <div class="total">
        <div>
          <div class="flex-row" style="margin-left:30px;"><p>合计：</p><p>￥{{totalMoney/100}}</p></div><hr class="border" style="margin-left:20px;margin-right:20px;"/>
          <div class="flex-row border-bottom" style="padding-left:30px;"><p>折扣终价（-{{discount/100}}）：</p><p>￥{{finalMoney/100}}</p></div>
        </div>
        <div class="flex-row border-bottom" style="padding-left:30px;">
          <p>备注：{{remark}}</p>
        </div>
        <div class="flex-row" style="padding-left:30px;">
          <p>结单（去零）：{{zeroMoney/100}}</p>
        </div>
      </div>
    </div>
    <p>收银员：{{cashier}}</p>
  </div>
</template>
<script>
import breadcrumb from '@/components/Breadcrumb'
import { getRecordsDetail } from '@/api/member.js'
export default {
  components:{
    breadcrumb
  },
  name:'expenseCalendarDetail',
  data() {
    return {
      dataList:[],
      recordId:'',
      memberId:'',
      mobile:'',
      orderNo:'',
      remark:'',
      totalMoney:'',
      recordObject:{},
      finalMoney:'',
      zeroMoney:'',
      discountAbility :'',
      discount:'',
      cashier: '',
      historyObj:{}
    }
  },
  mounted(){

    if(JSON.stringify(this.$route.params) === '{}'){

    }else{
      console.log(this.$route.params)
      this.recordId = this.$route.params.id
      this.getRecordsDetail()
    }
  },
  methods: {
    getRecordsDetail() {
      getRecordsDetail(this.recordId).then(res => {
        if(res.status === 1){
          this.recordObject = res.info
          this.memberId = res.info.memberId
          this.mobile = res.info.mobile
          this.dataList = res.info.goodsList
          this.orderNo = res.info.orderDomain.orderNo
          this.remark = res.info.remark
          this.totalMoney = res.info.orderDomain.totalMoney
          this.finalMoney = res.info.finalMoney
          this.zeroMoney = res.info.zeroMoney
          this.discountAbility = res.info.memberDomain.discountAbility
          this.discount = this.totalMoney-this.finalMoney
          this.cashier = res.info.adminDomain.mobile
        }else{

        }
      }).catch(err => {
        console.log(err)
        this.$message.error('查询记录详情出错')
      })
    }
  }
}
</script>
<style>
.flex-row{
  display:flex;
  flex-direction:row;
}
.position{
  position: relative;
  right: 10px;
}
.border{
  border:1px solid rgba(187,187,187,1);
}
.border-bottom{
  border-bottom: 1px solid rgba(187,187,187,1);
}
.records-container{
  width:48%;
  padding:1px;
}
.member{
  width:100%;
}
.member-msg{
  width:45%;
  margin:10px;
}
.total{

}
</style>
