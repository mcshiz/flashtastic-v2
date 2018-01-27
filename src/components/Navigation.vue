<template>
	<footer class="row footer">
		<div class="col">
			<router-link :to="{ name: 'UserPage' }">
				<button class="btn btn-primary ripple"><i class="fa fa-user" aria-hidden="true"></i></button>
			</router-link>
		</div>
		<div class="col">
			<router-link :to="{ name: 'CreateNew' }">
				<button class="btn btn-success ripple"><i class="fa fa-plus" aria-hidden="true"></i></button>
			</router-link>
		</div>
		<div class="col">
			<router-link :to="{ name: 'Home' }">
				<button class="btn btn-primary ripple"><i class="fa fa-list" aria-hidden="true"></i></button>
			</router-link>
		</div>
	</footer>
</template>
<script>
import UserMenu from './UserMenu'
export default {
	name: 'Navigation',
	data() {
		return {}
	},
	methods: {
		navigate(path) {
			this.$router.push(path)
		}
	},
	components: {
		'UserMenu': UserMenu
	}
}
</script>
<style scoped lang="scss">
	@import '../styles/navigation.css';
</style>
