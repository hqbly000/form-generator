<template>
  <div class="test-form">
    <parser :form-conf="formConf" @submit="sumbitForm" ref="praser" />
  </div>
</template>

<script>
import Parser from "../ParserSetting";

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

const getShowSwitch = (modelName , formData) => {
  return {
    __config__: {
      label: "是否可见",
      tag: "el-switch",
      tagIcon: "switch",
      defaultValue: formData[modelName] ?  true : false,
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

const getEditSwitch = (modelName , formData) => {
  return {
    __config__: {
      label: "是否可编辑",
      tag: "el-switch",
      tagIcon: "switch",
      defaultValue: formData[modelName] ?  true : false,
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
      formConf: {},
      sourceConf: {}
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    let that = this;
    window.addEventListener("message", function(e) {
      const req = e.data;
      if (e.data === "getFormData") {
        let res = that.getFormData();
        res && e.source.postMessage("previewSubmit", e.origin);
      } else if (req.method && req.method === "initCheckedValues") {
        let formData = {};
        req.data.forEach(d => {
          formData[`${d.columnName}Visible`] = d.allowedSee ? true : false;
          formData[`${d.columnName}Edit`] = d.allowedEdit ? true : false;
        });
        // 请求回来的表单数据
        let cfg = sessionStorage.getItem("BFS_FLOW_PREVIEW_FORM");
        if (cfg) {
          let formConfig = JSON.parse(cfg);
          const fields = formConfig["fields"];
          let arr = fields.map(field => {
            let row = getRow();
            field["__config__"]["span"] = 12;
            row.__config__.children.push(clone(field));
            row.__config__.children.push(
              getShowSwitch(field.__vModel__ + "Visible" , formData)
            );
            if(req.nodeType === 'SequenceFlow') { // 只有连接线才有是否编辑
              row.__config__.children.push(
                getEditSwitch(field.__vModel__ + "Edit" , formData)
              );
            }
            return row;
          });
          formConfig["fields"] = arr;
          formConfig["buildRules"] = false;
          that.sourceConf = fields;
          that.formConf = formConfig;
        }
      }
    });
    // 更新表单
    this.key2 = +new Date();
  },
  methods: {
    sumbitForm() {},
    getFormData() {
      const formData = this.$refs["praser"].getFormData();
      let data = this.sourceConf.map(conf => {
        let fieldName = conf.__vModel__;
        let fieldVisible = formData[fieldName + "Visible"] ? "1" : "0";
        let fieldEdit = formData[fieldName + "Edit"] ? "1" : "0";
        return {
          allowedEdit: fieldEdit,
          allowedNull: "",
          allowedSee: fieldVisible,
          columnId: conf.columnId,
          columnLabel: conf.__config__.label,
          columnName: fieldName,
          defaultValue: "",
          formSettingId: 0,
          id: 0,
          remark: ""
        };
      });
      parent.store.setData("processFormColumnSettings", data);
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
}
</style>
