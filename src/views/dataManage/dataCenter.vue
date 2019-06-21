<template>
  <div style="margin:20px;">
    <div style="margin:10px;display:flex;flex-direction: row;font-size:18px;color:#6e7b99;font-weight:bold;align-items:center;">
      店铺名称：
      <el-select v-model="shopId">
        <el-option v-for="item in shopList" :key="item.id" :value="itme.id" :label="item.name" />
      </el-select>
    </div>

    <div>
      <el-container>
        <el-aside width="100px">
          <div style="margin-top:30px;font-size:18px;color:#6e7b99;font-weight:bold;">
            <span>营</span><br>
            <span>业</span><br>
            <span>概</span><br>
            <span>况</span><br>
          </div>
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
  </div>
</template>
<script>
export default {
  data() {
    return {
      shopList: [],
      shopId: ''
    }
  }
}
</script>
<style>
.el-aside {
 
  color: #333;
  text-align: center;
  height: 200px;
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
