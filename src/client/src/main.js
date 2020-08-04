import Vue from 'vue';
import App from './App.vue';

import router from './router.js';
import store from './store';
import vuetify from './plugins/vuetify';
import { toCurrency } from './utils/composition.js';

Vue.config.productionTip = false;

Vue.filter('toCurrency', toCurrency);

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app');
