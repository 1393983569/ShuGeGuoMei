<template>
  <div style="margin:10px;display:inline;">
    <!-- <p>{{province1Id, city1Id, county1Id}}</p> -->
    <span>省:</span>
    <el-select  v-model="provinceId" @focus="openSelectPro" style="width:90px;" size="mini" clearable>
      <el-option  v-for="item in provinceList" v-if="item" :key="item.id" :value="item.id" :label="item.name" />
    </el-select>
    <span>市:</span>
    <el-select v-model="cityId" style="width:90px;" @focus="openSelectCit"  size="mini" clearable>
      <el-option v-for="item in cityList" v-if="item" :key="item.id" :value="item.id" :label="item.name" />
    </el-select>
    <span>区/县:</span>
    <el-select v-model="countyId" style="width:90px;"  size="mini" clearable>
      <el-option v-for="item in countyList" v-if="item" :key="item.id" :value="item.id" :label="item.name" />
    </el-select>
  </div>
</template>
<script>
import { getProvince, getCity, getArea } from '@/api/priovinCityArea.js'
export default {
  props: ['province1id','city1id','county1id'],
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
  mounted(){
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
  watch: {
    'provinceId'(e) {
      if (e) {
        this.provinceId = e
        if(this.statePro){
          this.cityId = ''
          this.countyId = ''
        }
        this.$emit('getProvince', this.provinceId)
        getCity(this.provinceId).then(res => {
          if (res.info.length > 0) {
            this.cityList = res.info
          } else {
            // this.$message.error('暂无城市')
          }
        }).catch(err => {
          console.log(err)
          this.$message.error('查询城市出错！')
        })
      }else{
        // console.log('kong......')
        this.cityId = ''
        this.countyId = ''
        this.cityList = []
        this.countyList = []
      }
    },
    'cityId'(e) {
      if (e) {
        this.cityId = e
        if(this.stateCit){
          this.countyId = ''
        }
        this.$emit('getCity', this.cityId)
        getArea(this.cityId).then(res => {
          if (res.info.length > 0) {
            this.countyList = res.info
          } else {
            // this.$message.error('暂无区县！')
          }
        }).catch(err => {
          console.log(err)
          this.$message.error('查询区县出错！')
        })
      }else{
        this.countyId = ''
        this.countyList=[]
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
  methods: {
    openSelectPro(event, item){
      this.statePro = true
    },
    openSelectCit(event, item){
      this.stateCit = true
    },
    getProvinceList() {
      getProvince().then(res => {
        if (res.info.length > 0) {
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
