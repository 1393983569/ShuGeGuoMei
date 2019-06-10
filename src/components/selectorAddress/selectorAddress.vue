<template>
  <div style="margin:10px;display:inline;">
    <span class="item">省：</span>
    <el-select v-model="provinceId" style="width:100px;font-size:18px;color:#6e7b99;">
      <el-option v-for="item in provinceList" :key="item.id" :value="item.id" :label="item.name" />
    </el-select>
    <span class="item">市：</span>
    <el-select v-model="cityId" style="width:100px;font-size:18px;color:#6e7b99;">
      <el-option v-for="item in cityList" :key="item.id" :value="item.id" :label="item.name" />
    </el-select>
    <span class="item">区/县：</span>
    <el-select v-model="districtId" style="width:100px;font-size:18px;color:#6e7b99;">
      <el-option v-for="item in districtList" :key="item.id" :value="item.id" :label="item.name" />
    </el-select>
  </div>
</template>
<script>
export default {
  data() {
    return {
      provinceId: '',
      cityId: '',
      districtId: '',
      cityList: [
        {
          id: 1,
          name: '兰州'
        }
      ],
      districtList: [
        {
          id: 1,
          name: '城关'
        }
      ],
      provinceList: [
        {
          id: 1,
          name: '甘肃'
        }
      ]
    }
  },
  watch: {
    'provinceId'(e) {
      this.provinceId = e
      this.$emit('getProvince', this.provinceId)
    },
    'cityId'(e) {
      this.cityId = e
      this.$emit('getCity', this.cityId)
    },
    'districtId'(e) {
      this.districtId = e
      this.$emit('getDistrict', this.districtId)
    }
  }
}
</script>
<style>
.item{
  font-size:18px;
  color:#6e7b99;
  font-weight:bold;
}
</style>
