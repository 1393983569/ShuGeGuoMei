<template>
  <div style="border-bottom: 1px solid #bbbbbb; margin-bottom: 10px;display:flex;align-items:center;">
    <div v-if="stateShow" class="back"><i class="el-icon-back" @click="backHandle"></i>&nbsp;<span style="font-weight:bold;">|</span></div>
    <el-breadcrumb class="app-breadcrumb" separator="/">
      <transition-group name="breadcrumb">
        <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path">
          <span v-if="item.redirect==='noRedirect'||index==levelList.length-1" class="no-redirect">{{ item.meta.title }}</span>
          <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
        </el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb>
    <!-- <div style="display: inline-block; line-height: 50px; vertical-align: top; float: right;"> -->
    <div style="position:absolute;right:10px;">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import pathToRegexp from 'path-to-regexp'

export default {
  props:{
    stateShow:{
      default:false,
      type:Boolean
    }
  },
  data() {
    return {
      levelList: null,
      title:'首页'
    }
  },
  watch: {
    $route(route) {
      // if you go to the redirect page, do not update the breadcrumbs
      if (route.path.startsWith('/redirect/')) {
        return
      }
      this.getBreadcrumb()
    },
    'stateShow'(e){
      console.log(e, 'e.....')
      if(e){
        this.title= ''
        this.getBreadcrumb()
      }else{
        this.title="首页"
      }
    }
  },
  created() {
    this.getBreadcrumb()
  },
  methods: {
    backHandle(){
      // console.log('kjhggggg')
      this.$router.back()
    },
    getBreadcrumb() {
      // only show routes with meta.title
      let matched = this.$route.matched.filter(item => item.meta && item.meta.title)
      const first = matched[0]

      if (!this.isDashboard(first)) {
        matched = [{ path: '/dashboard', meta: { title: this.title }}].concat(matched)
      }

      this.levelList = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)
    },
    isDashboard(route) {
      const name = route && route.name
      if (!name) {
        return false
      }
      return name.trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase()
    },
    pathCompile(path) {
      // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
      const { params } = this.$route
      var toPath = pathToRegexp.compile(path)
      return toPath(params)
    },
    handleLink(item) {
      const { redirect, path } = item
      if (redirect) {
        this.$router.push(redirect)
        return
      }
      this.$router.push(this.pathCompile(path))
    }
  }
}
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
.back{
  cursor: pointer;
}
</style>
