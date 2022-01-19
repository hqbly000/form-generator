<template>
  <div class="test-form">
    <parser
      :form-conf="formConf"
      :form-control-conf="formControlConf"
      ref="parser"
    />
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
  created() {
    console.log("got it!!!");
  },
  mounted() {
    const that = this;
    window.addEventListener("message", function(e) {
      let req = e.data;
      //接收最新的规则，
      if (req.method && req.method === "initFormConf") {
        that.initFormConf(req.data);
      } else if (req.method && req.method === "initFormControlConf") {
        that.initFormControlConf(req.data);
      }
    });
    // this.test();
  },
  methods: {
    test() {
      let formConf = `{"fields":[{"__config__":{"label":"单行文本","labelWidth":null,"showLabel":true,"changeTag":true,"tag":"el-input","tagIcon":"input","required":true,"layout":"colFormItem","span":24,"document":"","regList":[],"showDictSource":true,"dictSource":"0","formId":117,"renderKey":"1171642145207350"},"__slot__":{"prepend":"","append":""},"placeholder":"请输入单行文本","style":{"width":"100%"},"clearable":true,"prefix-icon":"","suffix-icon":"","maxlength":null,"show-word-limit":false,"readonly":false,"disabled":false,"__vModel__":"field117"},{"__config__":{"label":"单行文本","labelWidth":null,"showLabel":true,"changeTag":true,"tag":"el-input","tagIcon":"input","required":true,"layout":"colFormItem","span":24,"document":"","regList":[],"showDictSource":true,"dictSource":"2","formId":116,"renderKey":"1161642145097479"},"__slot__":{"prepend":"","append":""},"placeholder":"请输入单行文本","style":{"width":"100%"},"clearable":true,"prefix-icon":"","suffix-icon":"","maxlength":null,"show-word-limit":false,"readonly":false,"disabled":false,"__vModel__":"field116"}],"formRef":"elForm","formModel":"formData","size":"medium","labelPosition":"right","labelWidth":100,"formRules":"rules","gutter":15,"disabled":false,"span":24,"formBtns":true}`;
      let formControlConf = `{"columnControlConditions":[{"baseValue":"","columnAlias":"A","columnId":15,"columnName":"field116","compareSymbol":"","controleId":0,"dateUnit":false,"id":0}],"columnControlTargets":[{"columnId":15,"columnName":"field117"}],"compareSymbol":"0","expression":"A + 1 > 2","id":0,"processDefId":"53","type":"0"}`;
      this.initFormConf(JSON.parse(formConf));
      this.initFormControlConf(JSON.parse(formControlConf));
    },
    initFormConf(formConfig) {
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
      this.formControlConf = data;
    }
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
