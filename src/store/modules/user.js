import { logout, login, getInfo } from '@/api/user'
import { getToken, setToken, removeToken, setUserId, getUserId } from '@/utils/auth'
import { getButtonRole, getRole } from '@/utils/logic'
import router, { resetRouter } from '@/router'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: [],
  roleId: '',
  buttonRoleList: [],
  vipObject:{},
  orderObject:{}
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_ROLEID: (state, roleId) => {
    state.roleId = roleId
  },
  SET_BUTTONROLELIST: (state, buttonRoleList) => {
    state.buttonRoleList = buttonRoleList
  },
  SET_VIPOBJECT:(state, vipObject) => {
    state.vipObject = vipObject
  },
  SET_ORDEROBJECT:(state, orderObject) => {
    state.orderObject = orderObject
  }
}

const actions = {
  // 用户登录
  // commit 解构赋值 默认传一个state 只取其中的commit
  login({ commit }, userInfo) {
    const { mobile, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ mobile: mobile, password: password }).then(response => {
        const data = response
        commit('SET_TOKEN', 'chengGong')
        commit('SET_NAME', data.info.name)
        // commit('SET_ROLEID', data.info.role.id)
        setUserId(data.info.role.id)
        setToken(data.info.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 获取用户信息
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(getUserId()).then(response => {
        try {
          console.log(JSON.parse(response.info.menu), 'json.....')
          // return
          let buttonRoleList = getButtonRole(JSON.parse(response.info.menu))
          let roleList = getRole(JSON.parse(response.info.menu))
          commit('SET_ROLEID', response.info.roleId)
          commit('SET_BUTTONROLELIST', buttonRoleList)
          commit('SET_ROLES', roleList)
          commit('SET_AVATAR', 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif')
          const data = {
            buttonRoleList: state.buttonRoleList,
            name: state.name,
            avatar: state.avatar,
            introduction: state.introduction,
            roles: state.roles
          }
          if (!data) {
            reject('验证失败，请重新登录。')
          }
          const { roles, name, avatar, introduction } = data
          if (!roles || roles.length <= 0) {
            reject('getInfo:角色必须是非空数组!')
          }
          resolve(data)
        } catch (e) {
          console.log(e)
        }
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 用户退出
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(getUserId()).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // 动态地修改权限
  changeRoles({ commit, dispatch }, role) {
    return new Promise(async resolve => {
      const token = role + '-token'

      commit('SET_TOKEN', token)
      setToken(token)

      const { roles } = await dispatch('getInfo')

      resetRouter()

      // 根据角色生成可访问路由映射
      const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })

      // 动态添加可访问路由
      router.addRoutes(accessRoutes)

      // 重置已访问视图和缓存视图
      dispatch('tagsView/delAllViews', null, { root: true })

      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
