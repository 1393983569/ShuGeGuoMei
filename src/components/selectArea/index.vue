<template>
  <!-- props 接收已选的数组 组件自身触发一个selectList事件返回已选值 -->
  <div>
    <div class="block">
      <el-cascader
        v-if="options.length !== 0"
        @change="expandData"
        v-model="valueData"
        :props="areaList"
        :options="options"
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
                    state: 2
                  })
                })
                resolve(provinceList)
              }).catch(err => {

              })
            } else if (state === 2) {
              selectSysArea(node.value).then(res => {
                res.info.forEach((item, index) => {
                  provinceList.push({
                    value: item.id,
                    label: item.name,
                    state: 3,
                    leaf: true
                  })
                })
                resolve(provinceList)
              }).catch(err => {

              })
            }
          }
        },
        valueData: [],
        options: []
      }
    },
    props: {
      idList: {
        type: Array,
        default: () => []
      }
    },
    watch: {
      idList(e) {
        this.valueData = e
        this.getArea(e[0], e[1])
      }
    },
    mounted() {

    },
    methods: {
      async getArea(provinceId, sysCityId) {
        this.options = []
        let provinceList = await selectSysProvince()
        let sysCityList = await selectSysCity(provinceId)
        let sysAreaList = await selectSysArea(sysCityId)
        let islt1 = []
        let islt2 = []
        let islt3 = []
        provinceList.info.forEach((item, index) => {
          islt1.push({
            value: item.id,
            label: item.name,
            children: [],
            state: 1
          })
        })
        sysCityList.info.forEach((item, index) => {
          islt2.push({
            value: item.id,
            label: item.name,
            children: [],
            state: 2
          })
        })
        sysAreaList.info.forEach((item, index) => {
          islt3.push({
            value: item.id,
            label: item.name,
            leaf: true,
            state: 3
          })
        })
        // 递归拼合数据
        const getList = (arr) => {
          arr.forEach(item => {
            if (item.children) {
              // 一级的时候放入二级
              if (item.state === 1 && item.value === provinceId) {
                item.children = islt2
              }
              // 二级的时候放入三级
              if (item.state === 2 && item.value === sysCityId) {
                item.children = islt3
              }
              item.children = getList(item.children)
            }
          })
          return arr
        }
        this.options = getList(islt1)
      },
      expandData(e) {
        this.$emit('selectList', e)
      }
    }
  }
</script>

<style scoped>

</style>
