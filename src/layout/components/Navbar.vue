<template>
  <div class="navbar" style="position: fixed;width:100%;z-index:20;top:0px;">
    <hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />
    <div class="right-menu">
      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click" style="position:fixed;top:0px;z-index:21;right:0px;">
        <div class="avatar-wrapper" style="height:5%;">
          <img :src="avatar" class="user-avatar">
          <span> {{adminName}}</span>
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" style="position:fixed;top:40px;z-index:21;right:0px;width:100px;">
          <el-dropdown-item>
            <span style="display:block;" @click="logout">退出登录</span>
          </el-dropdown-item>
          <el-dropdown-item>
            <span style="display:block;" @click="ownCenter">个人中心</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import ErrorLog from '@/components/ErrorLog'
import Screenfull from '@/components/Screenfull'
import SizeSelect from '@/components/SizeSelect'
import Search from '@/components/HeaderSearch'
import { getAvatar,getUserName } from '@/utils/auth'

export default {
  data(){
    return{
      avatar: '',
      adminName:''
    }
  },
  components: {
    // Breadcrumb,
    Hamburger,
    ErrorLog,
    Screenfull,
    SizeSelect,
    Search
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'device'
    ])
  },
  watch:{
    'change'(e){
      console.log(e, 'touxiangllllll')
    }
  },
  mounted(){
    this.adminName = getUserName()
    this.avatar = getAvatar()
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    ownCenter(){
      this.$router.push({name:'owner'})
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 46px;
  overflow: hidden;
  position: relative;
  background: #fff;
  // box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    // height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    // height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      // height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        // margin-top: 1px;
        position: relative;
        display: flex;
        flex-direction: row;
        align-items: center;

        .user-avatar {
          border:1px solid #e3e3e3;
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
          margin-right:10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -10px;
          top: 20px;
          font-size: 12px;
          left:88px;
        }
      }
    }
  }
}
</style>
