<template>
  <div style="margin:10px;display:inline;">
    <!-- <p>{{province1Id, city1Id, county1Id}}</p> -->
    <span class="font-weight">省:</span>
    <el-select v-model="provinceId" style="width:90px;" size="mini">
      <el-option v-for="item in provinceList" v-if="item" :key="item.id" :value="item.id" :label="item.name" />
    </el-select>
    <span class="font-weight">市:</span>
    <el-select v-model="cityId" style="width:90px;"  size="mini">
      <el-option v-for="item in cityList" v-if="item" :key="item.id" :value="item.id" :label="item.name" />
    </el-select>
    <span class="font-weight">区/县:</span>
    <el-select v-model="countyId" style="width:90px;"  size="mini">
      <el-option v-for="item in countyList" v-if="item" :key="item.id" :value="item.id" :label="item.name" />
    </el-select>
  </div>
</template>
<script>
import { getProvince, getCity, getArea } from '@/api/priovinCityArea.js'
export default {
  props: {
    province1id: {
      type: String,
      default: '',
      require: true
    },
    city1id: {
      type: String,
      default: '',
      require: true
    },
    county1id: {
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
      if (e !== null) {
        this.provinceId = e
        this.$emit('getProvince', this.provinceId)
        getCity(this.provinceId).then(res => {
          if (res.info.length > 0) {
            // console.log(res.info, 'city;;;;')
            this.cityList = res.info
          } else {
            // this.$message.error('暂无城市')
          }
        }).catch(err => {
          console.log(err)
          this.$message.error('查询城市出错！')
        })
      }
    },
    'cityId'(e) {
      console.log(e)
      // return
      if (e) {
        this.cityId = e
        this.$emit('getCity', this.cityId)
        getArea(this.cityId).then(res => {
          if (res.info.length > 0) {
            // console.log('ddddddd')
            this.countyList = res.info
          } else {
            // this.$message.error('暂无区县！')
          }
        }).catch(err => {
          console.log(err)
          this.$message.error('查询区县出错！')
        })
      }
    },
    'countyId'(e) {
      this.countyId = e
      this.$emit('getCounty', this.countyId)
    },
    'province1id'(e) {
      this.provinceId = e
    },
    'city1id'(e) {
      this.cityId = e
    },
    'county1id'(e) {
      this.countyId = e
    }
  },
  mounted() {
    this.getProvinceList()
    if (this.province1id) {
      this.provinceId = this.province1id
    }
    if (this.city1id) {
      this.cityId = this.city1id
    }
    if (this.county1id) {
      this.countyId = this.county1id
    }
  },
  methods: {
    getProvinceList() {
      getProvince().then(res => {
        if (res.info.length > 0) {
          console.log(res.info,'province......')
          this.provinceList = res.info
        } else {
          this.$message.info('暂无省份！')
        }
      }).catch(err => {
        console.log(err)
        this.$message.error('查询省份出错！')
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
