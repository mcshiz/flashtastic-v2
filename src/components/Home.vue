<template>
	<div class='content'>
		<h1>{{ msg }}</h1>
		<deck-list></deck-list>
	</div>
</template>
<script>
import DeckList from './DeckList'
export default {
	name: 'Home',
	components: {
		'deck-list': DeckList
	},
	data() {
		return {
			msg: 'Welcome to FlashTastic'
		}
	}
}
</script>
<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
	h1, h2 {
		font-weight: normal;
	}


</style>
