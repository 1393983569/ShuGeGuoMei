
import TimerComponent from './timeCount'

var defListenTime = 2 * 60 // 默认2分钟无操作返回
var defNoticeTime = 10 // 默认提示10s
var $vm

export default {
  install (Vue, options) {
    if (!$vm) {
      const TimerPlugin = Vue.extend(TimerComponent)
      $vm = new TimerPlugin().$mount()
      document.body.appendChild($vm.$el)
    }
    Vue.prototype.$startListen = function (noOpsTime, showTime) {
      noOpsTime = noOpsTime || defListenTime
      showTime = showTime || defNoticeTime
      $vm.startListen(noOpsTime, showTime)
    }
  }
