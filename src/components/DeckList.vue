<template>
	<div class="row" v-if="Object.keys(decks).length">
		<div class="col">
			<ul class="list-group">
				<li v-for='(deck, key, index) in decks' :key='`deck-${index}`' class="list-group-item">
					<div class="row">
						<div class="col-6 col-sm-8 col-md-10 text-left justify-content-center align-self-center">
							<b>{{deck.name}}</b>
							<br>
							{{Object.keys(deck.questions).length}} Cards in Deck
							<br>
							<span v-if="deck.score"
									v-bind:class="{'text-success': deck.score.correct/Object.keys(deck.questions).length > 0.5,
													'text-danger': deck.score.correct/Object.keys(deck.questions).length <= 0.5}">
								Score:<b>{{deck.score.correct}}</b>/<b>{{Object.keys(deck.questions).length}}</b>
							</span>
							<span v-else>Not Completed</span>
						</div>
						<div class="col-4 col-sm-2 col-md-1 pull-right align-self-center">
							<button class="btn btn-info" v-on:click="loadQuiz(deck, key)">Study</button>
						</div>
						<div class="col-2 col-sm-2 col-md-1 align-self-center">
							<span v-if="deck.deckPermissions === 'private'"  v-on:click="deleteDeck(key)" class="delete-deck"><i class="fa fa-trash"></i></span>
						</div>
					</div>
				</li>
			</ul>
		</div>
	</div>
	<div v-else>Loading...
		<br>
		<create-new-deck-button></create-new-deck-button>
	</div>
</template>
<script>
import CreateNewDeckButton from './CreateNewDeckButton'

export default {
	components: {
		'create-new-deck-button': CreateNewDeckButton
	},
	name: 'DeckList',
	props: ['decks'],
	methods: {
		loadQuiz: function(deck, key) {
			this.$router.push({name: 'Quiz', params: {key: key, name: deck.name, deckPermissions: deck.deckPermissions}})
		},
		deleteDeck: function(key) {
			if(window.confirm('Are you sure you want to delete this deck?')) {
				this.$store.dispatch('DELETE_DECK_BY_KEY', key)
			}
		}
	}
}
</script>

<style>
	.delete-deck {
		line-height: 48px;
	}
</style>
