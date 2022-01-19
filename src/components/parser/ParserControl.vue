<script>
import { deepClone } from '@/utils/index'
import render from '@/components/render/render.js'

const ruleTrigger = {
  'el-input': 'blur',
  'el-input-number': 'blur',
  'el-select': 'change',
  'el-radio-group': 'change',
  'el-checkbox-group': 'change',
  'el-cascader': 'change',
  'el-time-picker': 'change',
  'el-date-picker': 'change',
  'el-rate': 'change'
}

const layouts = {
  colFormItem(h, scheme) {
    const config = scheme.__config__
    const listeners = buildListeners.call(this, scheme)

    let labelWidth = config.labelWidth ? `${config.labelWidth}px` : null
    if (config.showLabel === false) labelWidth = '0'
    return (
      <el-col span={config.span} v-show={this.formDisplay[scheme.__vModel__]}>
        <el-form-item label-width={labelWidth} prop={scheme.__vModel__}
          label={config.showLabel ? config.label : ''}>
          <render conf={scheme} on={listeners} />
        </el-form-item>
      </el-col>
    )
  },
  rowFormItem(h, scheme) {    
    let child = renderChildren.apply(this, arguments)
    if (scheme.type === 'flex') {
      child = <el-row type={scheme.type} justify={scheme.justify} align={scheme.align}>
              {child}
            </el-row>
    }
    return (
      <el-col span={scheme.span} v-show={this.formDisplay[scheme.__vModel__]}>
        <el-row gutter={scheme.gutter}>
          {child}
        </el-row>
      </el-col>
    )
  }
}

function renderFrom(h) {
  const { formConfCopy } = this
  return (
    <el-row gutter={formConfCopy.gutter}>
      <el-form
        size={formConfCopy.size}
        label-position={formConfCopy.labelPosition}
        disabled={formConfCopy.disabled}
        label-width={`${formConfCopy.labelWidth}px`}
        ref={formConfCopy.formRef}
        // model不能直接赋值 https://github.com/vuejs/jsx/issues/49#issuecomment-472013664
        props={{ model: this[formConfCopy.formModel] }}
        rules={this[formConfCopy.formRules]}
      >
        {renderFormItem.call(this, h, formConfCopy.fields)}
      </el-form>
    </el-row>
  )
}

function renderFormItem(h, elementList) {
  if(!elementList) return
  return elementList.map(scheme => {
    const config = scheme.__config__
    const layout = layouts[config.layout]

    if (layout) {
      return layout.call(this, h, scheme)
    }
    throw new Error(`没有与${config.layout}匹配的layout`)
  })
}

function renderChildren(h, scheme) {
  const config = scheme.__config__
  if (!Array.isArray(config.children)) return null
  return renderFormItem.call(this, h, config.children)
}

function setValue(event, config, scheme) {
  this.$set(config, 'defaultValue', event)
  this.$set(this.formData, scheme.__vModel__, event)
}

function buildListeners(scheme) {
  const config = scheme.__config__
  const methods = this.formConf.__methods__ || {}
  const listeners = {}

  // 给__methods__中的方法绑定this和event
  Object.keys(methods).forEach(key => {
    listeners[key] = event => methods[key].call(this, event)
  })
  // 响应 render.js 中的 vModel $emit('input', val)
  listeners.input = event => setValue.call(this, event, config, scheme)

  return listeners
}

export default {
  components: {
    render
  },
  props: {
    formConf: {
      type: Object,
      required: true
    },
    formControlConf: {
      type: Object,
      required: true
    }
  },
  data() {
    const data = {
      formConfCopy: deepClone(this.formConf),
      formData: {},
      formDisplay : {}
    }
    if(Object.keys(this.formConf).length > 0){
      this.initFormData(data.formConfCopy.fields, data.formData)
    }
    return data
  },
  watch: {
    formConf(newConfig){
      console.log("----------updated-------------")
      this.formConfCopy = deepClone(newConfig);
      this.formData =  {};
      // this.$set(this, "formData", {});
      this.initFormData(this.formConfCopy.fields, this.formData)
    },
    formData : {
      deep:true,
      handler(newVal){
        this.handleDataChange(newVal)
      }
    }
  },  
  methods: {
    initFormData(componentList, formData) {
      componentList.forEach(cur => {
        const config = cur.__config__
        // if (cur.__vModel__) formData[cur.__vModel__] = config.defaultValue
        if (cur.__vModel__) {
          this.$set(this.formData,cur.__vModel__,config.defaultValue);
          this.$set(this.formDisplay, cur.__vModel__, cur.display);
        }
        if (config.children) this.initFormData(config.children, formData)
      })
    },
    handleDataChange(data) {
      console.log("------------receive data-------------");
      console.log(data);
      if(!this.formControlConf){
        return false;
      }
      let params = {};
      this.formControlConf.columnControlConditions.forEach(con => {
        console.log(con.columnAlias)
        params[con.columnAlias] = data[con.columnName] ? data[con.columnName] : "";
      });
      console.log(JSON.stringify(params))
      let result =  this.$expr.Parser.evaluate(this.formControlConf.expression , params);
      console.log(result)
      this.formControlConf.columnControlTargets.forEach(target => {
        this.formDisplay[target.columnName] = !result;
      })
    },
    getFormData(){
      return this.formData;
    }
  },
  render(h) {
    return renderFrom.call(this, h)
  }
}
</script>
