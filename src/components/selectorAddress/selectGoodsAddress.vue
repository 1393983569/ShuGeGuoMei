<template>
  <div style="display:inline;">
    <!-- <p>{{province1Id, city1Id, county1Id}}</p> -->
    <span class="font-weight">省:</span>
    <el-select v-model="provinceId" @focus="openSelectPro" style="width:90px;" size="mini" clearable>
      <el-option v-for="item in provinceList" v-if="item" :key="item.id" :value="item.id" :label="item.name" />
    </el-select>
    <span class="font-weight">市:</span>
    <el-select v-model="cityId" style="width:90px;" @focus="openSelectCit"  size="mini" clearable>
      <el-option v-for="item in cityList" v-if="item" :key="item.id" :value="item.id" :label="item.name" />
    </el-select>
    <span class="font-weight">区/县:</span>
    <el-select v-model="countyId" style="width:90px;"  size="mini" clearable>
      <el-option v-for="item in countyList" v-if="item" :key="item.id" :value="item.id" :label="item.name" />
    </el-select>
  </div>
</template>
<script>
import { getAllProvince, getAllCity, getAllArea } from '@/api/priovinCityArea.js'
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
      provinceList: [],
      statePro:false,
      stateCit:false,
    }
  },
  watch: {
    'provinceId'(e) {
      if (e) {
        this.provinceId = e
        if(this.statePro){
          this.cityId = ''
          this.countyId = ''
        }
        this.$emit('getProvince', this.provinceId)
        getAllCity(this.provinceId).then(res => {
          if (res.info.length > 0) {
            this.cityList = res.info
            // this.cityId = ''
            // this.countyId = ''
          } else {
            // this.$message.error('暂无城市')
          }
        }).catch(err => {
          console.log(err)
          this.$message.error('查询城市出错！')
        })
      }else{
        this.cityId = ''
        this.countyId= ''
        this.cityList = []
      }
    },
    'cityId'(e) {
      if (e) {
        this.cityId = e
        if(this.stateCit){
          this.countyId = ''
        }
        this.$emit('getCity', this.cityId)
        getAllCity(this.cityId).then(res => {
          if (res.info.length > 0) {
            this.countyList = res.info
            // this.cityId = ''
            // this.countyId = ''
          } else {
            // this.$message.error('暂无城市')
          }
        }).catch(err => {
          console.log(err)
          this.$message.error('查询城市出错！')
        })
      }else{
        this.countyId= ''
        this.countyList= []
      }
    },
    'countyId'(e) {
      this.countyId = e
      this.$emit('getCounty', this.countyId)
    },
    'province1id'(e) {
      // console.log(e, 'eeeeeee1')
      this.provinceId = e
    },
    'city1id'(e) {
      // console.log(e, 'eeeeeee2')
      this.cityId = e
    },
    'county1id'(e) {
      // console.log(e, 'eeeeeee3')
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
    openSelectCit(){
      this.stateCit = true
    },
    openSelectPro(){
      this.statePro = true
    },
    getProvinceList() {
      getAllProvince().then(res => {
        if (res.info.length > 0) {
          this.provinceList = res.info
        } else {
          this.$message.error('暂无省份！')
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
