<template>
  <div class="test-form">
    <parser :form-conf="formConf" @submit="sumbitForm" />
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
      document:
        "https://element.eleme.cn/#/zh-CN/component/layout#row-attributes",
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

const getShowSwitch = (modelName) => {
  return {
    __config__: {
      label: "是否可见",
      tag: "el-switch",
      tagIcon: "switch",
      defaultValue: false,
      span: 6,
      showLabel: true,
      labelWidth: null,
      layout: "colFormItem",
      required: false,
      regList: [],
      changeTag: true,
      document: "https://element.eleme.cn/#/zh-CN/component/switch",
      formId: 0,
      renderKey: getRandomNum()
    },
    style: {},
    disabled: false,
    "active-text": "",
    "inactive-text": "",
    "active-color": null,
    "inactive-color": null,
    "active-value": true,
    "inactive-value": false,
    __vModel__: modelName
  };
};

const getEditSwitch = (modelName) => {
  return {
    __config__: {
      label: "是否可编辑",
      tag: "el-switch",
      tagIcon: "switch",
      defaultValue: false,
      span: 6,
      showLabel: true,
      labelWidth: null,
      layout: "colFormItem",
      required: false,
      regList: [],
      changeTag: true,
      document: "https://element.eleme.cn/#/zh-CN/component/switch",
      formId: 0,
      renderKey: getRandomNum()
    },
    style: {},
    disabled: false,
    "active-text": "",
    "inactive-text": "",
    "active-color": null,
    "inactive-color": null,
    "active-value": true,
    "inactive-value": false,
    __vModel__: modelName
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
      formConf: {}
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
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
          row.__config__.children.push(clone(field));
          row.__config__.children.push(getShowSwitch(field.__vModel__ + "Visible"));
          row.__config__.children.push(getEditSwitch(field.__vModel__ + "Edit"));
          return row;
        });
        formConfig["fields"] = arr;
        formConfig["buildRules"] = false;
        this.formConf = formConfig;
      }
      //this.fillFormData(this.formConf, data)
      // 更新表单
      this.key2 = +new Date();
    }, 100);
  },
  methods: {
    sumbitForm(data) {
      
      console.log("提交数据：", data);
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
