<template>
	<div class="row footer">
		<div class="col-5 text-right">
			<router-link :to="{ name: 'Home' }">Home</router-link>
		</div>
		<div class="col-2"></div>
		<div class="col-5 text-left">
			<router-link :to="{ name: 'CreateNew' }">Create New Deck</router-link>
		</div>
	</div>
</template>
<script>
export default {
	name: 'Navigation',
	data() {
		return {}
	},
	methods: {
		navigate(path) {
			this.$router.push(path)
		}
	}
}
</script>
<style>
	.footer {
		position: absolute;
		right: 0;
		bottom: 0;
		left: 0;
		padding: 1rem;
		background-color: #efefef;
		text-align: center;
	}
	.footer a {
		padding: 10px 50px;
	}
</style>
