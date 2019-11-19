// 接口
import { logout, login, getInfo } from '@/api/user'
// Cookies中获取
import { getToken, setToken, removeToken, setUserId, getUserId, setAvatar, getAvatar,setUserName,setUserMobile,setUserRole, setAdminId,getAdminId} from '@/utils/auth'
// getButtonRole：将权限的数据组成想要的格式，getRole：所有权限
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
  orderObject:{},
  discountObject:{},
  goodsObject:{},
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
  },
  SET_DISCOUNTOBJECT:(state, discountObject) => {
    state.discountObject = discountObject
  },
  SET_MOBILE:(state, mobile) => {
    state.mobile = mobile
  },
  SET_ID:(state, id) => {
    state.id = id
  },
  SET_ROLENAME:(state, rolename) => {
    state.rolename = rolename
  },
  SET_GOODSOBJECT:(state, goodsObject) => {
    state.goodsObject = goodsObject
  },
}

const actions = {
  // 用户登录
  // commit 解构赋值 默认传一个state 只取其中的commit
  login({ commit }, userInfo) {
    const { mobile, password, type } = userInfo
    return new Promise((resolve, reject) => {
      login({ mobile: mobile, password: password,type: type }).then(response => {
        const data = response
        // console.log('data.info:', data.info)
        commit('SET_TOKEN', 'chengGong')
        commit('SET_NAME', data.info.name)
        commit('SET_ID', data.info.id)
        commit('SET_MOBILE', data.info.mobile)
        commit('SET_ROLENAME', data.info.role.name)
        commit('SET_AVATAR', data.info.image)
        setUserId(data.info.role.id)
        setAvatar(data.info.image)
        // 用户名
        setUserName(data.info.name)
        setUserMobile(data.info.mobile)
        setUserRole(data.info.role.name)
        setToken(data.info.token)
        setAdminId(data.info.id)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 获取用户信息
  getInfo({ commit, state }) {
    console.log('获取用户信息')
    return new Promise((resolve, reject) => {
      getInfo(getUserId()).then(response => {
        try {
          if(response.info){
            let buttonRoleList = getButtonRole(JSON.parse(response.info.menu))
            let roleList = getRole(JSON.parse(response.info.menu))
            // console.log(roleList, 'roleList.....')
            commit('SET_ROLEID', response.info.roleId)
            commit('SET_BUTTONROLELIST', buttonRoleList)
            commit('SET_ROLES', roleList)
            // console.log(state, 'state........')
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
            // console.log(roles, 'kkkkklength.....')
            if (!roles || roles.length <= 0) {
              reject('getInfo:角色必须是非空数组!')
            }
            resolve(data)
          }else{
            reject('账号未注册！')
          }

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
      logout(getAdminId()).then(() => {
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
