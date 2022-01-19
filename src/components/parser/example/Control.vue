<template>
  <div class="test-form">
    <parser :form-conf="formConf" :form-control-conf="formControlConf" ref="parser"/>
  </div>
</template>

<script>
import Parser from "../ParserControl";

export default {
  components: {
    Parser
  },
  props: {},
  data() {
    return {
      formConf: {},
      formControlConf: {}
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    const that = this;
    window.addEventListener("message", function(e) {
      let req = e.data;
      //接收最新的规则，
      if (req.method === "initFormConf") {
        that.initFormConf(req.data);
      } else if (req.method === "initFormControlConf") {
        that.initFormConf(req.data);
      }
      // let res = that.getFormData();
      // res && e.source.postMessage("previewSubmit", e.origin);
    });

    this.test();
  },
  methods: {
    test() {
      let formConf = `{"fields":[{"__config__":{"label":"单行文本","labelWidth":null,"showLabel":true,"changeTag":true,"tag":"el-input","tagIcon":"input","required":true,"layout":"colFormItem","span":24,"document":"","regList":[],"showDictSource":true,"dictSource":"0","formId":117,"renderKey":"1171642145207350"},"__slot__":{"prepend":"","append":""},"placeholder":"请输入单行文本","style":{"width":"100%"},"clearable":true,"prefix-icon":"","suffix-icon":"","maxlength":null,"show-word-limit":false,"readonly":false,"disabled":false,"__vModel__":"field117"},{"__config__":{"label":"单行文本","labelWidth":null,"showLabel":true,"changeTag":true,"tag":"el-input","tagIcon":"input","required":true,"layout":"colFormItem","span":24,"document":"","regList":[],"showDictSource":true,"dictSource":"2","formId":116,"renderKey":"1161642145097479"},"__slot__":{"prepend":"","append":""},"placeholder":"请输入单行文本","style":{"width":"100%"},"clearable":true,"prefix-icon":"","suffix-icon":"","maxlength":null,"show-word-limit":false,"readonly":false,"disabled":false,"__vModel__":"field116"},{"__config__":{"label":"多行文本","labelWidth":null,"showLabel":true,"tag":"el-input","tagIcon":"textarea","required":true,"layout":"colFormItem","span":24,"regList":[],"changeTag":true,"document":"https://element.eleme.cn/#/zh-CN/component/input","formId":102,"renderKey":"1021641368172597"},"type":"textarea","placeholder":"请输入多行文本","autosize":{"minRows":4,"maxRows":4},"style":{"width":"100%"},"maxlength":null,"show-word-limit":false,"readonly":false,"disabled":false,"__vModel__":"text2"},{"__config__":{"label":"下拉选择","showLabel":true,"labelWidth":null,"tag":"el-select","tagIcon":"select","layout":"colFormItem","span":24,"required":true,"regList":[],"changeTag":true,"document":"https://element.eleme.cn/#/zh-CN/component/select","formId":103,"renderKey":"1031641368178630","defaultValue":""},"__slot__":{"options":[{"label":"选项一","value":1},{"label":"选项二","value":2},{"label":"选项三","value":3}]},"placeholder":"请选择下拉选择","style":{"width":"100%"},"clearable":true,"disabled":false,"filterable":false,"multiple":false,"__vModel__":"select3"},{"__config__":{"label":"密码","showLabel":true,"labelWidth":null,"changeTag":true,"tag":"el-input","tagIcon":"password","layout":"colFormItem","span":24,"required":true,"regList":[],"document":"https://element.eleme.cn/#/zh-CN/component/input","formId":105,"renderKey":"1051642141752642","defaultValue":"admin123"},"__slot__":{"prepend":"","append":""},"placeholder":"请输入密码","show-password":true,"style":{"width":"100%"},"clearable":true,"prefix-icon":"","suffix-icon":"","maxlength":null,"show-word-limit":false,"readonly":false,"disabled":false,"__vModel__":"field105"},{"__config__":{"label":"下拉选择","showLabel":true,"labelWidth":null,"tag":"el-select","tagIcon":"select","layout":"colFormItem","span":24,"required":true,"regList":[],"changeTag":true,"document":"https://element.eleme.cn/#/zh-CN/component/select","formId":106,"renderKey":"1061642141754908"},"__slot__":{"options":[{"label":"选项一","value":1},{"label":"选项二","value":2}]},"placeholder":"请选择下拉选择","style":{"width":"100%"},"clearable":true,"disabled":false,"filterable":false,"multiple":false,"__vModel__":"field106"},{"__config__":{"label":"单选框组","labelWidth":null,"showLabel":true,"tag":"el-radio-group","tagIcon":"radio","changeTag":true,"layout":"colFormItem","span":24,"optionType":"default","regList":[],"required":true,"border":false,"document":"https://element.eleme.cn/#/zh-CN/component/radio","formId":107,"renderKey":"1071642141756412"},"__slot__":{"options":[{"label":"选项一","value":1},{"label":"选项二","value":2}]},"style":{},"size":"medium","disabled":false,"__vModel__":"field107"},{"__config__":{"label":"多选框组","tag":"el-checkbox-group","tagIcon":"checkbox","defaultValue":[],"span":24,"showLabel":true,"labelWidth":null,"layout":"colFormItem","optionType":"default","required":true,"regList":[],"changeTag":true,"border":false,"document":"https://element.eleme.cn/#/zh-CN/component/checkbox","formId":108,"renderKey":"1081642141757951"},"__slot__":{"options":[{"label":"选项一","value":1},{"label":"选项二","value":2}]},"style":{},"size":"medium","disabled":false,"__vModel__":"field108"},{"__config__":{"label":"开关","tag":"el-switch","tagIcon":"switch","defaultValue":false,"span":24,"showLabel":true,"labelWidth":null,"layout":"colFormItem","required":true,"regList":[],"changeTag":true,"document":"https://element.eleme.cn/#/zh-CN/component/switch","formId":109,"renderKey":"1091642141760696"},"style":{},"disabled":false,"active-text":"","inactive-text":"","active-color":null,"inactive-color":null,"active-value":true,"inactive-value":false,"__vModel__":"field109"},{"__config__":{"label":"时间选择","tag":"el-time-picker","tagIcon":"time","defaultValue":null,"span":24,"showLabel":true,"layout":"colFormItem","labelWidth":null,"required":true,"regList":[],"changeTag":true,"document":"https://element.eleme.cn/#/zh-CN/component/time-picker","formId":110,"renderKey":"1101642141762798"},"placeholder":"请选择时间选择","style":{"width":"100%"},"disabled":false,"clearable":true,"picker-options":{"selectableRange":"00:00:00-23:59:59"},"format":"HH:mm:ss","value-format":"HH:mm:ss","__vModel__":"field110"},{"__config__":{"label":"时间范围","tag":"el-time-picker","tagIcon":"time-range","span":24,"showLabel":true,"labelWidth":null,"layout":"colFormItem","defaultValue":["17:11:26","18:11:26"],"required":true,"regList":[],"changeTag":true,"document":"https://element.eleme.cn/#/zh-CN/component/time-picker","formId":111,"renderKey":"1111642141768452"},"style":{"width":"100%"},"disabled":false,"clearable":true,"is-range":true,"range-separator":"至","start-placeholder":"开始时间","end-placeholder":"结束时间","format":"HH:mm:ss","value-format":"HH:mm:ss","__vModel__":"field111"},{"__config__":{"label":"日期选择","tag":"el-date-picker","tagIcon":"date","defaultValue":null,"showLabel":true,"labelWidth":null,"span":24,"layout":"colFormItem","required":true,"regList":[],"changeTag":true,"document":"https://element.eleme.cn/#/zh-CN/component/date-picker","formId":112,"renderKey":"1121642141771722"},"placeholder":"请选择日期选择","type":"date","style":{"width":"100%"},"disabled":false,"clearable":true,"format":"yyyy-MM-dd","value-format":"yyyy-MM-dd","readonly":false,"__vModel__":"field112"},{"__config__":{"label":"日期范围","tag":"el-date-picker","tagIcon":"date-range","defaultValue":null,"span":24,"showLabel":true,"labelWidth":null,"required":true,"layout":"colFormItem","regList":[],"changeTag":true,"document":"https://element.eleme.cn/#/zh-CN/component/date-picker","formId":113,"renderKey":"1131642141774056"},"style":{"width":"100%"},"type":"daterange","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","disabled":false,"clearable":true,"format":"yyyy-MM-dd","value-format":"yyyy-MM-dd","readonly":false,"__vModel__":"field113"},{"__config__":{"label":"上传","tag":"el-upload","tagIcon":"upload","layout":"colFormItem","defaultValue":null,"showLabel":true,"labelWidth":null,"required":true,"span":24,"showTip":false,"buttonText":"点击上传","regList":[],"changeTag":true,"fileSize":2,"sizeUnit":"MB","document":"https://element.eleme.cn/#/zh-CN/component/upload","formId":114,"renderKey":"1141642141776842"},"__slot__":{"list-type":true},"action":"https://jsonplaceholder.typicode.com/posts/","disabled":false,"accept":"","name":"file","auto-upload":true,"list-type":"text","multiple":false,"__vModel__":"field114"}],"formRef":"elForm","formModel":"formData","size":"medium","labelPosition":"right","labelWidth":100,"formRules":"rules","gutter":15,"disabled":false,"span":24,"formBtns":true}`;
      let formControlConf = `{"columnControlConditions":[{"baseValue":"","columnAlias":"A","columnId":15,"columnName":"field116","compareSymbol":"","controleId":0,"dateUnit":false,"id":0}],"columnControlTargets":[{"columnId":15,"columnName":"field117"}],"compareSymbol":"0","expression":"A + 1 > 2","id":0,"processDefId":"53","type":"0"}`;
      this.initFormConf(formConf);
      this.initFormControlConf(formControlConf);
    },
    initFormConf(formConf) {
      let formConfig = JSON.parse(formConf);
      const fields = formConfig["fields"];
      let arr = fields.map(field => {
        field.display = true;
        return field;
      });
      formConfig["fields"] = arr;
      formConfig["buildRules"] = false;
      this.sourceConf = fields;
      this.formConf = formConfig;
    },
    /**
     * 初始化表单控制规则
     */
    initFormControlConf(data) {
      this.formControlConf = JSON.parse(data);
    },
    
  }
};
</script>

<style lang="scss" scoped>
.test-form {
  margin: 15px auto;
  width: 400px;
  padding: 15px;
  border: 1px solid #f0f0f0;
}
</style>
