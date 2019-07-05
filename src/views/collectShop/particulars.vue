<template>
  <div>
    <breadcrumb><el-button @click="handleEdit">编辑</el-button></breadcrumb>
    <p>商品ID：{{ row.goodId }}</p>
    <p>一级品类：{{ row.categoryOne.name}} (ID: {{ row.categoryOne.id }})</p>
    <p v-if="row.categoryTwo">二级品类：{{ row.categoryTwo.name }} (ID: {{ row.categoryTwo.id }})</p>
    <p v-else>二级品类：暂无数据</p>
    <p>商品名称：{{ row.goodName}}</p>
    <div>
      <div style="display: inline-block; vertical-align: top">缩略图： </div>
      <el-image
        style="width: 100px; height: 100px; display: inline-block"
        :fit="fit"
        :src="row.goodSmallImg"
      />
    </div>
    <div style="display: block">
      <div style="display: inline-block; vertical-align: top">展示图： </div>
      <el-image
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
    <p>产地：{{ row.countryId === 999999 ? '国外':'国内'+ '-' +row.province.name+ ' '+row.city.name+ ' '+row.area.name }}</p>
    <p>状态：{{ row.goodState=== 0 ? '有货': '缺货' }}</p>
    <p>进价：{{ row.goodPurchasePrice }}</p>
    <p>出价：{{ row.goodSellPrice }}</p>
    <p>零售价：{{ row.goodPrice }}</p>
  </div>
</template>
<script>
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
      id: ''
    }
  },
  // beforeRouteEnter(to, form, next) {
  //   next(mv => {
  //     mv.row = to.params.row
  //     // console.log(mv.row, 'ssssssssssssssssssss')
  //   })
  // },
  mounted() {
    if (JSON.stringify(this.$route.params.row) !== '{}') {
      console.log(this.$route.params)
      this.goodId = this.$route.params.row.id
      this.getDetailsGoods()
    } else (
      window.history.go(-1)
    )
    // this.showRow()
  },
  methods: {
    handleEdit() {
      if(this.row) {
        console.log(this.row, 'jjjjjj')
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
        console.log(res, '#######')
        this.row = res.info
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
