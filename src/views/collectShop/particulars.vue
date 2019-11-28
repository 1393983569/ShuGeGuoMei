<template>
  <div>
    <breadcrumb :stateShow ="stateShow"><el-button @click="handleEdit" type="primary" size="mini">编辑</el-button></breadcrumb>
    <div v-if="row.goodId">商品ID：{{ row.goodId.toString().substring(row.goodId.length-4) }}</div>
    <div v-if="categoryOne">一级品类：{{ categoryOne.name}} (ID: {{ categoryOne.id }})</div>
    <div v-else>一级品类：暂无数据</div>
    <div v-if="categoryTwo">二级品类：{{ categoryTwo.name }} (ID: {{ categoryTwo.id }})</div>
    <div v-else>二级品类：暂无数据</div>
    <div>商品名称：{{ row.goodName}}</div>
    <div>
      <div style="display: inline-block; vertical-align: top">缩略图： </div>
      <img
        style="width: 100px; height: 100px; display: inline-block"
        :fit="fit"
        :src="row.goodSmallImg"
      />
    </div>
    <div style="display: block">
      <div style="display: inline-block; vertical-align: top">展示图： </div>
      <img
        style="width: 150px; height: 150px; display: inline-block"
        :fit="fit"
        :src="row.goodBigImg"
      />
    </div>
    <div>标签：{{ row.goodTab }}</div>
    <div>规格：{{ row.goodStandard }}</div>
    <div>单位：{{ row.goodUnit }}</div>
    <div>备注：{{ row.goodRmark }}</div>
    <div>保质期：{{ row.goodQualityDate }}</div>
    <div>保鲜期：{{ row.goodFreshDate }}</div>
    <div>产地：{{ row.countryId === 999999 ? '国外':'国内'+ '-' +province.name+ ' '+city.name+ ' '+area.name }}</div>
    <div>状态：{{ row.goodState=== 0 ? '有货': '缺货' }}</div>
    <div>进价：{{ row.goodPurchasePrice/100 }}元</div>
    <div>出价：{{ row.goodSellPrice/100 }}元</div>
    <div>零售价：{{ row.goodPrice/100 }}元</div>
    <div style="margin:20px;">
      <div style="font-size:14px;font-weight:bold;">零售价参考价</div>
      <el-table :data="getAddressTable" size="mini" style="width:450px;">
          <el-table-column prop="price_market_name" label="采集点" />
          <el-table-column prop="price" label="价格">
            <template slot-scope="scope">
              <p v-if="scope.row.price === '--'">--</p>
              <p v-else>{{parseFloat(scope.row.price)/100}}</p>
            </template>
          </el-table-column>
        </el-table>
    </div>
  </div>
</template>
<script>
import virtualList from 'vue-virtual-scroll-list'
import { seeDetailsGoods } from '@/api/collectShop.js'
import Breadcrumb from '@/components/Breadcrumb'
export default {
  name: 'Particulars',
  components: { Breadcrumb },
  data() {
    return {
      getAddressTable:[
        {
          getAddress:'采集点1',
          price:13,
        }
      ],
      row: {},
      categoryOne: {},
      categoryTwo: {},
      province: {},
      city: {},
      area: {},
      goodSmallImg: '',
      goodBigImg: '',
      img: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      fit: 'fit',
      id: '',
      stateShow:false,
    }
  },
  // beforeRouteEnter(to, form, next) {
  //   next(mv => {
  //     mv.row = to.params.row
  //     // console.log(mv.row, 'ssssssssssssssssssss')
  //   })
  // },
  mounted() {
    this.stateShow = true
    if (JSON.stringify(this.$route.params)!=='{}') {
      this.goodId = this.$route.params.id
      this.getDetailsGoods()
    } else if(this.$store.state.user.goodsObject){
      this.goodId = this.$store.state.user.goodsObject.id
      this.getDetailsGoods()
    }else{}
    // this.showRow()
  },
  methods: {
    handleEdit() {
      if(this.row) {
        this.row.id = this.row.goodId
        this.$router.push({
          name: 'addAndEdit',
          params: {
            row: this.row
          }
        })
      }
    },
    getDetailsGoods() {
      seeDetailsGoods(this.goodId).then(res => {
        if(res.info) {
          this.getAddressTable = res.info.priceGoodsList
          if(res.info.categoryOne){
            this.categoryOne = res.info.categoryOne
          }else{
            this.categoryOne = {name:'',id:''}
          }
          if(res.info.categoryTwo){
            this.categoryTwo = res.info.categoryTwo
          }else{
            this.categoryTwo = {name:'',id:''}
          }
          this.row = res.info
          this.province = res.info.province
          this.city = res.info.city
          this.area = res.info.area
        }else{
          this.$message.error('查询详情失败!')
        }
      }).catch(err => {})
    }
    // showRow() {
    //   console.log(this.row)
    // }
  }
}
</script>

<style scoped>
div{
  margin-top:4px;
}
</style>
