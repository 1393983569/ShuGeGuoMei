<template>
    <div>
      <el-dialog
        :show-close="false"
        :close-on-click-modal="false"
        :title="title"
        :visible.sync="value"
        width="30%"
        center
        class="dialogCustom"
      >
        <div class="dialogBorder">
          <el-button style="width:300px;" @click="shareH5">分享H5</el-button>
        </div>
        <div slot="footer" class="dialog-footer botton">
          <div style="border-right: 1px #DDDDDD solid" @click="clickCancel">
            {{leftButton}}
          </div>
          <div @click="clickConfirm">
            {{rightButton}}
          </div>
        </div>
      </el-dialog>
    </div>
</template>

<script>
  export default {
    name: 'hintSend',
    props: {
      text: {
        type: String
      },
      leftButton: {
        type: String,
        default: '取消'
      },
      rightButton: {
        type: String,
        default: '确定'
      },
      title: {
        type: String,
        default: ''
      },
      value: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return{
        hintShow: false
      }
    },
    methods: {
      // 取消
      clickCancel() {
        this.$emit('input', false)
      },
      // 确定
      clickConfirm() {
        this.$emit('confirm')
      },
      shareH5(){
        console.log('lllllll')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .botton {
    display: flex;
    > div{
      flex: 1;
      display: inline-block;
      text-align: center;
      height: 60px;
      line-height: 60px;
      cursor: pointer;
      &:active{
        background-color: #DDDDDD;
      }
    }
  }
  .dialogBorder{
    text-align: center;
    border-top: 1px #DDDDDD solid;
    border-bottom: 1px #DDDDDD solid;
    padding: 60px 20px;
  }
</style>
