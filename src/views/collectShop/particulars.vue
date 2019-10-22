<template>
  <div>
    <breadcrumb :stateShow ="stateShow"><el-button @click="handleEdit" type="primary" size="mini">编辑</el-button></breadcrumb>
    <p v-if="row.goodId">商品ID：{{ row.goodId.toString().substring(row.goodId.length-4) }}</p>
    <p v-if="categoryOne">一级品类：{{ categoryOne.name}} (ID: {{ categoryOne.id }})</p>
    <p v-else>一级品类：暂无数据</p>
    <p v-if="categoryTwo">二级品类：{{ categoryTwo.name }} (ID: {{ categoryTwo.id }})</p>
    <p v-else>二级品类：暂无数据</p>
    <p>商品名称：{{ row.goodName}}</p>
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
    <p>标签：{{ row.goodTab }}</p>
    <p>规格：{{ row.goodStandard }}</p>
    <p>单位：{{ row.goodUnit }}</p>
    <p>备注：{{ row.goodRmark }}</p>
    <p>保质期：{{ row.goodQualityDate }}</p>
    <p>保鲜期：{{ row.goodFreshDate }}</p>
    <p>产地：{{ row.countryId === 999999 ? '国外':'国内'+ '-' +province.name+ ' '+city.name+ ' '+area.name }}</p>
    <p>状态：{{ row.goodState=== 0 ? '有货': '缺货' }}</p>
    <p>进价：{{ row.goodPurchasePrice/100 }}元</p>
    <p>出价：{{ row.goodSellPrice/100 }}元</p>
    <p>零售价：{{ row.goodPrice/100 }}元</p>
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

</style>
