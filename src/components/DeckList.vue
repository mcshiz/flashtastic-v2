<template>
	<div class="row" v-if="Object.keys(decks).length">
		<div class="col">
			<ul class="list-group">
				<li v-for='(deck, index) in decks' :key='`deck-${index}`' class="list-group-item">
					<div class="row">
						<div class="col-6 col-sm-8 col-md-10 text-left justify-content-center align-self-center">
							<b>{{deck.name}}</b>
							<br>
							{{deck.questions.length}} Cards in Deck
							<br>
							<span v-if="deck.score"
									v-bind:class="{'text-success': deck.score.correct/deck.questions.length > 0.5,
													'text-danger': deck.score.correct/deck.questions.length <= 0.5}">
								Score:<b>{{deck.score.correct}}</b>/<b>{{deck.questions.length}}</b>
							</span>
							<span v-else>Not Completed</span>
						</div>
						<div class="col-4 col-sm-2 col-md-1 pull-right align-self-center">
							<button class="btn btn-info" v-on:click="loadQuiz(deck)">Study</button>
						</div>
						<div class="col-2 col-sm-2 col-md-1 align-self-center">
							<span v-if="deck.deckPermissions === 'private'"  v-on:click="deleteDeck(index)" class="delete-deck"><i class="fa fa-trash"></i></span>
						</div>
					</div>
				</li>
			</ul>
		</div>
	</div>
	<div v-else>Loading...</div>
</template>
<script>
export default {
	name: 'DeckList',
	props: ['decks'],
	methods: {
		loadQuiz: function(deck) {
			this.$router.push({name: 'Quiz', params: {id: deck.key, name: deck.name, deckPermissions: deck.deckPermissions}})
		},
		deleteDeck: function(id) {
			if(window.confirm('Are you sure you want to delete this deck?')) {
				this.$store.dispatch('DELETE_DECK_BY_ID', id)
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
