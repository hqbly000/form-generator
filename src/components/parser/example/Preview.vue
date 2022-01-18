<template>
  <div class="test-form">
    <parser :form-conf="formConf" @submit="sumbitForm" ref="praser"/>
  </div>
</template>

<script>
import Parser from "../Parser";

/**
 * 获得指定范围内的随机数字
 * @param min
 * @param max
 * @returns {*}
 */
const getRandomNum = (min, max) => {
  // min最小值，max最大值
  return +new Date() + (Math.floor(Math.random() * (max - min)) + min);
};


const getRow = () => {
  return {
    __config__: {
      layout: "rowFormItem",
      tagIcon: "row",
      layoutTree: true,
      document: "",
      span: 24,
      formId: 0,
      renderKey: getRandomNum(),
      componentName: "row" + getRandomNum(),
      children: []
    },
    type: "default",
    justify: "start",
    align: "top"
  };
};

const clone = target => {
  return JSON.parse(JSON.stringify(target));
};

export default {
  components: {
    Parser
  },
  props: {},
  data() {
    return {
      key2: +new Date(),
      formConf: {},
      sourceConf : {}
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    let that = this;
    window.addEventListener("message", function(e){
      if(e.data === 'getFormData'){
        let res = that.getFormData();
        res && e.source.postMessage("previewSubmit",e.origin)
      }
    })
    // 表单数据回填，模拟异步请求场景
    setTimeout(() => {
      // 请求回来的表单数据
      let cfg = sessionStorage.getItem("BFS_FLOW_PREVIEW_FORM");
      if (cfg) {
        let formConfig = JSON.parse(cfg);
        const fields = formConfig["fields"];
        let arr = fields.map(field => {
          let row = getRow();
          field["__config__"]["span"] = 12;
          return row;
        });
        formConfig["fields"] = arr;
        formConfig["buildRules"] = false;
        this.sourceConf = fields;
        this.formConf = formConfig;
      }
      //this.fillFormData(this.formConf, data)
      // 更新表单
      this.key2 = +new Date();
    }, 50);
  },
  methods: {
    sumbitForm(){

    },
    getFormData(){
      const formData = this.$refs['praser'].getFormData();
      let data  =this.sourceConf.map(conf => {
        let fieldName = conf.__vModel__;
        let fieldVisible = formData [fieldName + "Visible"] ? "1" : "0";
        let fieldEdit = formData [fieldName + "Edit"] ? "1" : "0";
        return {
					"allowedEdit": fieldEdit,
					"allowedNull": "",
					"allowedSee": fieldVisible,
					"columnId": 0,
					"columnLabel": conf.__config__.label,
					"columnName": fieldName,
					"defaultValue": "",
					"formSettingId": 0,
					"id": 0,
					"remark": ""
				}
      })
      parent.store.setData("processFormColumnSettings",data);
      return true;
    }
  }
};
</script>

<style lang="scss" scoped>
.test-form {
  margin: 15px auto;
  width: 750px;
  padding: 15px;
  border: 1px solid #f0f0f0;
}
</style>
