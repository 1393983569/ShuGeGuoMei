<template>
  <div style="margin:20px;">
    <div style="margin:10px;display:flex;flex-direction: row;font-size:18px;color:#6e7b99;font-weight:bold;align-items:center;">
      店铺名称：
      <el-select v-model="shopId">
        <el-option v-for="item in shopList" :key="item.id" :value="item.id" :label="item.name" />
      </el-select>
    </div>

    <div>
      <el-container>
        <el-aside width="100px" class="asideClass">
          营业概况
          <!-- <span>营</span><br>
          <span>业</span><br>
          <span>概</span><br>
          <span>况</span><br> -->
        </el-aside>
        <el-main>
          <div class="item">
            <div style="font-size:30px;color:#ffa96a;margin-top:50px;">216万</div><br>
            <div style="font-size:18px;color:6e7b99;">实收金额（元）</div>
          </div>
          <div class="item">
            <div style="font-size:30px;color:#ffa96a;margin-top:50px;">+6万</div><br>
            <div>39.5%</div>
            <div>比上年</div>
          </div>
          <div class="item">
            <div style="font-size:30px;color:#ffa96a;margin-top:50px;">72000</div><br>
            <div>总单量（单）</div>
          </div>
          <div class="item">
            <div style="font-size:30px;color:#ffa96a;margin-top:50px;">30</div><br>
            <div>单均价（元）</div>
          </div>
          <div class="item">
            <div style="font-size:30px;color:#ffa96a;margin-top:50px;">2000</div><br>
            <div>会员人数（人）</div>
          </div>
          <div class="item">
            <div style="font-size:30px;color:#ffa96a;margin-top:50px;">800</div><br>
            <div>非会员人数（人）</div>
          </div>
        </el-main>
      </el-container>
    </div>
    <br>
    <div>
      <incomTrend />
    </div>
    <br>
    <div>
      <lossData />
    </div>
    <br>
    <div>
      <goodsData />
    </div>
    <br>
    <div class="font-weight">盈亏分析</div>
    <div style="margin-top:4px;"><promitLoss /></div>
  </div>
</template>
<script>
import { getAllShop } from '@/api/shop.js'
import incomTrend from './jingying/incomTrend.vue'
import lossData from './jingying/lossData.vue'
import goodsData from './jingying/goodsData.vue'
import promitLoss from './promitLoss/promitLoss.vue'
export default {
  components: { incomTrend, lossData, goodsData, promitLoss },
  data() {
    return {
      shopList: [],
      shopId: ''
    }
  },
  mounted() {
    this.getAllShop()
  },
  methods: {
    // 查询所有商铺
    getAllShop() {
      getAllShop().then(res => {
        console.log(res, 'kkkkkkk')
        if (res.status === 1) {
          this.shopList = res.info
        } else {
          this.$message.error('查询店铺失败')
        }
      }).catch(err => {
        console.log(err)
        this.$message.error('查询店铺失败')
      })
    }
  }
}
</script>
<style>
.asideClass {
  color: #333;
  text-align: center;
  line-height:200px;
  margin:0px;
  padding:0px;
}
.el-main {
  display:flex;
  flex-direction: row;
  background-color: #f8fbfc;
  color: #333;
  text-align: center;
   margin:0px;
  padding:0px;
}
.item{
  /* display: flex; */
  align-items: center;
  width:220px;
  text-align: center;
}
</style>
