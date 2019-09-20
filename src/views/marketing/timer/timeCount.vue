<template>
  <div class="notice" v-show="show">
    <div class="notice-box">
      <div class="notice-content">
        您长时间没有操作，系统将在
        <span>{{ noticeLeftTime/1000 }}</span>秒后返回首页
      </div>
      <button @click="cancelReturn">取消返回</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      listenTime: 0,
      noticeTime: 0,
      listenTimerIdx: 0,
      noticeTimerIdx: 0,
      noticeLeftTime: 0
    }
  },
  methods: {
    startListen: function(noOpsTime, showTime) {
      this.show = false
      this.listenTime = noOpsTime * 1000
      this.noticeTime = showTime * 1000
      this.listenBody()
    },
    listenBody: function() {
      this.resetTimer()
      window.addEventListener('mousedown', this.resetTimer)
      window.addEventListener('keydown', this.resetTimer)
      window.addEventListener('click', this.resetTimer)
      window.addEventListener('touchmove', this.resetTimer)
      window.addEventListener('touchstart', this.resetTimer)
    },
    resetTimer: function(event) {
      if (this.show) {
        return
      }
      if (this.listenTimerIdx) {
        clearTimeout(this.listenTimerIdx)
      }
      this.listenTimerIdx = setTimeout(this.showNotice, this.listenTime)
    },
    showNotice: function() {
      this.noticeLeftTime = this.noticeTime
      this.show = true
      let that = this
      this.noticeTimerIdx = setInterval(function() {
        if (that.noticeLeftTime <= 0) {
          that.returnHome()
        } else {
          that.noticeLeftTime -= 1000
        }
      }, 1000)
    },
    clearNotice: function() {
      if (this.noticeTimerIdx) {
        clearInterval(this.noticeTimerIdx)
      }
      if (this.show) {
        this.show = false
      }
    },
    cancelReturn: function() {
      this.clearNotice()
      this.resetTimer()
    },
    returnHome: function() {
      this.clearNotice()
      clearTimeout(this.listenTimerIdx)
      window.location = '/'
    }
  }
}
</script>

<style scoped>
.notice {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.notice-box {
  width: 250px;
  height: 150px;
  background-color: #efefef;
  box-shadow: 0 0 10px #777777;
  border-radius: 5px;
}
.notice-content {
  height: 40%;
  margin: 0 auto;
  padding: 20px;
}
span {
  color: red;
}
</style>
