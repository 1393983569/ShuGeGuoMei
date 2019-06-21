<template>
  <div>
    <h3>会员系统说明：</h3>
    <div class="components-container">
      <tinymce v-model="content"></tinymce>
    </div>
  </div>
</template>

<script>
  import tinymce from '@/components/Tinymce'
  export default {
    name: 'explain',
    components: {
      tinymce
    },
    data() {
      return{
        content: ''
      }
    }
  }
</script>

<style scoped>

</style>
