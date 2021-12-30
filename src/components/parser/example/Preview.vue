<template>
  <div class="test-form">
    <parser :form-conf="formConf" @submit="sumbitForm" />
  </div>
</template>

<script>
import Parser from '../Parser'

// 若parser是通过安装npm方式集成到项目中的，使用此行引入
// import Parser from 'form-gen-parser'
// 若parser是通过安装npm方式集成到项目中的，使用此行引入
// import Parser from 'form-gen-parser'

export default {
  components: {
    Parser
  },
  props: {},
  data() {
    return {
      key2: +new Date(),
      formConf: {}       
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    // 表单数据回填，模拟异步请求场景
    setTimeout(() => {
      // 请求回来的表单数据
      let cfg = sessionStorage.getItem('BFS_FLOW_PREVIEW_FORM');
      if(cfg) {
        this.formConf = JSON.parse(cfg);
      }
      //this.fillFormData(this.formConf, data)
      // 更新表单
      this.key2 = +new Date()
    }, 100)
  },
  methods: {     
    sumbitForm(data) {
      console.log('提交数据：', data)
    }   
  }
}
</script>

<style lang="scss" scoped>
.test-form {
  margin: 15px auto;
  width: 750px;
  padding: 15px;
  border : 1px solid #F0F0F0;
}
</style>
