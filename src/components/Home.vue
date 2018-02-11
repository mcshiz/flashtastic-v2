<template>
	<div class='content'>
		<div class="row">
			<div class="col-12">
				<h1>FlashTastic</h1>
			</div>
		</div>
		<div class="row mb-2" v-if="authenticated">
			<div class="col"></div>
			<div class="col">
				<h2>My Decks</h2>
			</div>
			<div class="col">
				<input type="text" class="form-control input-group-sm" placeholder="Filter by tags" v-model="filterValue">
			</div>
			<div class="col-12">
				<my-deck-list :decks="privateDecks" :filter="filterValue"></my-deck-list>
				<hr>
			</div>
		</div>
		<!-- If not authenticated -->
		<div class="row mb-4" v-else>
			<div class="col-12">Login to create private decks and track your scores</div>
			<div class="col-12"><auth-buttons></auth-buttons></div>
		</div>
		<div class="row mt-2">
			<div class="col-12"><h2>Public Decks</h2></div>
			<div class="col-12">
				<public-deck-list :decks="publicDecks" :filter="filterValue"></public-deck-list>
			</div>
		</div>
	</div>
</template>
<script>
import DeckList from './DeckList'
import AuthButtons from './AuthButtons'
import { mapState } from 'vuex'

export default {
	name: 'Home',
	components: {
		'public-deck-list': DeckList,
		'my-deck-list': DeckList,
		'auth-buttons': AuthButtons
	},
	computed: {
		...mapState(['privateDecks', 'publicDecks', 'authenticated', 'user'])
	},
	data() {
		return {
			filterValue: ''
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
