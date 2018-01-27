// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import store from './store'
import App from './App'
import router from './router'

import 'bootstrap'

Vue.config.productionTip = false
Vue.config.devtools = true
/* eslint-disable no-new */
router.beforeEach((to, from, next) => {
	store.dispatch('INITIALIZE').then(() => {
		next()
	})
})

new Vue({
	el: '#app',
	router,
	store,
	components: {App},
	template: '<App/>'
})
