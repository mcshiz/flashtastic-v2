<template>
	<footer class="row footer">
		<div class="col-5 text-right">
			<router-link :to="{ name: 'Home' }">
				<button class="btn btn-primary ripple">Home</button>
			</router-link>
		</div>
		<div class="col-2"></div>
		<div class="col-5 text-left">
			<router-link :to="{ name: 'CreateNew' }">
				<button class="btn btn-primary ripple">Create New Deck</button>
			</router-link>
		</div>
	</footer>
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
<style scoped>

	.footer {
		height: 50px;
		background: coral;
		-webkit-box-shadow: 0px -5px 15px -2px rgba(155,155,155,0.75);
		-moz-box-shadow: 0px -5px 15px -2px rgba(155,155,155,155.75);
		box-shadow: 0px -5px 15px -2px rgba(155,155,155,155.75);
		position: relative;
		margin-top: -50px; /* negative value of footer height */
		clear:both;
	}
	.footer button {
		padding: 10px 50px;
		display: inline-block;
		text-align: center;
		height: 40px;
		margin-top: 5px;
	}
</style>
