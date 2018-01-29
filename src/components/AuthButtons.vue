<template>
	<button v-if="authenticated" v-on:click="signOut" class="btn btn-primary ripple">Sign Out</button>
	<button v-else v-on:click="authenticate" class="btn btn-primary ripple">Sign In With Google</button>
</template>
<script>
import {mapState} from 'vuex'
export default {
	name: 'AuthButtons',
	computed: {
		...mapState(['authenticated'])
	},
	methods: {
		authenticate: function() {
			this.$store.dispatch('SIGN_IN')
		},
		signOut: function() {
			this.$store.dispatch('SIGN_OUT')
		}
	}
}
</script>
