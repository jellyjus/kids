import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import http from './services/http-service'
import App from './App.vue'

Vue.use(ElementUI);
Vue.use(http);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount('#app')
