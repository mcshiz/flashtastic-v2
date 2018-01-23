import Vue from 'vue'

Vue.config.productionTip = false

// Fail tests on any warning
console.error = message => {
	throw new Error(message)
}
