<template>
		<button class="btn btn-info ripple">
			<i class="fa fa-user" aria-hidden="true"></i>
		</button>
</template>
<script>
import { mapState } from 'vuex'

export default {
	name: 'Home',
	computed: {
		...mapState(['authenticated', 'user'])
	},
	methods: {

	}

}
</script>
<style lang="scss" scoped>
	@import '../styles/navigation.css';
</style>
