<template>
	<div class='content'>
		<h1>FlashTastic</h1>
		<h2>My Decks</h2>
		<my-deck-list :decks="myDecks"></my-deck-list>
		<hr>
		<h2>Public Decks</h2>
		<public-deck-list :decks="publicDecks"></public-deck-list>
	</div>
</template>
<script>
import DeckList from './DeckList'
import { mapState } from 'vuex'

export default {
	name: 'Home',
	components: {
		'public-deck-list': DeckList,
		'my-deck-list': DeckList
	},
	computed: {
		...mapState(['myDecks', 'publicDecks', 'authenticated', 'user'])
	},
	data() {
		return {}
	}
}
</script>
<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
	h1, h2 {
		font-weight: normal;
	}
</style>
