<template>
	<router-link :to="{ name: 'CreateNew' }">
		<button class="btn btn-success ripple"><i class="fa fa-plus" aria-hidden="true"></i></button>
	</router-link>
</template>
<script>
export default {
	name: 'CreateNewDeckButton'
}
</script>
<style scoped>
	@import '../styles/navigation.css';
</style>
