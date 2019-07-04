<template>
  <div>
    <div class="block">
      <el-cascader
        @expand-change="expandData"
        v-model="value"
        :props="areaList"
      ></el-cascader>
    </div>
  </div>
</template>

<script>
  import {selectSysProvince, selectSysCity, selectSysArea} from '@/api/category/cityList'
  export default {
    name: 'cityList',
    data() {
      return {
        areaList: {
          lazy: true,
          lazyLoad (node, resolve) {
            let state = ''
            console.log(node)
            if (node.data) {
              state = node.data.state
            } else {
              state = 4
            }
            let provinceList = []
            if (state === 4) {
              selectSysProvince().then(res => {
                res.info.forEach((item, index) => {
                  provinceList.push({
                    value: item.id,
                    label: item.name,
                    children: [],
                    state: 1
                  })
                })
                resolve(provinceList)
              }).catch(err => {
                console.log(err)
              })
            } else if (state === 1) {
              selectSysCity(node.value).then(res => {
                res.info.forEach((item, index) => {
                  provinceList.push({
                    value: item.id,
                    label: item.name,
                    children: [],
                    state: 1
                  })
                })
                resolve(provinceList)
              }).catch(err => {

              })
            }
          }
        }
      }
    },
    mounted() {
      this.getProvince()
    },
    methods: {
      // 获取省
      getProvince() {

      },
      // 获取市
      getCity() {
        selectSysCity().then(res => {

        }).catch(err => {

        })
      },
      // 获取区 县
      getArea() {
        selectSysArea().then(res => {

        }).catch(err => {

        })
      },
      expandData(e) {
        console.log(e)
      }
    }
  }
</script>

<style scoped>

</style>
