<template>
  <div style="margin:10px;display:inline;">
    <!-- <p>{{province1Id, city1Id, county1Id}}</p> -->
    <span class="size-color font-weight">省:</span>
    <el-select v-model="provinceId" style="width:90px;font-size:18px;color:#6e7b99;">
      <el-option v-for="item in provinceList" :key="item.id" :value="item.id" :label="item.name" />
    </el-select>
    <span class="size-color font-weight">市:</span>
    <el-select v-model="cityId" style="width:90px;font-size:18px;color:#6e7b99;">
      <el-option v-for="item in cityList" :key="item.id" :value="item.id" :label="item.name" />
    </el-select>
    <span class="size-color font-weight">区/县:</span>
    <el-select v-model="countyId" style="width:90px;font-size:18px;color:#6e7b99;">
      <el-option v-for="item in countyList" :key="item.id" :value="item.id" :label="item.name" />
    </el-select>
  </div>
</template>
<script>
import { getProvince, getCity, getArea } from '@/api/priovinCityArea.js'
export default {
  props: {
    province1Id: {
      type: String,
      default: '',
      require: true
    },
    city1Id: {
      type: String,
      default: '',
      require: true
    },
    county1Id: {
      type: String,
      default: '',
      require: true
    }
  },
  data() {
    return {
      provinceId: '',
      cityId: '',
      countyId: '',
      cityList: [],
      countyList: [],
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
          this.countyList = res.info
        } else {
          this.$message.error('查询区县失败！')
        }
      }).catch(err => {
        this.$message.error(err)
      })
    },
    'countyId'(e) {
      this.countyId = e
      this.$emit('getCounty', this.countyId)
    },
    'province1Id'(e) {
      this.provinceId = e
    },
    'city1Id'(e) {
      this.cityId = e
    },
    'county1Id'(e) {
      this.countyId = e
    }
  },
  mounted() {
    this.getProvinceList()
    if (this.province1Id) {
      this.provinceId = this.province1Id
    }
    if (this.city1Id) {
      this.cityId = this.city1Id
    }
    if (this.county1Id) {
      this.countyId = this.county1Id
    }
  },
  methods: {
    getProvinceList() {
      getProvince().then(res => {
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
