<template>
  <div>
    <breadcrumb>
      <el-button>导出</el-button>
    </breadcrumb>
    <div></div>
    <div>
      店铺：
      <el-select v-model="shopId" placeholder="请选择" size="mini" style="width:140px;">
        <el-option
          v-for="item in shopList"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
    </div>
  </div>
</template>
<script>
import Breadcrumb from '@/components/Breadcrumb'
import { getAllShop } from '@/api/shop.js'
export default {
  components:{
    Breadcrumb
  },
  data() {
    return{
      shopList:[],
      shopId:''
    }
  },
  mounted() {
    this.getAllShopList()
  },
  methods:{
    // 查询所有店铺
    getAllShopList() {
      getAllShop().then(res => {
        this.shopList = res.info
      }).catch(err => {
        console.log(err)
        this.$message.error('查询店铺出错')
      })
    },
  }
}
</script>
<style>

</style>
