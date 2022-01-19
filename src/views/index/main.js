import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import '@/styles/index.scss'
import '@/icons'
import axInst from '@/utils/request.js'
// import axios from '@/utils/axios'
import Tinymce from '@/components/tinymce/index.vue'
import * as ExprEval from 'expr-eval';

Vue.component('tinymce', Tinymce)

Vue.config.productionTip = false
Vue.prototype.$axios = axInst
Vue.prototype.$expr = ExprEval

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
