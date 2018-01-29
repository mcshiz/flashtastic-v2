<template>
	<footer class="row footer">
		<div class="col">
			<router-link :to="{ name: 'UserPage' }">
				<button class="btn btn-primary ripple"><i class="fa fa-user" aria-hidden="true"></i></button>
			</router-link>
		</div>
		<create-new-deck-button></create-new-deck-button>
		<div class="col">
			<router-link :to="{ name: 'Home' }">
				<button class="btn btn-primary ripple"><i class="fa fa-list" aria-hidden="true"></i></button>
			</router-link>
		</div>
	</footer>
</template>
<script>
import UserMenu from './UserMenu'
import CreateNewDeckButton from './CreateNewDeckButton'
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
		'create-new-deck-button': CreateNewDeckButton,
		'UserMenu': UserMenu
	}
}
</script>
<style scoped lang="scss">
	@import '../styles/navigation.css';
</style>
