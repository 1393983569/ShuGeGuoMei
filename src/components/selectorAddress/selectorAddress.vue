<template>
  <div style="margin:10px;display:inline;">
    <span class="size-color">省:</span>
    <el-select v-model="provinceId" style="width:90px;font-size:18px;color:#6e7b99;">
      <el-option v-for="item in provinceList" :key="item.id" :value="item.id" :label="item.name" />
    </el-select>
    <span class="size-color">市:</span>
    <el-select v-model="cityId" style="width:90px;font-size:18px;color:#6e7b99;">
      <el-option v-for="item in cityList" :key="item.id" :value="item.id" :label="item.name" />
    </el-select>
    <span class="size-color">区/县:</span>
    <el-select v-model="countryId" style="width:90px;font-size:18px;color:#6e7b99;">
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
      countryId: '',
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
    'countryId'(e) {
      this.countryId = e
      this.$emit('getCountry', this.countryId)
    }
  }
}
</script>
<style>
/* .item{
  font-size:18px;
  color:#6e7b99;
  font-weight:bold;
} */
</style>
