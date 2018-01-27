<template>
	<div class='content'>
		<div class="row">
			<div class="col">
				<h1>FlashTastic</h1>
			</div>
		</div>
		<div class="row">
			<div class="col">
				<h2>My Decks</h2>
			</div>
		</div>
		<div class="row">
			<div class="col-12"><my-deck-list :decks="myDecks"></my-deck-list></div>
			<div class="col-12"><hr></div>
			<div class="col-12"><h2>Public Decks</h2></div>
			<div class="col-12"><public-deck-list :decks="publicDecks"></public-deck-list></div>
		</div>
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
