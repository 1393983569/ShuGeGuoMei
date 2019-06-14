<template>
  <div style="margin:10px;display:inline;">
    <span class="size-color font-weight">省:</span>
    <el-select v-model="provinceId" style="width:90px;font-size:18px;color:#6e7b99;">
      <el-option v-for="item in provinceList" :key="item.id" :value="item.id" :label="item.name" />
    </el-select>
    <span class="size-color font-weight">市:</span>
    <el-select v-model="cityId" style="width:90px;font-size:18px;color:#6e7b99;">
      <el-option v-for="item in cityList" :key="item.id" :value="item.id" :label="item.name" />
    </el-select>
    <span class="size-color font-weight">区/县:</span>
    <el-select v-model="AreaId" style="width:90px;font-size:18px;color:#6e7b99;">
      <el-option v-for="item in AreaList" :key="item.id" :value="item.id" :label="item.name" />
    </el-select>
  </div>
</template>
<script>
import { getProvince, getCity, getArea } from '@/api/priovinCityArea.js'
export default {
  data() {
    return {
      provinceId: '',
      cityId: '',
      AreaId: '',
      cityList: [],
      AreaList: [],
      provinceList: []
    }
  },
  watch: {
    'provinceId'(e) {
      this.provinceId = e
      this.$emit('getProvince', this.provinceId)
      getCity(this.provinceId).then(res => {
        if (res.status === 1) {
          this.cityList = res.info
        } else {
          this.$message.error('查询城市失败！')
        }
      }).catch(err => {
        this.$message.error(err)
      })
    },
    'cityId'(e) {
      this.cityId = e
      this.$emit('getCity', this.cityId)
      getArea(this.cityId).then(res => {
        if (res.status === 1) {
          this.AreaList = res.info
        } else {
          this.$message.error('查询区县失败！')
        }
      }).catch(err => {
        this.$message.error(err)
      })
    },
    'countryId'(e) {
      this.countryId = e
      this.$emit('getCountry', this.countryId)
    }
  },
  mounted() {
    this.getProvinceList()
  },
  methods: {
    getProvinceList() {
      getProvince().then(res => {
        // console.log(res, 'res....')
        if (res.status === 1) {
          this.provinceList = res.info
        } else {
          this.$message.error('查询省份失败！')
        }
      }).catch(err => {
        this.$message.error(err)
      })
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
